"""
Default values for biomethane simulation calculations.
Based on research data from cenarios-validacao-simulador-v1.xlsx
"""

# =============================================================================
# RAW MATERIAL PARAMETERS
# =============================================================================

# Potential Biochemico de Metano (PBM) - Nm³ CH4/ton
# Note: Not used currently, but kept for future reference
PBM_BY_TYPE = {
    "RSU": 70,  # Resíduos Sólidos Urbanos
    "DEJETOS_BOVINOS_SUINOS": 90,
    "VINHACA": 120,
}

# Density by material type (kg/m³)
DENSITY_BY_TYPE = {
    "RSU": 1.0,
    "DEJETOS_BOVINOS_SUINOS": 1.0,
    "VINHACA": 1.0,
}

# Raw material acquisition cost (R$/ton) - can be negative (paid to receive)
ACQUISITION_COST_BY_TYPE = {
    "RSU": -30,  # Negative = paid to receive waste
    "DEJETOS_BOVINOS_SUINOS": 20,
    "VINHACA": 60,
}

# =============================================================================
# TRANSPORT PARAMETERS
# =============================================================================

# Transport costs per km by vehicle type (R$/km and capacity in tons)
TRANSPORT_RAW_MATERIAL = {
    "CARRETA_BASCULANTE": {
        "cost_per_km": 7.5,
        "capacity_ton": 25,
        "suitable_for": ["RSU"],
    },
    "CAMINHAO_TANQUE_VACUO": {
        "cost_per_km": 6.5,
        "capacity_ton": 20,
        "suitable_for": ["DEJETOS_BOVINOS_SUINOS"],
    },
    "CAMINHAO_TANQUE": {
        "cost_per_km": 6.0,
        "capacity_ton": 27.5,
        "suitable_for": ["VINHACA"],
    },
}

# Biomethane transport
TRANSPORT_BIOMETHANE = {
    "CAMINHAO_GNC": {
        "cost_per_nm3_per_km": 0.00504,  # R$/Nm³/km
        "capacity_nm3": 4000,
    },
    "CAMINHAO_GNL": {
        "cost_per_nm3_per_km": 0.000473,  # R$/Nm³/km (cheaper per km due to density)
        "capacity_nm3": 10000,
    },
    "DUTO": {
        "cost_per_nm3_per_km": 0.005,  # R$/Nm³/km
        "capacity_nm3": float("inf"),
    },
}

# Road distance multiplier (haversine to actual road distance approximation)
ROAD_DISTANCE_MULTIPLIER = 1.3

# =============================================================================
# PROCESSING STAGE DEFAULTS
# =============================================================================

# Pre-treatment defaults
DEFAULT_PRE_TRATAMENTO = {
    "custo_investimento": 41_025_000,  # R$
    "custo_operacional_anual": 4_122_500,  # R$/year
}

# Biodigestion defaults
DEFAULT_BIODIGESTAO = {
    "custo_investimento": 54_030_000,  # R$
    "custo_operacional_anual": 2_080_000,  # R$/year
    "eficiencia": 0.70,  # 70%
}

# Purification defaults by technology
DEFAULT_PURIFICACAO = {
    "PSA": {
        "custo_investimento": 15_800_000,
        "custo_operacional_anual": 4_690_000,
        "eficiencia": 0.94,
    },
    "LAVAGEM_AGUA": {
        "custo_investimento": 15_800_000,
        "custo_operacional_anual": 2_950_000,
        "eficiencia": 0.99,
    },
    "MEMBRANA": {
        "custo_investimento": 21_000_000,
        "custo_operacional_anual": 3_700_000,
        "eficiencia": 0.92,
    },
}

# Post-processing defaults by output state
DEFAULT_POS_PROCESSAMENTO = {
    "GNC": {  # Compressed Natural Gas
        "custo_investimento": 32_500_000,
        "custo_operacional_anual": 1_475_000,
    },
    "GNL": {  # Liquefied Natural Gas
        "custo_investimento": 50_500_000,
        "custo_operacional_anual": 755_000,
    },
}

# Digestate treatment defaults
DEFAULT_DIGESTATO = {
    "custo_investimento": 34_420_000,
    "custo_operacional_por_ton": 120,  # R$/ton
}

# CO2 treatment defaults
DEFAULT_CO2 = {
    "custo_investimento": 0,
    "custo_operacional_anual": 0,
}

# =============================================================================
# PRICING AND TAXES
# =============================================================================

# Default biomethane price (R$/Nm³)
DEFAULT_BIOMETHANE_PRICE = 3.5

# Default ICMS rate if state not found
DEFAULT_ICMS_RATE = 0.18  # 18%
