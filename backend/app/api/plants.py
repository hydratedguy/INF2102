
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.plants import PlantOut
from app.services.plants_service import get_all_plants

router = APIRouter(
    prefix="/plants",
    tags=["plants"],
)

@router.get("/", response_model=list[PlantOut])
def list_plants(db: Session = Depends(get_db)):
    return get_all_plants(db)