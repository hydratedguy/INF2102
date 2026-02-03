from __future__ import annotations
from typing import Optional

from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Float, Text, text

from app.models.base.base import BaseModel


class Purificacao(BaseModel):
    __tablename__ = "purificacao"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    nome: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    descricao: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    custo_investimento: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    custo_operacional: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    eficiencia: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    tecnologia: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    active: Mapped[bool] = mapped_column(nullable=False, server_default=text("true"))
