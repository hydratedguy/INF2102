from __future__ import annotations
from datetime import date
from typing import Optional, TYPE_CHECKING

from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Integer, Float, Date, Text, Numeric, text

from app.models.base import BaseModel


class PontosEntregaGas(BaseModel):
    __tablename__ = 'pontos_entrega_gas'

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    nome: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    name: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)

    estado: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    municipio: Mapped[Optional[str]] = mapped_column(String(150), nullable=True)

    transporta: Mapped[Optional[str]] = mapped_column(String(150), nullable=True)
    classifica: Mapped[Optional[str]] = mapped_column(String(150), nullable=True)

    fonte: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    segmento: Mapped[Optional[str]] = mapped_column(String(150), nullable=True)
    categoria: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)

    id_ponto: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    parent_id: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    label: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)

    longitude: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    latitude: Mapped[Optional[float]] = mapped_column(Float, nullable=True)

    active: Mapped[bool] = mapped_column(nullable=False, server_default=text("true"))
    