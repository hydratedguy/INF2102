from __future__ import annotations
from datetime import date
from typing import Optional, TYPE_CHECKING

from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Integer, Float, Date, Text, Numeric

from app.models.base import BaseModel


class UsinasAlcool(BaseModel):
    __tablename__ = "usinas_alcool"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    uf: Mapped[Optional[str]] = mapped_column(String(10), nullable=True)
    unidade: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    perfil: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)

    latitude: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    longitude: Mapped[Optional[float]] = mapped_column(Float, nullable=True)