from __future__ import annotations
from datetime import date
from typing import Optional, TYPE_CHECKING

from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Integer, Float, Date, Text, Numeric

from app.models.base import BaseModel


class CVTransporteBiometano(BaseModel):
    __tablename__ = "cv_transporte_biometano"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)


    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    empresa: Mapped[Optional[str]] = mapped_column(String(150), nullable=True)
    estado: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    pais: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)

    capacidade: Mapped[Optional[float]] = mapped_column(Float, nullable=True)

    latitude: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    longitude: Mapped[Optional[float]] = mapped_column(Float, nullable=True)

    aplicacao: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    diferencial: Mapped[Optional[str]] = mapped_column(String(300), nullable=True)