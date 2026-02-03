# Documentação Técnica do Projeto

## Arquitetura Geral

O SimBio é uma aplicação web com arquitetura cliente-servidor, separando frontend e backend em módulos independentes.

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│    Frontend     │────▶│     Backend     │────▶│   PostgreSQL    │
│  React + Vite   │◀────│    FastAPI      │◀────│                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

---

## Stack Tecnológico

### Frontend
| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| React | 19 | Framework UI |
| TypeScript | 5.x | Tipagem estática |
| Vite | 7 | Build tool |
| Redux Toolkit | - | Gerenciamento de estado |
| Material-UI (MUI) | 7 | Componentes UI |
| Leaflet | - | Mapas interativos |
| Axios | - | Cliente HTTP |
| React Router | 7 | Roteamento |

### Backend
| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| Python | 3.11+ | Linguagem |
| FastAPI | - | Framework web |
| SQLAlchemy | 2.0 | ORM |
| PostgreSQL | - | Banco de dados |
| Alembic | - | Migrações |
| Uvicorn | - | Servidor ASGI |

---

## Requisitos Funcionais

### RF01 - Visualização de Mapa
O sistema deve exibir um mapa interativo do Brasil com marcadores para:
- Fontes de matéria-prima (aterros, ecoparques, usinas de álcool)
- Usinas de biometano (autorizadas e em planejamento)
- Pontos de entrega de gás

### RF02 - Seleção de Componentes
O usuário deve poder selecionar via clique no mapa:
- Uma fonte de matéria-prima (opcional)
- Uma usina de biometano (obrigatório)
- Um ponto de destino (obrigatório)

### RF03 - Configuração de Transporte
O sistema deve permitir seleção de tipos de transporte:
- Matéria-prima: Carreta Basculante, Caminhão Tanque-Vácuo, Caminhão Tanque
- Biometano: Caminhão GNC, Caminhão GNL, Duto

### RF04 - Auto-seleção de Transporte
O sistema deve automaticamente selecionar o transporte adequado baseado no tipo de fonte:
- Usinas de álcool → Caminhão Tanque (Vinhaça)
- Aterros/Ecoparques → Carreta Basculante (RSU)

### RF05 - Execução de Simulação
O sistema deve calcular e exibir:
- Produção diária de biogás e biometano
- Custos (CAPEX, OPEX, logística, aquisição de MP)
- Receitas (bruta, ICMS, líquida)
- Resultado financeiro (lucro anual)

### RF06 - Detalhamento de Cálculos
O sistema deve fornecer explicação detalhada de como cada valor é calculado via modal informativo.

---

## Requisitos Não-Funcionais

### RNF01 - Desempenho
- Tempo de resposta da simulação: < 3 segundos
- Carregamento inicial do mapa: < 5 segundos

### RNF02 - Usabilidade
- Interface responsiva para desktop e tablet
- Feedback visual para ações do usuário
- Tooltips explicativos em valores calculados

### RNF03 - Disponibilidade
- Sistema disponível 99% do tempo em horário comercial

### RNF04 - Segurança
- CORS configurado para origens permitidas

---

## Modelo de Dados

### Entidades Principais

#### Plant (Usina)
```
Plant
├── id: Integer (PK)
├── cnpj: String
├── razao_social: String
├── municipio: String
├── uf: String (2 chars)
├── latitude: Float
├── longitude: Float
├── tipo_materia_prima: String
└── relationships
    ├── authorized_info: AuthorizedPlantInfo
    └── pending_info: PendingPlantInfo
```

#### Fontes de Matéria-Prima
```
AterrosSanitarios
├── id: Integer (PK)
├── nome: String
├── municipio: String
├── uf: String
├── latitude: Float
├── longitude: Float
└── volume_diario_recebido: Float

Ecoparque
├── id: Integer (PK)
├── nome: String
├── operador: String
├── municipio: String
├── uf: String
├── latitude: Float
└── longitude: Float

UsinasAlcool
├── id: Integer (PK)
├── nome: String
├── municipio: String
├── uf: String
├── latitude: Float
└── longitude: Float
```

#### Destinos
```
PontosEntregaGas
├── id: Integer (PK)
├── nome: String
├── estado: String
├── municipio: String
├── tipo_transporte: String
├── latitude: Float
└── longitude: Float
```

#### Etapas de Processamento
```
PreTratamento, Biodigestao, Purificacao,
PosProcessamento, Digestato, CO2
├── id: Integer (PK)
├── tipo/tecnologia: String
├── capex: Float
├── opex_anual: Float
└── [parâmetros específicos]
```

---

## Fluxo de Simulação

```
┌─────────────────────────────────────────────────────────────────┐
│                        ENTRADA (Input)                          │
├─────────────────────────────────────────────────────────────────┤
│ • source_id, source_type (opcional)                             │
│ • plant_id (obrigatório)                                        │
│ • destination_id (obrigatório)                                  │
│ • transport_raw_material_type                                   │
│ • transport_biomethane_type                                     │
│ • biomethane_price_per_m3                                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CÁLCULO DE DISTÂNCIAS                        │
├─────────────────────────────────────────────────────────────────┤
│ • Haversine(origem, usina) × 1.3                                │
│ • Haversine(usina, destino) × 1.3                               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CÁLCULO DE LOGÍSTICA                         │
├─────────────────────────────────────────────────────────────────┤
│ • viagens_dia = ceil(quantidade / capacidade_veiculo)           │
│ • custo_viagem = distância × 2 × custo_km                       │
│ • custo_diario = viagens_dia × custo_viagem                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CÁLCULO DE PRODUÇÃO                          │
├─────────────────────────────────────────────────────────────────┤
│ • biogas_m3_dia = capacidade_usina / (efic_bio × efic_purif)    │
│ • biometano_m3_dia = capacidade_usina                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CÁLCULO FINANCEIRO                           │
├─────────────────────────────────────────────────────────────────┤
│ • CAPEX = investimento_usina OU soma(capex_etapas)              │
│ • OPEX_anual = soma(opex_etapas)                                │
│ • Receita_bruta = biometano × preço × 365                       │
│ • ICMS = receita_bruta × aliquota_estado                        │
│ • Receita_liquida = receita_bruta - ICMS                        │
│ • Lucro = receita_liquida - OPEX - logistica - aquisicao_MP     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        SAÍDA (Output)                           │
├─────────────────────────────────────────────────────────────────┤
│ • Produção: biogas_m3_day, biomethane_m3_day                    │
│ • Logística: distâncias, viagens, custos diários/anuais         │
│ • Custos: CAPEX, OPEX, logística, aquisição MP                  │
│ • Receita: bruta, ICMS, líquida                                 │
│ • Resultado: lucro_anual, payback_anos                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## API Endpoints

### Simulação
```
POST /simulation/run
Body: SimulationInput
Response: SimulationResult
```

### Dados do Mapa
```
GET /plants              → Lista de usinas
GET /destinations        → Pontos de entrega
GET /aterros-sanitarios  → Aterros sanitários
GET /ecoparques          → Ecoparques
GET /usinas-alcool       → Usinas de álcool
```

---

## Estrutura de Diretórios

```
galp-simbio/
├── frontend/
│   ├── src/
│   │   ├── app/              # Configuração Redux
│   │   ├── components/       # Componentes React
│   │   │   ├── atoms/        # Componentes básicos
│   │   │   ├── molecules/    # Componentes compostos
│   │   │   └── organisms/    # Componentes complexos
│   │   ├── services/         # Cliente API
│   │   ├── store/            # Slices Redux
│   │   └── types/            # Tipos TypeScript
│   └── package.json
│
├── backend/
│   └── app/
│       ├── api/              # Rotas FastAPI
│       ├── data/             # Valores padrão
│       ├── models/           # Modelos SQLAlchemy
│       ├── schemas/          # Schemas Pydantic
│       ├── services/         # Lógica de negócio
│       └── main.py           # Entrada da aplicação
│
└── wiki/                     # Esta documentação
```
