from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Float, Boolean, ForeignKey
from app.models.base import BaseModel


class PendingPlantInfo(BaseModel):
    __tablename__ = "pending_plant_info"

    id: Mapped[int] = mapped_column(primary_key=True)

    plant_id: Mapped[int] = mapped_column(
        ForeignKey("plant.id", ondelete="CASCADE"),
        unique=True
    )

    capacidade_de_producao_nm_dia: Mapped[float] = mapped_column(Float, nullable=True)
    categoria_materia_prima: Mapped[str] = mapped_column(String(255), nullable=True)
    fonte_1: Mapped[str] = mapped_column(String(255), nullable=True)
    fonte_2: Mapped[str] = mapped_column(String(255), nullable=True)
    investimento: Mapped[str] = mapped_column(String(255), nullable=True)
    previsao_de_conclusao_de_obra: Mapped[str] = mapped_column(String(255), nullable=True)
    tipo_de_autorizacao: Mapped[str] = mapped_column(String(255), nullable=True)
    tipo_localizacao: Mapped[str] = mapped_column(String(255), nullable=True)
    concluida: Mapped[str] = mapped_column(String(255), nullable=True)
    status: Mapped[str] = mapped_column(String(100), nullable=True)

    plant: Mapped["Plant"] = relationship(back_populates="pending_info")
