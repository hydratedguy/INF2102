from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.db.session import get_db
from app.schemas.aterros_sanitarios import AterrosSanitariosOut
from app.services import aterros_sanitarios_service

router = APIRouter()

@router.get("/aterros-sanitarios/", response_model=List[AterrosSanitariosOut])
def read_aterros_sanitarios(db: Session = Depends(get_db)):
    return aterros_sanitarios_service.get_all_aterros_sanitarios(db)
