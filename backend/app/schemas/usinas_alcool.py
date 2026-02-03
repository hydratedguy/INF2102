from pydantic import BaseModel
from typing import Optional

class UsinasAlcoolOut(BaseModel):
    id: int
    uf: Optional[str] = None
    unidade: Optional[str] = None
    perfil: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None

    class Config:
        from_attributes = True
