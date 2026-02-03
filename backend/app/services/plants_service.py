from sqlalchemy.orm import Session, joinedload
from app.models.plant import Plant

def get_all_plants(db: Session):
    return db.query(Plant).options(
        joinedload(Plant.authorized_info),
        joinedload(Plant.pending_info)
    ).all()
