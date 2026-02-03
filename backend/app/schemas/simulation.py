"""
Pydantic schemas for simulation input and output.
"""
from typing import Optional, Literal
from pydantic import BaseModel, Field


class SimulationInput(BaseModel):
    """Input parameters for running a biomethane supply chain simulation."""
    
    # Raw material source
    source_id: Optional[int] = Field(None, description="ID of the raw material source")
    source_type: Optional[Literal["aterro", "ecoparque", "usinas_alcool"]] = Field(None, description="Type of source: 'aterro', 'ecoparque', or 'usinas_alcool'")
    raw_material_type: Optional[str] = Field(
        default="RSU",
        description="Type of raw material: 'RSU', 'DEJETOS_BOVINOS_SUINOS', 'VINHACA'"
    )
    raw_material_quantity_ton_day: float = Field(
        default=320,
        description="Quantity of raw material processed per day in tons"
    )
    
    # Plant (usina)
    plant_id: int = Field(..., description="ID of the biomethane plant")
    
    # Processing configuration (optional - uses defaults if not provided)
    pre_tratamento_id: Optional[int] = Field(None, description="ID of pre-treatment configuration")
    biodigestao_id: Optional[int] = Field(None, description="ID of biodigestion configuration")
    purificacao_id: Optional[int] = Field(None, description="ID of purification configuration")
    purificacao_tecnologia: str = Field(
        default="PSA",
        description="Purification technology: 'PSA', 'LAVAGEM_AGUA', 'MEMBRANA'"
    )
    pos_processamento_id: Optional[int] = Field(None, description="ID of post-processing configuration")
    pos_processamento_estado: str = Field(
        default="GNC",
        description="Output state: 'GNC' (compressed) or 'GNL' (liquefied)"
    )
    digestato_id: Optional[int] = Field(None, description="ID of digestate treatment configuration")
    co2_id: Optional[int] = Field(None, description="ID of CO2 treatment configuration")
    
    # Transport
    transport_raw_material_type: str = Field(
        default="CARRETA_BASCULANTE",
        description="Vehicle type for raw material transport"
    )
    transport_biomethane_type: str = Field(
        default="CAMINHAO_GNC",
        description="Vehicle type for biomethane transport"
    )
    
    # Destination
    destination_id: int = Field(..., description="ID of the delivery destination (ponto de entrega)")
    
    # Pricing
    biomethane_price_per_m3: float = Field(
        default=3.5,
        description="Sale price of biomethane (R$/Nm³)"
    )


class LogisticsCost(BaseModel):
    """Breakdown of logistics costs."""
    distance_km: float = Field(..., description="Distance in kilometers")
    trips_per_day: int = Field(..., description="Number of trips per day")
    cost_per_trip: float = Field(..., description="Cost per trip (R$)")
    total_daily_cost: float = Field(..., description="Total daily logistics cost (R$)")


class ProcessingCosts(BaseModel):
    """Breakdown of processing stage costs."""
    pre_tratamento_capex: float
    pre_tratamento_opex: float
    biodigestao_capex: float
    biodigestao_opex: float
    purificacao_capex: float
    purificacao_opex: float
    pos_processamento_capex: float
    pos_processamento_opex: float
    digestato_capex: float
    digestato_opex: float
    co2_capex: float
    co2_opex: float


class SimulationResult(BaseModel):
    """Output of a biomethane supply chain simulation."""
    
    # Production volumes
    biogas_m3_day: float = Field(..., description="Biogas production (m³/day)")
    biomethane_m3_day: float = Field(..., description="Biomethane production (Nm³/day)")
    
    # Logistics breakdown
    raw_material_logistics: LogisticsCost
    biomethane_logistics: LogisticsCost
    
    # Processing costs breakdown
    processing_costs: ProcessingCosts
    
    # Summary costs
    total_capex: float = Field(..., description="Total capital expenditure (R$)")
    total_opex_annual: float = Field(..., description="Total annual operational expenditure (R$/year)")
    total_logistics_annual: float = Field(..., description="Total annual logistics cost (R$/year)")
    
    # Revenue
    gross_revenue_daily: float = Field(..., description="Daily gross revenue from biomethane sales (R$)")
    gross_revenue_annual: float = Field(..., description="Annual gross revenue (R$)")
    icms_rate: float = Field(..., description="Effective ICMS rate (e.g., 0.12)")
    icms_description: str = Field(..., description="Description of the ICMS rate applied")
    icms_annual: float = Field(..., description="Annual ICMS tax (R$/year)")
    net_revenue_annual: float = Field(..., description="Annual net revenue (R$/year)")
    
    # Financial metrics
    annual_profit: float = Field(..., description="Annual profit after all costs (R$)")
    payback_years: float = Field(..., description="Payback period in years")

    # Raw material cost (can be negative if paid to receive waste)
    raw_material_acquisition_annual: float = Field(..., description="Annual raw material cost/revenue (R$)")

    # CAPEX source indicator
    capex_from_plant: bool = Field(default=False, description="Whether CAPEX came from plant's investment data")
