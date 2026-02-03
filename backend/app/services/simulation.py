"""
Biomethane supply chain simulation service.
Contains all calculation functions for the simulation.
"""
import math
from typing import Optional, Tuple
from sqlalchemy.orm import Session

from app.models.plant import Plant, AuthorizedPlantInfo, PendingPlantInfo
from app.models.dashboard.aterros_sanitarios import AterrosSanitarios
from app.models.dashboard.ecoparques import Ecoparque
from app.models.dashboard.usinas_alcool import UsinasAlcool
from app.models.dashboard.pontos_entrega_gas import PontosEntregaGas
from app.models.pre_tratamento import PreTratamento
from app.models.biodigestao import Biodigestao
from app.models.purificacao import Purificacao
from app.models.pos_processamento import PosProcessamento
from app.models.digestato import Digestato
from app.models.co2 import CO2

from app.schemas.simulation import (
    SimulationInput,
    SimulationResult,
    LogisticsCost,
    ProcessingCosts,
)
from app.data.defaults import (
    TRANSPORT_RAW_MATERIAL,
    TRANSPORT_BIOMETHANE,
    ROAD_DISTANCE_MULTIPLIER,
    DEFAULT_PRE_TRATAMENTO,
    DEFAULT_BIODIGESTAO,
    DEFAULT_PURIFICACAO,
    DEFAULT_POS_PROCESSAMENTO,
    DEFAULT_DIGESTATO,
    DEFAULT_CO2,
    DEFAULT_BIOMETHANE_PRICE,
    ACQUISITION_COST_BY_TYPE,
)
from app.data.icms_rates import get_icms_rate


def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """
    Calculate the great-circle distance between two points on Earth.
    
    Args:
        lat1, lon1: Coordinates of point 1
        lat2, lon2: Coordinates of point 2
        
    Returns:
        Distance in kilometers
    """
    R = 6371  # Earth's radius in kilometers
    
    lat1_rad = math.radians(lat1)
    lat2_rad = math.radians(lat2)
    delta_lat = math.radians(lat2 - lat1)
    delta_lon = math.radians(lon2 - lon1)
    
    a = (math.sin(delta_lat / 2) ** 2 + 
         math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(delta_lon / 2) ** 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    
    return R * c


def calculate_road_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """
    Estimate road distance based on haversine distance with a multiplier.
    """
    straight_line = haversine_distance(lat1, lon1, lat2, lon2)
    return straight_line * ROAD_DISTANCE_MULTIPLIER


def calculate_raw_material_logistics(
    source_lat: float,
    source_lng: float,
    plant_lat: float,
    plant_lng: float,
    quantity_ton_day: float,
    transport_type: str,
) -> LogisticsCost:
    """
    Calculate raw material transport costs.
    """
    transport_config = TRANSPORT_RAW_MATERIAL.get(
        transport_type, 
        TRANSPORT_RAW_MATERIAL["CARRETA_BASCULANTE"]
    )
    
    distance_km = calculate_road_distance(source_lat, source_lng, plant_lat, plant_lng)
    capacity_ton = transport_config["capacity_ton"]
    cost_per_km = transport_config["cost_per_km"]
    
    # Number of trips needed per day
    trips_per_day = math.ceil(quantity_ton_day / capacity_ton)
    
    # Cost per trip (round trip)
    cost_per_trip = distance_km * 2 * cost_per_km
    
    # Total daily cost
    total_daily_cost = trips_per_day * cost_per_trip
    
    return LogisticsCost(
        distance_km=round(distance_km, 2),
        trips_per_day=trips_per_day,
        cost_per_trip=round(cost_per_trip, 2),
        total_daily_cost=round(total_daily_cost, 2),
    )


def calculate_biomethane_logistics(
    plant_lat: float,
    plant_lng: float,
    dest_lat: float,
    dest_lng: float,
    biomethane_m3_day: float,
    transport_type: str,
) -> LogisticsCost:
    """
    Calculate biomethane transport costs.
    """
    transport_config = TRANSPORT_BIOMETHANE.get(
        transport_type,
        TRANSPORT_BIOMETHANE["CAMINHAO_GNC"]
    )
    
    distance_km = calculate_road_distance(plant_lat, plant_lng, dest_lat, dest_lng)
    
    # Cost based on m³ transported and distance
    cost_per_nm3_km = transport_config["cost_per_nm3_per_km"]
    capacity_nm3 = transport_config["capacity_nm3"]
    
    if capacity_nm3 == float("inf"):  # Pipeline
        trips_per_day = 1
        total_daily_cost = biomethane_m3_day * distance_km * cost_per_nm3_km
        cost_per_trip = total_daily_cost
    else:
        trips_per_day = math.ceil(biomethane_m3_day / capacity_nm3)
        cost_per_trip = capacity_nm3 * distance_km * cost_per_nm3_km * 2  # Round trip
        total_daily_cost = trips_per_day * cost_per_trip
    
    return LogisticsCost(
        distance_km=round(distance_km, 2),
        trips_per_day=trips_per_day,
        cost_per_trip=round(cost_per_trip, 2),
        total_daily_cost=round(total_daily_cost, 2),
    )


def get_processing_costs(
    db: Session,
    input_data: SimulationInput,
    quantity_ton_day: float,
) -> ProcessingCosts:
    """
    Get processing costs from database or defaults.
    """
    # Pre-treatment
    if input_data.pre_tratamento_id:
        pt = db.query(PreTratamento).filter(PreTratamento.id == input_data.pre_tratamento_id).first()
        pt_capex = pt.custo_investimento or DEFAULT_PRE_TRATAMENTO["custo_investimento"]
        pt_opex = pt.custo_operacional or DEFAULT_PRE_TRATAMENTO["custo_operacional_anual"]
    else:
        pt_capex = DEFAULT_PRE_TRATAMENTO["custo_investimento"]
        pt_opex = DEFAULT_PRE_TRATAMENTO["custo_operacional_anual"]
    
    # Biodigestion
    if input_data.biodigestao_id:
        bd = db.query(Biodigestao).filter(Biodigestao.id == input_data.biodigestao_id).first()
        bd_capex = bd.custo_investimento or DEFAULT_BIODIGESTAO["custo_investimento"]
        bd_opex = bd.custo_operacional or DEFAULT_BIODIGESTAO["custo_operacional_anual"]
    else:
        bd_capex = DEFAULT_BIODIGESTAO["custo_investimento"]
        bd_opex = DEFAULT_BIODIGESTAO["custo_operacional_anual"]
    
    # Purification
    pur_tech = input_data.purificacao_tecnologia
    pur_default = DEFAULT_PURIFICACAO.get(pur_tech, DEFAULT_PURIFICACAO["PSA"])
    if input_data.purificacao_id:
        pu = db.query(Purificacao).filter(Purificacao.id == input_data.purificacao_id).first()
        pu_capex = pu.custo_investimento or pur_default["custo_investimento"]
        pu_opex = pu.custo_operacional or pur_default["custo_operacional_anual"]
    else:
        pu_capex = pur_default["custo_investimento"]
        pu_opex = pur_default["custo_operacional_anual"]
    
    # Post-processing
    pos_state = input_data.pos_processamento_estado
    pos_default = DEFAULT_POS_PROCESSAMENTO.get(pos_state, DEFAULT_POS_PROCESSAMENTO["GNC"])
    if input_data.pos_processamento_id:
        pp = db.query(PosProcessamento).filter(PosProcessamento.id == input_data.pos_processamento_id).first()
        pp_capex = pp.custo_investimento or pos_default["custo_investimento"]
        pp_opex = pp.custo_operacional or pos_default["custo_operacional_anual"]
    else:
        pp_capex = pos_default["custo_investimento"]
        pp_opex = pos_default["custo_operacional_anual"]
    
    # Digestate
    if input_data.digestato_id:
        di = db.query(Digestato).filter(Digestato.id == input_data.digestato_id).first()
        di_capex = di.custo_investimento or DEFAULT_DIGESTATO["custo_investimento"]
        di_opex = di.custo_operacional or (DEFAULT_DIGESTATO["custo_operacional_por_ton"] * quantity_ton_day * 365)
    else:
        di_capex = DEFAULT_DIGESTATO["custo_investimento"]
        di_opex = DEFAULT_DIGESTATO["custo_operacional_por_ton"] * quantity_ton_day * 365
    
    # CO2
    if input_data.co2_id:
        co = db.query(CO2).filter(CO2.id == input_data.co2_id).first()
        co_capex = co.custo_investimento or DEFAULT_CO2["custo_investimento"]
        co_opex = co.custo_operacional or DEFAULT_CO2["custo_operacional_anual"]
    else:
        co_capex = DEFAULT_CO2["custo_investimento"]
        co_opex = DEFAULT_CO2["custo_operacional_anual"]
    
    return ProcessingCosts(
        pre_tratamento_capex=pt_capex,
        pre_tratamento_opex=pt_opex,
        biodigestao_capex=bd_capex,
        biodigestao_opex=bd_opex,
        purificacao_capex=pu_capex,
        purificacao_opex=pu_opex,
        pos_processamento_capex=pp_capex,
        pos_processamento_opex=pp_opex,
        digestato_capex=di_capex,
        digestato_opex=di_opex,
        co2_capex=co_capex,
        co2_opex=co_opex,
    )


def run_simulation(db: Session, input_data: SimulationInput) -> SimulationResult:
    """
    Run the full biomethane supply chain simulation.
    """
    # Get source coordinates based on source type
    source = None
    if input_data.source_id and input_data.source_type:
        if input_data.source_type == "aterro":
            source = db.query(AterrosSanitarios).filter(AterrosSanitarios.id == input_data.source_id).first()
        elif input_data.source_type == "ecoparque":
            source = db.query(Ecoparque).filter(Ecoparque.id == input_data.source_id).first()
        elif input_data.source_type == "usinas_alcool":
            source = db.query(UsinasAlcool).filter(UsinasAlcool.id == input_data.source_id).first()
        
        if not source:
            raise ValueError(f"Source not found: {input_data.source_type} {input_data.source_id}")
    
    # Get plant
    plant = db.query(Plant).filter(Plant.id == input_data.plant_id).first()
    if not plant:
        raise ValueError(f"Plant not found: {input_data.plant_id}")
    
    # Get plant capacity - try authorized_info first, then pending_info
    auth_info = db.query(AuthorizedPlantInfo).filter(AuthorizedPlantInfo.plant_id == plant.id).first()
    pending_info = db.query(PendingPlantInfo).filter(PendingPlantInfo.plant_id == plant.id).first()
    
    # Use authorized capacity if available, otherwise use pending capacity
    if auth_info and auth_info.capacidade_nm3_d:
        plant_capacity_nm3_day = auth_info.capacidade_nm3_d
    elif pending_info and pending_info.capacidade_de_producao_nm_dia:
        plant_capacity_nm3_day = pending_info.capacidade_de_producao_nm_dia
    else:
        plant_capacity_nm3_day = 40000  # Default fallback
    
    # Get destination
    destination = db.query(PontosEntregaGas).filter(PontosEntregaGas.id == input_data.destination_id).first()
    if not destination:
        raise ValueError(f"Destination not found: {input_data.destination_id}")
    
    # Get coordinates
    source_lat = None
    source_lng = None
    if source:
        source_lat = source.lat if hasattr(source, 'lat') else source.latitude
        source_lng = source.long if hasattr(source, 'long') else source.longitude
    
    plant_lat = plant.lat
    plant_lng = plant.long
    dest_lat = destination.latitude
    dest_lng = destination.longitude
    
    # Get efficiencies
    pur_tech = input_data.purificacao_tecnologia
    biodigestion_efficiency = DEFAULT_BIODIGESTAO["eficiencia"]
    purification_efficiency = DEFAULT_PURIFICACAO.get(pur_tech, DEFAULT_PURIFICACAO["PSA"])["eficiencia"]
    
    # Calculate production
    # Biogas production = plant capacity (this is an approximation)
    biogas_m3_day = plant_capacity_nm3_day / (biodigestion_efficiency * purification_efficiency)
    
    # Biomethane = plant capacity (what comes out after purification)
    biomethane_m3_day = plant_capacity_nm3_day
    
    # Calculate raw material logistics
    if source and input_data.raw_material_quantity_ton_day > 0 and input_data.transport_raw_material_type:
        raw_material_logistics = calculate_raw_material_logistics(
            source_lat, source_lng,
            plant_lat, plant_lng,
            input_data.raw_material_quantity_ton_day,
            input_data.transport_raw_material_type,
        )
    else:
        # No raw material logistics if no source
        raw_material_logistics = LogisticsCost(
            distance_km=0,
            trips_per_day=0,
            cost_per_trip=0,
            total_daily_cost=0
        )
    
    # Calculate biomethane logistics
    biomethane_logistics = calculate_biomethane_logistics(
        plant_lat, plant_lng,
        dest_lat, dest_lng,
        biomethane_m3_day,
        input_data.transport_biomethane_type,
    )
    
    # Get processing costs
    # If no raw material quantity provided, estimate sufficient input for plant capacity
    # This is needed for OPEX calculations which often depend on throughput
    quantity_for_costs = input_data.raw_material_quantity_ton_day
    if quantity_for_costs <= 0:
        # Estimate input needed based on output capacity (rough approximation)
        quantity_for_costs = biomethane_m3_day / 50  # Assuming ~50m3/ton
        
    processing_costs = get_processing_costs(db, input_data, quantity_for_costs)

    # Check if plant has investment data
    capex_from_plant = False
    plant_investment = None

    if pending_info and pending_info.investimento:
        # Parse the investment string (e.g., "R$ 50.000.000" or "50000000")
        inv_str = pending_info.investimento
        # Remove currency symbol, spaces, and handle Brazilian number format
        inv_clean = inv_str.replace("R$", "").replace(" ", "").replace(".", "").replace(",", ".")
        try:
            plant_investment = float(inv_clean)
            if plant_investment > 0:
                capex_from_plant = True
        except (ValueError, TypeError):
            plant_investment = None

    # Calculate totals
    if capex_from_plant and plant_investment:
        total_capex = plant_investment
    else:
        total_capex = (
            processing_costs.pre_tratamento_capex +
            processing_costs.biodigestao_capex +
            processing_costs.purificacao_capex +
            processing_costs.pos_processamento_capex +
            processing_costs.digestato_capex +
            processing_costs.co2_capex
        )
    
    total_opex_annual = (
        processing_costs.pre_tratamento_opex +
        processing_costs.biodigestao_opex +
        processing_costs.purificacao_opex +
        processing_costs.pos_processamento_opex +
        processing_costs.digestato_opex +
        processing_costs.co2_opex
    )
    
    total_logistics_annual = (
        raw_material_logistics.total_daily_cost * 365 +
        biomethane_logistics.total_daily_cost * 365
    )
    
    # Calculate revenue
    gross_revenue_daily = biomethane_m3_day * input_data.biomethane_price_per_m3
    gross_revenue_annual = gross_revenue_daily * 365
    
    # Calculate ICMS
    plant_uf = plant.uf or "SP"
    dest_uf = destination.estado or "SP"
    icms_rate, icms_description = get_icms_rate(plant_uf, dest_uf)
    icms_annual = gross_revenue_annual * icms_rate
    
    net_revenue_annual = gross_revenue_annual - icms_annual
    
    # Raw material acquisition cost
    acquisition_cost = 0
    if input_data.raw_material_type:
        acquisition_cost = ACQUISITION_COST_BY_TYPE.get(input_data.raw_material_type, 0)
        
    raw_material_acquisition_annual = acquisition_cost * input_data.raw_material_quantity_ton_day * 365
    
    # Annual profit
    annual_profit = (
        net_revenue_annual - 
        total_opex_annual - 
        total_logistics_annual -
        raw_material_acquisition_annual
    )
    
    # Payback period
    payback_years = total_capex / annual_profit if annual_profit > 0 else float("inf")
    
    return SimulationResult(
        biogas_m3_day=round(biogas_m3_day, 2),
        biomethane_m3_day=round(biomethane_m3_day, 2),
        raw_material_logistics=raw_material_logistics,
        biomethane_logistics=biomethane_logistics,
        processing_costs=processing_costs,
        total_capex=round(total_capex, 2),
        total_opex_annual=round(total_opex_annual, 2),
        total_logistics_annual=round(total_logistics_annual, 2),
        gross_revenue_daily=round(gross_revenue_daily, 2),
        gross_revenue_annual=round(gross_revenue_annual, 2),
        icms_rate=round(icms_rate, 4),
        icms_description=icms_description,
        icms_annual=round(icms_annual, 2),
        net_revenue_annual=round(net_revenue_annual, 2),
        annual_profit=round(annual_profit, 2),
        payback_years=round(payback_years, 2) if payback_years != float("inf") else 999,
        raw_material_acquisition_annual=round(raw_material_acquisition_annual, 2),
        capex_from_plant=capex_from_plant,
    )
