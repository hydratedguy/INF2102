from __future__ import annotations
from datetime import date
from typing import Optional, TYPE_CHECKING

from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Integer, Float, Date, Text, Numeric

from app.models.base import BaseModel

class CapNumUsinasAcumuladas(BaseModel):
    __tablename__ = "cap_num_usinas_acumuladas"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    mes_ano: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)
    date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)

    capac_prd_m3dia: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    qtdade_usinas: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    capac_prd_m3dia_acumulada: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    qtdade_usinas_acumuladas: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    