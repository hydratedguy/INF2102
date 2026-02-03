from sqlalchemy.orm import Session
from app.models.dashboard.aterros_sanitarios.aterros_sanitarios import AterrosSanitarios

def get_all_aterros_sanitarios(db: Session):
    return db.query(AterrosSanitarios).all()
