from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.db.session import get_db
from app.schemas.ecoparques import EcoparqueOut
from app.services import ecoparques_service

router = APIRouter()

@router.get("/ecoparques/", response_model=List[EcoparqueOut])
def read_ecoparques(db: Session = Depends(get_db)):
    return ecoparques_service.get_all_ecoparques(db)
