from pydantic import BaseModel

class PontosEntregaOut(BaseModel):
    id: int
    nome: str | None
    estado: str | None
    municipio: str | None
    transporta: str | None
    segmento: str | None
    categoria: str | None
    classifica: str | None
    fonte: str | None
    id_ponto: int | None
    parent_id: int | None
    label: str | None
    active: bool
    name: str | None

    latitude: float | None
    longitude: float | None

    class Config:
        from_attributes = True
