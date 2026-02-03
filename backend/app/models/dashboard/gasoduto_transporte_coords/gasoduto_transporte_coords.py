from sqlalchemy import (
    Column,
    Integer,
    Float,
    ForeignKey,
    UniqueConstraint
)
from sqlalchemy.orm import relationship
from app.models.base import BaseModel


class GasodutoTransporteCoords(BaseModel):
    __tablename__ = "gasoduto_transporte_coords"

    id = Column(Integer, primary_key=True)
    gasoduto_id = Column(
        Integer,
        ForeignKey("gasoduto_transporte.id", ondelete="CASCADE"),
        nullable=False
    )
    seq = Column(Integer, nullable=False)
    longitude = Column(Float, nullable=False)
    latitude = Column(Float, nullable=False)

    __table_args__ = (
        UniqueConstraint("gasoduto_id", "seq", name="uq_gasoduto_seq"),
    )

    