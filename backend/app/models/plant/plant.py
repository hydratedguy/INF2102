from typing import TYPE_CHECKING, Any
from uuid import UUID

from sqlalchemy import JSON, Boolean, ForeignKey, String, UniqueConstraint, false, Float, text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import BaseModel


class Plant(BaseModel):
    __tablename__ = "plant"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    cnpj: Mapped[str] = mapped_column(String(50), nullable=True)
    empresa: Mapped[str] = mapped_column(String(255), nullable=True)
    municipio: Mapped[str] = mapped_column(String(255), nullable=True)
    uf: Mapped[str] = mapped_column(String(10), nullable=True)
    lat: Mapped[float] = mapped_column(Float, nullable=True)
    long: Mapped[float] = mapped_column(Float, nullable=True)
    materia_prima: Mapped[str] = mapped_column(String(255), nullable=True)

    active: Mapped[bool] = mapped_column(nullable=False, server_default=text("true"))

    authorized_info: Mapped["AuthorizedPlantInfo"] = relationship(
        back_populates="plant",
        uselist=False,
        cascade="all, delete-orphan"
    )

    pending_info: Mapped["PendingPlantInfo"] = relationship(
        back_populates="plant",
        uselist=False,
        cascade="all, delete-orphan"
    )