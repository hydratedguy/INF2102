from __future__ import annotations
from datetime import date
from typing import Optional

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Integer, Float, Date
# from geoalchemy2 import Geometry

from app.models.base import BaseModel


class GasodutoTransporte(BaseModel):
    __tablename__ = "gasoduto_transporte"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    objectid: Mapped[Optional[int]] = mapped_column(Integer)
    id_duto: Mapped[Optional[int]] = mapped_column(Integer)

    nome_dut_1: Mapped[Optional[str]] = mapped_column(String(254))
    label: Mapped[Optional[str]] = mapped_column(String(50))
    name: Mapped[Optional[str]] = mapped_column(String(50))

    munic_orig: Mapped[Optional[str]] = mapped_column(String(254))
    munic_dest: Mapped[Optional[str]] = mapped_column(String(254))

    comprim_km: Mapped[Optional[float]] = mapped_column(Float)
    shape_stle: Mapped[Optional[float]] = mapped_column(Float)

    diam_pol_x: Mapped[Optional[str]] = mapped_column(String(50))
    p_max_op: Mapped[Optional[str]] = mapped_column(String(254))
    transporta: Mapped[Optional[str]] = mapped_column(String(50))

    fontes: Mapped[Optional[str]] = mapped_column(String(254))
    fontedata: Mapped[Optional[str]] = mapped_column(String(50))

    inic_opera: Mapped[Optional[int]] = mapped_column(Integer)
    categoria: Mapped[Optional[int]] = mapped_column(Integer)
    parent_id: Mapped[Optional[int]] = mapped_column(Integer)

    created_da: Mapped[Optional[str]] = mapped_column(String(50))
    last_edi_1: Mapped[Optional[str]] = mapped_column(String(50))
    created_us: Mapped[Optional[str]] = mapped_column(String(254))
    last_edite: Mapped[Optional[str]] = mapped_column(String(254))

    situacao: Mapped[Optional[str]] = mapped_column(String(254))
    
    coords = relationship(
        "GasodutoTransporteCoords",
        backref="gasoduto",
        cascade="all, delete-orphan",
        order_by="GasodutoTransporteCoords.seq"
    )

    # geometry: Mapped[Optional[str]] = mapped_column(
    #     Geometry(geometry_type="LINESTRINGZ", srid=4674)
    # )
