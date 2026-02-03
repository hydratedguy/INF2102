from __future__ import annotations
from typing import Optional
from datetime import date

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Integer, Date, Text, Float, Numeric, ForeignKey

from app.models.base import BaseModel

class CompraVenda(BaseModel):
    __tablename__ = "compra_venda_biometano"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    operacao: Mapped[str] = mapped_column(String(100), nullable=False)
    descricao: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    estado: Mapped[str] = mapped_column(String(50), nullable=False)

    inicio_producao: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)

    capacidade_inicial: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    capacidade_atual: Mapped[Optional[float]] = mapped_column(Float, nullable=True)

    plantas: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    latitude: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    longitude: Mapped[Optional[float]] = mapped_column(Float, nullable=True)

    principal_fonte: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    logistica: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)

    preco: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    valorizacao: Mapped[Optional[float]] = mapped_column(Numeric(10, 2), nullable=True)

    aplicacao: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    origem_compra: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
