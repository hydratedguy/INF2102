"""
Simulation API endpoints.
"""
import logging
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.simulation import SimulationInput, SimulationResult
from app.services.simulation import run_simulation

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/simulation", tags=["Simulation"])


@router.post("/run", response_model=SimulationResult)
async def simulate(
    input_data: SimulationInput,
    db: Session = Depends(get_db),
) -> SimulationResult:

    logger.info(f"Simulation request received: {input_data}")
    try:
        result = run_simulation(db, input_data)
        logger.info(f"Simulation completed successfully")
        return result
    except ValueError as e:
        logger.error(f"Validation error: {e}")
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"Simulation error: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Simulation error: {str(e)}")
