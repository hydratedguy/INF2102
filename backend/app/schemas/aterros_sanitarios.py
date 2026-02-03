from pydantic import BaseModel
from typing import Optional

class AterrosSanitariosOut(BaseModel):
    id: int
    estado: Optional[str] = None
    municipio: Optional[str] = None
    nome: Optional[str] = None
    lat: Optional[float] = None
    long: Optional[float] = None
    operador: Optional[str] = None
    observacao: Optional[str] = None
    volume_recebido_toneladas_dia: Optional[float] = None
    porte: Optional[str] = None
    data_abertura: Optional[str] = None
    fonte_1: Optional[str] = None
    fonte_2: Optional[str] = None
    fonte_3: Optional[str] = None
    m3_biomethane_per_ton_rsu: Optional[float] = None
    active: bool

    class Config:
        from_attributes = True
