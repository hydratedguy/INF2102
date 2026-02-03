from sqladmin import ModelView

from app.models.pre_tratamento import PreTratamento
from app.models.biodigestao import Biodigestao
from app.models.purificacao import Purificacao
from app.models.pos_processamento import PosProcessamento
from app.models.digestato import Digestato
from app.models.co2 import CO2


class PreTratamentoAdmin(ModelView, model=PreTratamento):
    column_list = [PreTratamento.id, PreTratamento.nome, PreTratamento.custo_investimento, PreTratamento.custo_operacional]
    column_searchable_list = [PreTratamento.nome]
    column_sortable_list = [PreTratamento.id, PreTratamento.nome]
    name = "Pré-tratamento"
    name_plural = "Pré-tratamentos"
    icon = "fa-solid fa-filter"


class BiodigestaoAdmin(ModelView, model=Biodigestao):
    column_list = [Biodigestao.id, Biodigestao.nome, Biodigestao.custo_investimento, Biodigestao.custo_operacional, Biodigestao.eficiencia]
    column_searchable_list = [Biodigestao.nome]
    column_sortable_list = [Biodigestao.id, Biodigestao.nome]
    name = "Biodigestão"
    name_plural = "Biodigestões"
    icon = "fa-solid fa-recycle"


class PurificacaoAdmin(ModelView, model=Purificacao):
    column_list = [Purificacao.id, Purificacao.nome, Purificacao.custo_investimento, Purificacao.custo_operacional, Purificacao.eficiencia, Purificacao.tecnologia]
    column_searchable_list = [Purificacao.nome, Purificacao.tecnologia]
    column_sortable_list = [Purificacao.id, Purificacao.nome]
    name = "Purificação"
    name_plural = "Purificações"
    icon = "fa-solid fa-wind"


class PosProcessamentoAdmin(ModelView, model=PosProcessamento):
    column_list = [PosProcessamento.id, PosProcessamento.nome, PosProcessamento.custo_investimento, PosProcessamento.custo_operacional, PosProcessamento.estado_biometano]
    column_searchable_list = [PosProcessamento.nome]
    column_sortable_list = [PosProcessamento.id, PosProcessamento.nome]
    name = "Pós-processamento"
    name_plural = "Pós-processamentos"
    icon = "fa-solid fa-cogs"


class DigestatoAdmin(ModelView, model=Digestato):
    column_list = [Digestato.id, Digestato.nome, Digestato.custo_investimento, Digestato.custo_operacional]
    column_searchable_list = [Digestato.nome]
    column_sortable_list = [Digestato.id, Digestato.nome]
    name = "Digestato"
    name_plural = "Digestatos"
    icon = "fa-solid fa-leaf"


class CO2Admin(ModelView, model=CO2):
    column_list = [CO2.id, CO2.nome, CO2.custo_investimento, CO2.custo_operacional]
    column_searchable_list = [CO2.nome]
    column_sortable_list = [CO2.id, CO2.nome]
    name = "CO2"
    name_plural = "CO2"
    icon = "fa-solid fa-cloud"


admin_views = [
    PreTratamentoAdmin,
    BiodigestaoAdmin,
    PurificacaoAdmin,
    PosProcessamentoAdmin,
    DigestatoAdmin,
    CO2Admin,
]
