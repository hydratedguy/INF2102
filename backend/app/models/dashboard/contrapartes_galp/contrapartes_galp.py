from __future__ import annotations
from typing import Optional

from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Float, text

from app.models.base import BaseModel


class ContraparteGalp(BaseModel):
    __tablename__ = "contrapartes_galp"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    nome: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    estado: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    transportadora: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)

    latitude: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    longitude: Mapped[Optional[float]] = mapped_column(Float, nullable=True)

    uf: Mapped[Optional[str]] = mapped_column(String(5), nullable=True)

    tipo_consumidor: Mapped[Optional[str]] = mapped_column(String(150), nullable=True)

    active: Mapped[bool] = mapped_column(nullable=False, server_default=text("true"))
