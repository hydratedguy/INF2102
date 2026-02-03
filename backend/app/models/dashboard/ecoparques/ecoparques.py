from __future__ import annotations
from typing import Optional

from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Float, text

from app.models.base import BaseModel


class Ecoparque(BaseModel):
    __tablename__ = "ecoparques"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    nome: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)

    lat: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    long: Mapped[Optional[float]] = mapped_column(Float, nullable=True)

    tipo_localizacao: Mapped[Optional[str]] = mapped_column(
        String(100), nullable=True
    )

    empresa: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)

    municipio: Mapped[Optional[str]] = mapped_column(String(150), nullable=True)
    estado: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)

    fonte: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)

    active: Mapped[bool] = mapped_column(nullable=False, server_default=text("true"))
