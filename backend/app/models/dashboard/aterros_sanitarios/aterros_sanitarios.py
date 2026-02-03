from __future__ import annotations
from datetime import date
from typing import Optional, TYPE_CHECKING

from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Integer, Float, Text, Numeric, text

from app.models.base import BaseModel


class AterrosSanitarios(BaseModel):
    __tablename__ = "aterros_sanitarios"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    estado: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    municipio: Mapped[Optional[str]] = mapped_column(String(150), nullable=True)
    nome: Mapped[Optional[str]] = mapped_column(String(150), nullable=True)

    lat: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    long: Mapped[Optional[float]] = mapped_column(Float, nullable=True)

    operador: Mapped[Optional[str]] = mapped_column(String(150), nullable=True)
    observacao: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    volume_recebido_toneladas_dia: Mapped[Optional[float]] = mapped_column(
        Float, nullable=True
    )

    porte: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)

    data_abertura: Mapped[Optional[str]] = mapped_column(
        String, nullable=True
    )

    fonte_1: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    fonte_2: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    fonte_3: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)

    m3_biomethane_per_ton_rsu: Mapped[Optional[float]] = mapped_column(
        Float, nullable=True
    )
    
    active: Mapped[bool] = mapped_column(nullable=False, server_default=text("true"))
