"""
ICMS (Interstate Commerce Tax) rates by Brazilian state.
Based on research data from cenarios-validacao-simulador-v1.xlsx - ICMS sheet.

For biomethane/biogas:
- Some states have specific reduced rates or tax benefits
- Interstate rate is typically 7% (S/SE to N/NE/CO) or 12% (same region)
"""

# ICMS rates by state
# internal: rate for sales within the same state
# interstate_7: rate for sales to N/NE/CO/ES regions (from S/SE)
# interstate_12: rate for sales within same region
# has_benefit: whether the state has specific biomethane/biogas tax benefits
# effective_rate: actual rate after benefits (if applicable)

ICMS_RATES = {
    "AC": {"internal": 0.19, "has_benefit": False, "effective_rate": 0.19},
    "AL": {"internal": 0.20, "has_benefit": False, "effective_rate": 0.20},
    "AM": {"internal": 0.20, "has_benefit": False, "effective_rate": 0.20},
    "AP": {"internal": 0.20, "has_benefit": False, "effective_rate": 0.20},
    "BA": {"internal": 0.12, "has_benefit": True, "effective_rate": 0.12},
    "CE": {"internal": 0.20, "has_benefit": False, "effective_rate": 0.20},
    "DF": {"internal": 0.20, "has_benefit": False, "effective_rate": 0.20},
    "ES": {"internal": 0.12, "has_benefit": True, "effective_rate": 0.12},
    "GO": {"internal": 0.19, "has_benefit": True, "effective_rate": 0.027},  # 85% credit
    "MA": {"internal": 0.23, "has_benefit": False, "effective_rate": 0.23},
    "MG": {"internal": 0.18, "has_benefit": False, "effective_rate": 0.18},
    "MS": {"internal": 0.018, "has_benefit": True, "effective_rate": 0.018},  # Reduced to 1.8%
    "MT": {"internal": 0.17, "has_benefit": False, "effective_rate": 0.17},
    "PA": {"internal": 0.19, "has_benefit": False, "effective_rate": 0.19},
    "PB": {"internal": 0.20, "has_benefit": False, "effective_rate": 0.20},
    "PE": {"internal": 0.205, "has_benefit": False, "effective_rate": 0.205},
    "PI": {"internal": 0.225, "has_benefit": False, "effective_rate": 0.225},
    "PR": {"internal": 0.12, "has_benefit": True, "effective_rate": 0.12},
    "RJ": {"internal": 0.20, "has_benefit": False, "effective_rate": 0.20},
    "RN": {"internal": 0.20, "has_benefit": False, "effective_rate": 0.20},
    "RO": {"internal": 0.195, "has_benefit": False, "effective_rate": 0.195},
    "RR": {"internal": 0.20, "has_benefit": False, "effective_rate": 0.20},
    "RS": {"internal": 0.17, "has_benefit": False, "effective_rate": 0.17},
    "SC": {"internal": 0.17, "has_benefit": False, "effective_rate": 0.17},
    "SE": {"internal": 0.20, "has_benefit": False, "effective_rate": 0.20},
    "SP": {"internal": 0.12, "has_benefit": True, "effective_rate": 0.12},
    "TO": {"internal": 0.20, "has_benefit": False, "effective_rate": 0.20},
}

# Interstate rates based on region
# S/SE (Sul/Sudeste): SP, RJ, MG, ES, PR, SC, RS
# N/NE/CO (Norte/Nordeste/Centro-Oeste): all others

SOUTH_SOUTHEAST = {"SP", "RJ", "MG", "ES", "PR", "SC", "RS"}


def get_icms_rate(origin_uf: str, destination_uf: str) -> tuple[float, str]:
    """
    Get the ICMS rate for a transaction.
    
    Args:
        origin_uf: State where the plant is located
        destination_uf: State where the biomethane is delivered
        
    Returns:
        Tuple of (effective_rate, description)
    """
    origin_uf = origin_uf.upper()
    destination_uf = destination_uf.upper()
    
    # Internal sale (same state)
    if origin_uf == destination_uf:
        rate_info = ICMS_RATES.get(origin_uf, {"effective_rate": 0.18, "has_benefit": False})
        rate = rate_info["effective_rate"]
        
        if rate_info.get("has_benefit"):
            description = f"Alíquota interna com benefício fiscal ({origin_uf})"
        else:
            description = f"Alíquota interna padrão ({origin_uf})"
            
        return rate, description
    
    # Interstate sale
    # From S/SE to N/NE/CO: 7%
    # Otherwise: 12%
    if origin_uf in SOUTH_SOUTHEAST and destination_uf not in SOUTH_SOUTHEAST:
        return 0.07, "Alíquota interestadual (7%)"
    else:
        return 0.12, "Alíquota interestadual (12%)"
