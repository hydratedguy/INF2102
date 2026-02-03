from sqlalchemy.orm import Session
from app.models.dashboard.usinas_alcool.usinas_alcool import UsinasAlcool

def get_all_usinas_alcool(db: Session):
    return db.query(UsinasAlcool).all()
