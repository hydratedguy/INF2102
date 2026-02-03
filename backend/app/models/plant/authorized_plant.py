from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Float, ForeignKey
from app.models.base import BaseModel


class AuthorizedPlantInfo(BaseModel):
    __tablename__ = "authorized_plant_info"

    id: Mapped[int] = mapped_column(primary_key=True)

    plant_id: Mapped[int] = mapped_column(
        ForeignKey("plant.id", ondelete="CASCADE"),
        unique=True
    )

    capacidade_nm3_d: Mapped[float] = mapped_column(Float, nullable=True)
    link_aea: Mapped[str] = mapped_column(String(500), nullable=True)
    link_ao: Mapped[str] = mapped_column(String(500), nullable=True)
    n_da_autorizacao_aea: Mapped[str] = mapped_column(String(100), nullable=True)
    n_da_autorizacao_ao: Mapped[str] = mapped_column(String(100), nullable=True)

    plant: Mapped["Plant"] = relationship(back_populates="authorized_info")
