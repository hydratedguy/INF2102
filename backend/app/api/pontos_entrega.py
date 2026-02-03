from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.pontos_entrega import PontosEntregaOut
from app.services.pontos_entrega_service import get_all_pontos_entrega

router = APIRouter(
    prefix="/pontos-entrega",
    tags=["pontos-entrega"],
)

@router.get("/", response_model=list[PontosEntregaOut])
def list_pontos_entrega(db: Session = Depends(get_db)):
    return get_all_pontos_entrega(db)
