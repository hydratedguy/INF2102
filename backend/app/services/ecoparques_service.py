from sqlalchemy.orm import Session
from app.models.dashboard.ecoparques.ecoparques import Ecoparque

def get_all_ecoparques(db: Session):
    return db.query(Ecoparque).all()
