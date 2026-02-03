from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.db.session import get_db
from app.schemas.usinas_alcool import UsinasAlcoolOut
from app.services import usinas_alcool_service

router = APIRouter()

@router.get("/usinas-alcool/", response_model=List[UsinasAlcoolOut])
def read_usinas_alcool(db: Session = Depends(get_db)):
    return usinas_alcool_service.get_all_usinas_alcool(db)
