from pydantic import BaseModel

class DestinationOut(BaseModel):
    id: int
    nome: str | None
    estado: str | None
    municipio: str | None
    transporta: str | None
    latitude: float | None
    longitude: float | None

    class Config:
        from_attributes = True
