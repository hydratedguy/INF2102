from sqlalchemy.orm import Session
from app.models.dashboard import PontosEntregaGas

def get_all_pontos_entrega(db: Session):
    return db.query(PontosEntregaGas).all()
