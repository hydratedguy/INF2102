from __future__ import annotations
from datetime import date
from typing import Optional, TYPE_CHECKING

from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Integer, Float, Date, Text, Numeric, text

from app.models.base import BaseModel


class BiometanoDadosAbertos(BaseModel):
    __tablename__ = 'biometano_dados_abertos'

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    mes_ano: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)

    razao_social: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    cnpj: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)

    regiao: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    estado: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    municipio: Mapped[Optional[str]] = mapped_column(String(150), nullable=True)

    capacidade_autorizada_de_producao_de_biometano_m_d: Mapped[Optional[float]] = mapped_column(
        Float, nullable=True
    )
    capacidade_processamento_de_biogas_m_d: Mapped[Optional[float]] = mapped_column(
        Float, nullable=True
    )

    volume_processado_de_biogas_m_d: Mapped[Optional[float]] = mapped_column(
        Float, nullable=True
    )

    volume_processado_capacidade: Mapped[Optional[float]] = mapped_column(
        Float, nullable=True
    )

    active: Mapped[bool] = mapped_column(nullable=False, server_default=text("true"))
