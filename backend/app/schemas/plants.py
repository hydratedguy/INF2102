from pydantic import BaseModel

class AuthorizedPlantInfoOut(BaseModel):
    id: int
    capacidade_nm3_d: float | None
    link_aea: str | None
    link_ao: str | None
    n_da_autorizacao_aea: str | None
    n_da_autorizacao_ao: str | None

    class Config:
        from_attributes = True

class PendingPlantInfoOut(BaseModel):
    id: int
    capacidade_de_producao_nm_dia: float | None
    categoria_materia_prima: str | None
    fonte_1: str | None
    fonte_2: str | None
    investimento: str | None
    previsao_de_conclusao_de_obra: str | None
    tipo_de_autorizacao: str | None
    tipo_localizacao: str | None
    concluida: str | None
    status: str | None

    class Config:
        from_attributes = True

class PlantOut(BaseModel):
    id: int
    cnpj: str | None
    empresa: str | None
    municipio: str | None
    uf: str | None
    lat: float | None
    long: float | None
    materia_prima: str | None
    active: bool
    
    authorized_info: AuthorizedPlantInfoOut | None = None
    pending_info: PendingPlantInfoOut | None = None

    class Config:
        from_attributes = True
