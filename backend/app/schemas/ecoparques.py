from pydantic import BaseModel
from typing import Optional

class EcoparqueOut(BaseModel):
    id: int
    nome: Optional[str] = None
    lat: Optional[float] = None
    long: Optional[float] = None
    tipo_localizacao: Optional[str] = None
    empresa: Optional[str] = None
    municipio: Optional[str] = None
    estado: Optional[str] = None
    fonte: Optional[str] = None
    active: bool

    class Config:
        from_attributes = True
