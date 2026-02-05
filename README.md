# SimBio - Simulador de Biometano

SimBio e um simulador de cadeia de suprimentos de biometano desenvolvido para analisar e avaliar a viabilidade financeira de projetos de producao e distribuicao de biometano no Brasil.

## Funcionalidades

- **Simulacao multi-fonte**: Modelagem de tres tipos de fontes de materia-prima (aterros sanitarios, ecoparques e usinas de alcool)
- **Interface de mapa interativo**: Selecao visual de usinas, fontes e destinos
- **Modelagem logistica**: Calculo de custos de transporte de materia-prima e biometano
- **Analise financeira completa**: CAPEX, OPEX, receitas, impostos (ICMS) e payback

---

## Pre-requisitos

Antes de iniciar, certifique-se de ter instalado:

| Software | Versao Minima | Download |
|----------|---------------|----------|
| Node.js | 18.x ou superior | https://nodejs.org/ |
| Python | 3.11 ou superior | https://www.python.org/ |
| PostgreSQL | 14.x ou superior | https://www.postgresql.org/ |
| Poetry | 1.5 ou superior | https://python-poetry.org/ |
| Git | 2.x | https://git-scm.com/ |

### Verificar instalacoes

```bash
node --version
python --version
psql --version
poetry --version
git --version
```

---

## Instalacao

### 1. Clonar o repositorio

```bash
git clone https://github.com/hydratedguy/INF2102
cd galp-simbio
```

### 2. Configurar o banco de dados

> **IMPORTANTE**: Este projeto utiliza um banco de dados PostgreSQL hospedado em uma maquina virtual, ja pre-configurado com todos os dados necessarios (usinas, aterros, ecoparques, pontos de entrega, etc.).
>
> **Nao e necessario criar ou popular o banco de dados manualmente.** A conexao ja esta configurada em `backend/app/db/session.py`.
>
> Caso a VM esteja inacessivel, siga as instrucoes abaixo para configurar um banco local.

#### 2.1 (Opcional) Criar banco de dados local

Apenas se necessario configurar um banco local:

```bash
# Acessar o PostgreSQL
psql -U postgres

# Criar banco de dados
CREATE DATABASE simbio;

# Criar usuario (opcional)
CREATE USER simbio_user WITH PASSWORD 'sua_senha';
GRANT ALL PRIVILEGES ON DATABASE simbio TO simbio_user;

# Sair
\q
```

#### 2.2 (Opcional) Configurar conexao local

Para usar um banco local, edite o arquivo `backend/app/db/session.py` e altere a URL de conexao:

```python
# Conexao atual (VM com dados pre-populados) - NAO ALTERAR a menos que necessario
DATABASE_URL = "postgresql+psycopg2://galp:galp@139.82.100.37:30449/galp"

# Para usar banco local, comente a linha acima e descomente abaixo:
# DATABASE_URL = "postgresql+psycopg2://postgres:sua_senha@localhost:5432/simbio"
```

### 3. Instalar o Backend

```bash
# Entrar no diretorio do backend
cd backend

# Instalar dependencias com Poetry
poetry install

# Ativar ambiente virtual
poetry env activate

# Executar migracoes do banco de dados caso use banco local
alembic upgrade head
```

### 4. Instalar o Frontend

```bash
# Voltar para a raiz e entrar no diretorio do frontend
cd ../frontend

# Instalar dependencias
npm install
```

---

## Executando o Projeto

### Iniciar o Backend

```bash
cd backend

# Ativar ambiente virtual (se ainda nao estiver ativo)
poetry env activate

# Iniciar servidor
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

O backend estara disponivel em: `http://localhost:8000`

### Iniciar o Frontend

Em outro terminal:

```bash
cd frontend

# Iniciar servidor de desenvolvimento
npm run dev
```

O frontend estara disponivel em: `http://localhost:5173`

---

## Estrutura do Projeto

```
galp-simbio/
├── frontend/                # Aplicacao React
│   ├── src/
│   │   ├── app/             # Configuracao Redux
│   │   ├── components/      # Componentes React
│   │   ├── services/        # Cliente API
│   │   ├── store/           # Slices Redux
│   │   └── types/           # Tipos TypeScript
│   └── package.json
│
├── backend/                 # API FastAPI
│   ├── app/
│   │   ├── api/             # Rotas FastAPI
│   │   ├── data/            # Valores padrao
│   │   ├── models/          # Modelos SQLAlchemy
│   │   ├── schemas/         # Schemas Pydantic
│   │   ├── services/        # Logica de negocio
│   │   └── main.py          # Entrada da aplicacao
│   ├── alembic/             # Migracoes de banco
│   └── pyproject.toml
│
└── wiki/                    # Documentacao
```

---

## Stack Tecnologico

### Frontend
- React 19
- TypeScript 5.x
- Vite 7
- Redux Toolkit
- Material-UI (MUI) 7
- Leaflet (mapas)
- Axios

### Backend
- Python 3.11+
- FastAPI
- SQLAlchemy 2.0
- PostgreSQL
- Alembic
- Uvicorn

---

## Scripts Disponiveis

### Frontend

| Comando | Descricao |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Gera build de producao |
| `npm run lint` | Executa linter |
| `npm run preview` | Visualiza build de producao |

### Backend

| Comando | Descricao |
|---------|-----------|
| `uvicorn app.main:app --reload` | Inicia servidor com hot-reload |
| `alembic upgrade head` | Aplica migracoes pendentes |
| `alembic revision --autogenerate -m "msg"` | Cria nova migracao |

---

## Solucao de Problemas

### Erro de conexao com banco de dados

1. Verifique se o PostgreSQL esta rodando
2. Confirme as credenciais em `backend/app/db/session.py`
3. Verifique se o banco `simbio` existe

### Erro ao instalar dependencias do backend

```bash
# No Windows, pode ser necessario instalar o Visual C++ Build Tools
# ou usar psycopg2-binary ao inves de psycopg2
```

### Porta ja em uso

```bash
# Backend (trocar porta)
uvicorn app.main:app --reload --port 8001

# Frontend (trocar porta)
npm run dev -- --port 3000
```

---
