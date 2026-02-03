# SimBio - Documentacao Completa

> Documento compilado com toda a documentacao do projeto SimBio - Simulador de Biometano

---

# SimBio - Simulador de Biometano

## Breve Descricao

O **SimBio** e um simulador de cadeia de suprimentos de biometano desenvolvido para analisar e avaliar a viabilidade financeira de projetos de producao e distribuicao de biometano no Brasil.

### Funcao Principal
O sistema permite modelar cenarios completos desde a captacao de materia-prima ate a entrega do biometano ao consumidor final, calculando volumes de producao, custos, receitas e metricas financeiras chave.

### Funcionalidades Especificas
- **Simulacao multi-fonte**: Modelagem de tres tipos de fontes de materia-prima (aterros sanitarios, ecoparques e usinas de alcool)
- **Interface de mapa interativo**: Selecao visual de usinas, fontes e destinos
- **Modelagem logistica**: Calculo de custos de transporte de materia-prima e biometano
- **Analise financeira completa**: CAPEX, OPEX, receitas, impostos (ICMS) e payback
- **Configuracao de processos**: Parametrizacao de etapas de pre-tratamento, biodigestao, purificacao e pos-processamento

### Usuarios Contemplados
- Empresas de energia e produtores de biometano
- Investidores avaliando retorno de projetos
- Consultores ambientais e de energia
- Orgaos governamentais e reguladores
- Pesquisadores academicos em energia renovavel

### Natureza do Programa
Aplicacao web responsiva com frontend em React e backend em FastAPI, utilizando banco de dados PostgreSQL para armazenamento de dados e parametros de simulacao.

### Ressalvas de Uso
- Os valores calculados sao estimativas baseadas em parametros de referencia do mercado brasileiro
- Distancias sao aproximadas usando formula de Haversine com fator de correcao de 1.3x para estradas
- Aliquotas de ICMS podem variar conforme legislacao estadual vigente
- Os resultados devem ser validados com estudos de viabilidade detalhados antes de decisoes de investimento

---

# Visao de Projeto

## Objetivo

O SimBio foi desenvolvido para preencher uma lacuna no mercado brasileiro de biometano: a falta de ferramentas acessiveis para analise rapida de viabilidade de projetos. A ferramenta visa democratizar o acesso a analises financeiras que anteriormente exigiam consultoria especializada.

## Cenarios de Uso

### Cenarios Positivos
Descrevem situacoes onde o sistema atende com sucesso as necessidades dos usuarios:

1. **Cenario Positivo 1 - Analise de Viabilidade por Investidor**
   Um investidor utiliza o SimBio para avaliar rapidamente a viabilidade de um projeto de biometano, tomando uma decisao informada sobre alocacao de capital.

2. **Cenario Positivo 2 - Comparacao de Rotas Logisticas**
   Um consultor de energia compara diferentes configuracoes de transporte para otimizar custos logisticos de um projeto existente.

### Cenarios Negativos
Descrevem situacoes problematicas que revelam limitacoes ou areas de melhoria:

1. **Cenario Negativo 1 - Dados Incompletos no Mapa**
   Um usuario nao encontra a fonte de materia-prima desejada no mapa, revelando a necessidade de atualizacao constante da base de dados.

2. **Cenario Negativo 2 - Resultado Financeiro Inviavel**
   Um usuario obtem resultado de projeto inviavel mas nao consegue identificar quais parametros ajustar para melhorar a viabilidade.

---

# Cenario Positivo 1: Analise de Viabilidade por Investidor

## Contexto

**Ator**: Ricardo Mendes, 45 anos, diretor de investimentos de um fundo de energia renovavel
**Ambiente**: Escritorio em Sao Paulo, usando laptop com conexao a internet
**Objetivo**: Avaliar rapidamente a viabilidade de investir em um projeto de biometano em Goias
**Conhecimento previo**: Experiencia em analise financeira, conhecimento basico sobre biometano

## Narrativa

Ricardo recebeu uma proposta de investimento em uma usina de biometano localizada em Goias que processaria residuos de um aterro sanitario proximo. O projeto solicita R$ 50 milhoes e promete retorno em 5 anos. Antes de encaminhar para analise detalhada do comite, Ricardo precisa fazer uma avaliacao preliminar.

Ele acessa o SimBio e visualiza o mapa do Brasil com os marcadores de usinas, fontes de materia-prima e pontos de entrega de gas. Usando o filtro de busca, ele localiza a regiao de Goias e identifica o aterro sanitario mencionado na proposta.

Ricardo clica no marcador do aterro sanitario para seleciona-lo como **Materia Prima**. O sistema automaticamente seleciona "Carreta Basculante (RSU)" como transporte, ja que e o veiculo adequado para residuos solidos urbanos. Em seguida, ele seleciona a usina de biometano proposta no card **Usina**.

Para o destino, Ricardo procura um ponto de entrega de gas na regiao Centro-Oeste. Ele seleciona um gasoduto em Goias como **Destinacao** e escolhe "Duto (Gasoduto)" como **Transporte Biometano**, ja que ha infraestrutura de dutos na regiao.

Com todas as selecoes feitas, Ricardo clica no botao **"Simular"**. Apos alguns segundos, os resultados aparecem:

- **Producao**: 45.000 Nm3/dia de biometano
- **CAPEX Total**: R$ 48.000.000 (proximo do valor solicitado)
- **OPEX Anual**: R$ 4.200.000
- **Logistica Anual**: R$ 890.000
- **Receita Liquida Anual**: R$ 52.000.000
- **Lucro Anual**: R$ 12.500.000 (em verde, indicando viabilidade)

Ricardo nota o icone de informacao ao lado do CAPEX e passa o mouse sobre ele, vendo que o valor foi obtido diretamente dos dados da usina selecionada. Ele clica no icone de informacoes ao lado do titulo "Resultado da Simulacao" para entender como os valores foram calculados.

O modal de explicacao detalha cada componente: a producao de biogas baseada na quantidade de RSU, a eficiencia de conversao para biometano, os custos de cada etapa do processo, e a aliquota de ICMS de Goias (2,7% - uma das mais baixas do pais devido a incentivos fiscais).

Satisfeito com a analise preliminar, Ricardo exporta uma captura de tela dos resultados e agenda uma reuniao com sua equipe para analise mais detalhada do projeto.

## Resultado

Ricardo conseguiu, em menos de 10 minutos, fazer uma analise preliminar de viabilidade que confirma os numeros apresentados na proposta. Ele identificou que:
- O CAPEX solicitado esta alinhado com estimativas de mercado
- A localizacao em Goias e estrategica devido aos incentivos fiscais de ICMS
- O projeto apresenta potencial de lucro anual significativo

## Funcionalidades Utilizadas

1. Mapa interativo com filtros de busca
2. Selecao de materia-prima, usina e destino via clique no mapa
3. Auto-selecao de transporte baseado no tipo de fonte
4. Simulacao com calculo completo de custos e receitas
5. Tooltips informativos sobre valores
6. Modal de explicacao detalhada dos calculos

---

# Cenario Positivo 2: Comparacao de Rotas Logisticas

## Contexto

**Ator**: Carla Oliveira, 32 anos, consultora de energia em uma empresa de consultoria ambiental
**Ambiente**: Home office, usando desktop com dois monitores
**Objetivo**: Comparar diferentes configuracoes de transporte de biometano para otimizar custos de um cliente
**Conhecimento previo**: Especialista em logistica de energia, usuaria frequente do SimBio

## Narrativa

Carla esta elaborando um relatorio para um cliente que possui uma usina de biometano em Sao Paulo e precisa decidir entre tres opcoes de transporte para entregar o biometano a diferentes destinos: caminhao GNC (gas natural comprimido), caminhao GNL (gas natural liquefeito) ou injecao em gasoduto.

Ela acessa o SimBio e rapidamente localiza a usina do cliente no mapa de Sao Paulo. Como a usina utiliza vinhaca de uma usina de alcool vizinha como materia-prima, Carla seleciona a usina de alcool correspondente. O sistema automaticamente configura "Caminhao Tanque (Vinhaca)" como transporte de materia-prima.

Para a primeira simulacao, Carla seleciona um ponto de entrega em Campinas (100 km de distancia) e escolhe **"Caminhao GNC (Comprimido)"** como transporte de biometano. Ela anota os resultados:
- Logistica Anual: R$ 1.850.000
- Viagens/dia: 12
- Custo/dia: R$ 5.068

Para a segunda simulacao, Carla mantem o mesmo destino mas troca para **"Caminhao GNL (Liquefeito)"**. Os novos resultados mostram:
- Logistica Anual: R$ 680.000
- Viagens/dia: 5
- Custo/dia: R$ 1.863

Carla observa que, apesar do custo por Nm3/km do GNL ser menor, a reducao mais significativa vem da maior capacidade do caminhao GNL (10.000 Nm3 vs 4.000 Nm3 do GNC), que reduz o numero de viagens necessarias.

Para a terceira simulacao, ela seleciona um ponto de entrega conectado ao gasoduto da regiao e escolhe **"Duto (Gasoduto)"**:
- Logistica Anual: R$ 520.000
- Viagens/dia: 1 (continuo)
- Custo/dia: R$ 1.425

Carla abre o modal de informacoes para confirmar que entendeu corretamente: o custo do duto e calculado por Nm3/km com capacidade ilimitada, resultando em apenas uma "viagem" continua por dia.

Ela compila os tres cenarios em uma tabela comparativa:

| Transporte | Logistica Anual | Economia vs GNC |
|------------|-----------------|-----------------|
| Caminhao GNC | R$ 1.850.000 | - |
| Caminhao GNL | R$ 680.000 | 63% |
| Gasoduto | R$ 520.000 | 72% |

Com esses dados, Carla prepara uma recomendacao para o cliente: se houver acesso ao gasoduto, esta e a opcao mais economica. Caso contrario, o investimento em infraestrutura de liquefacao (GNL) pode se pagar rapidamente comparado ao transporte por GNC.

## Resultado

Carla conseguiu comparar tres cenarios logisticos em menos de 15 minutos, obtendo dados quantitativos para embasar sua recomendacao ao cliente. A analise revelou que:
- O transporte por gasoduto oferece economia de 72% comparado ao GNC
- O GNL e uma alternativa viavel quando nao ha acesso a gasodutos
- A capacidade do veiculo impacta mais o custo do que a tarifa por km

## Funcionalidades Utilizadas

1. Manutencao de selecoes entre simulacoes (mesma fonte e usina)
2. Troca rapida de tipo de transporte via dropdown
3. Comparacao de diferentes destinos
4. Detalhes de logistica (distancia, viagens/dia, custo/dia)
5. Modal explicativo dos calculos de transporte
6. Subtitulos informativos nos cards de transporte mostrando capacidade e custo/km

---

# Cenario Negativo 1: Dados Incompletos no Mapa

## Contexto

**Ator**: Fernando Santos, 38 anos, engenheiro ambiental de uma prefeitura no interior do Parana
**Ambiente**: Escritorio da secretaria de meio ambiente, usando computador institucional
**Objetivo**: Avaliar a viabilidade de um projeto de biometano utilizando o aterro sanitario municipal
**Conhecimento previo**: Conhecimento tecnico em gestao de residuos, primeira vez usando o SimBio

## Narrativa

Fernando esta elaborando um estudo preliminar para apresentar a camara de vereadores sobre a possibilidade de transformar o aterro sanitario do municipio em uma fonte de biometano. Ele ouviu falar do SimBio em um congresso e decide utiliza-lo.

Ao acessar o sistema, Fernando visualiza o mapa do Brasil e utiliza o campo de busca para encontrar seu municipio no Parana. Ele digita o nome da cidade, mas nenhum resultado aparece. Ele tenta filtrar apenas por "Materia Prima" e navega manualmente pelo mapa ate a regiao.

Ao fazer zoom na area do seu municipio, Fernando percebe que nao ha nenhum marcador de aterro sanitario na regiao. O aterro municipal, que recebe 150 toneladas de residuos por dia, simplesmente nao esta cadastrado no sistema.

Frustrado, Fernando tenta uma abordagem alternativa: ele seleciona um aterro de um municipio vizinho apenas para entender como o sistema funciona. Consegue fazer uma simulacao, mas os resultados nao refletem a realidade do seu projeto, ja que as distancias e volumes sao diferentes.

Fernando procura no sistema alguma forma de cadastrar um novo aterro ou inserir dados customizados, mas nao encontra essa funcionalidade na interface principal.

Sem conseguir utilizar o sistema para seu caso especifico, Fernando e forcado a:
1. Usar os dados de um municipio vizinho como aproximacao grosseira
2. Fazer calculos manuais em uma planilha separada
3. Abandonar a analise e buscar uma consultoria especializada

## Resultado

Fernando nao conseguiu completar sua analise de viabilidade usando o SimBio devido a ausencia de dados do seu municipio. Isso resultou em:
- Perda de tempo tentando encontrar workarounds
- Frustracao com a ferramenta
- Necessidade de recorrer a metodos alternativos menos precisos
- Possivel desistencia do projeto por falta de dados embasados

## Problemas Identificados

1. **Base de dados incompleta**: Nem todos os aterros sanitarios do Brasil estao cadastrados
2. **Busca limitada**: A busca nao encontra municipios, apenas nomes de instalacoes
3. **Sem entrada de dados customizados**: Usuarios nao podem inserir dados de fontes nao cadastradas
4. **Feedback insuficiente**: O sistema nao informa que a regiao nao possui dados disponiveis
5. **Acesso restrito ao admin**: Usuarios nao podem contribuir com novos dados

## Oportunidades de Melhoria

1. **Ampliar base de dados**: Incluir todos os aterros sanitarios licenciados do Brasil
2. **Melhorar busca**: Permitir busca por municipio, estado ou regiao
3. **Modo customizado**: Permitir que usuarios insiram coordenadas e parametros manualmente
4. **Feedback proativo**: Quando uma regiao nao tem dados, sugerir alternativas ou explicar como solicitar inclusao
5. **Contribuicao de dados**: Criar fluxo para usuarios sugerirem novos pontos para validacao e inclusao
6. **Mensagem informativa**: Exibir aviso quando o zoom esta em area sem dados cadastrados

---

# Cenario Negativo 2: Resultado Financeiro Inviavel

## Contexto

**Ator**: Mariana Costa, 29 anos, analista de novos negocios de uma distribuidora de gas
**Ambiente**: Escritorio corporativo, usando notebook durante reuniao de planejamento
**Objetivo**: Apresentar analise de viabilidade de um projeto de biometano para a diretoria
**Conhecimento previo**: Experiencia em analise de projetos de gas, conhecimento moderado sobre biometano

## Narrativa

Mariana esta em uma reuniao com a diretoria apresentando oportunidades de diversificacao para biometano. Ela decide fazer uma simulacao ao vivo para demonstrar o potencial de um projeto que a equipe comercial identificou: uma usina em Minas Gerais que processaria dejetos de um ecoparque proximo.

Com confianca, Mariana acessa o SimBio e rapidamente seleciona o ecoparque como fonte de materia-prima, a usina em questao, e um ponto de entrega distante onde a empresa ja possui infraestrutura. O sistema configura automaticamente o transporte de materia-prima como "Carreta Basculante".

Para o transporte de biometano, como nao ha gasoduto na regiao, ela seleciona "Caminhao GNC (Comprimido)". Mariana clica em "Simular" esperando ver numeros promissores.

Os resultados aparecem, e o coracao de Mariana dispara ao ver:
- **Lucro Anual**: **-R$ 2.340.000** (em vermelho)
- OPEX Anual: R$ 8.500.000
- Logistica Anual: R$ 6.200.000
- Receita Liquida: R$ 12.360.000

O projeto e claramente inviavel. A diretoria questiona: "O que esta causando esse prejuizo? Podemos ajustar algo para torna-lo viavel?"

Mariana olha para os numeros mas nao consegue identificar rapidamente qual componente esta fora do esperado. Ela abre o modal de informacoes, mas ele explica apenas *como* os valores sao calculados, nao *por que* estao altos ou *o que* poderia ser ajustado.

Ela tenta mudar algumas variaveis:
- Troca o destino para um mais proximo, mas nao sabe qual seria ideal
- Considera trocar o tipo de transporte, mas nao tem certeza do impacto
- Gostaria de testar um volume diferente de materia-prima, mas essa opcao nao esta disponivel na interface

A diretoria fica impaciente enquanto Mariana faz multiplas simulacoes tentando encontrar uma configuracao viavel. Ela consegue melhorar o resultado trocando para um destino mais proximo e usando GNL ao inves de GNC, mas o lucro ainda e marginal.

Sem uma ferramenta de analise de sensibilidade ou recomendacoes do sistema, Mariana nao consegue responder com confianca:
- Qual a distancia maxima viavel para este projeto?
- Qual o volume minimo de materia-prima necessario?
- Qual combinacao de parametros otimizaria o resultado?

## Resultado

A apresentacao nao foi bem-sucedida. Mariana conseguiu mostrar que o projeto inicial era inviavel, mas nao conseguiu:
- Identificar rapidamente os principais direcionadores de custo
- Propor ajustes especificos para viabilizar o projeto
- Responder perguntas da diretoria sobre limiares de viabilidade
- Demonstrar dominio da analise financeira

## Problemas Identificados

1. **Sem analise de sensibilidade**: O sistema nao mostra quais variaveis tem maior impacto no resultado
2. **Sem comparacao de cenarios**: Nao e possivel ver multiplos cenarios lado a lado
3. **Sem recomendacoes**: O sistema nao sugere ajustes quando o resultado e negativo
4. **Parametros fixos**: Volume de materia-prima e preco de venda nao sao configuraveis pelo usuario
5. **Sem indicadores de referencia**: Nao ha benchmarks para comparar se custos estao dentro do esperado
6. **Sem destaque de problemas**: O sistema nao indica qual componente esta causando inviabilidade

## Oportunidades de Melhoria

1. **Analise de sensibilidade**: Grafico mostrando impacto de cada variavel no lucro
2. **Modo comparativo**: Permitir salvar e comparar multiplos cenarios
3. **Alertas inteligentes**: Destacar componentes com valores atipicos (ex: "Logistica representa 50% dos custos - acima da media de 25%")
4. **Parametros editaveis**: Permitir ajustar volume de materia-prima, preco de venda, e outros inputs
5. **Sugestoes de otimizacao**: "Para tornar viavel, reduza a distancia de destino para menos de 150km ou aumente o volume para 500 ton/dia"
6. **Breakeven analysis**: Mostrar ponto de equilibrio para cada variavel
7. **Historico de simulacoes**: Permitir comparar simulacoes anteriores da sessao
8. **Exportacao de relatorio**: Gerar PDF com analise detalhada para apresentacoes

---

# Documentacao Tecnica do Projeto

## Arquitetura Geral

O SimBio e uma aplicacao web com arquitetura cliente-servidor, separando frontend e backend em modulos independentes.

```
+-----------------+     +-----------------+     +-----------------+
|    Frontend     |---->|     Backend     |---->|   PostgreSQL    |
|  React + Vite   |<----|    FastAPI      |<----|                 |
+-----------------+     +-----------------+     +-----------------+
```

---

## Stack Tecnologico

### Frontend
| Tecnologia | Versao | Proposito |
|------------|--------|-----------|
| React | 19 | Framework UI |
| TypeScript | 5.x | Tipagem estatica |
| Vite | 7 | Build tool |
| Redux Toolkit | - | Gerenciamento de estado |
| Material-UI (MUI) | 7 | Componentes UI |
| Leaflet | - | Mapas interativos |
| Axios | - | Cliente HTTP |
| React Router | 7 | Roteamento |

### Backend
| Tecnologia | Versao | Proposito |
|------------|--------|-----------|
| Python | 3.11+ | Linguagem |
| FastAPI | - | Framework web |
| SQLAlchemy | 2.0 | ORM |
| PostgreSQL | - | Banco de dados |
| Alembic | - | Migracoes |
| Uvicorn | - | Servidor ASGI |

---

## Requisitos Funcionais

### RF01 - Visualizacao de Mapa
O sistema deve exibir um mapa interativo do Brasil com marcadores para:
- Fontes de materia-prima (aterros, ecoparques, usinas de alcool)
- Usinas de biometano (autorizadas e em planejamento)
- Pontos de entrega de gas

### RF02 - Selecao de Componentes
O usuario deve poder selecionar via clique no mapa:
- Uma fonte de materia-prima (opcional)
- Uma usina de biometano (obrigatorio)
- Um ponto de destino (obrigatorio)

### RF03 - Configuracao de Transporte
O sistema deve permitir selecao de tipos de transporte:
- Materia-prima: Carreta Basculante, Caminhao Tanque-Vacuo, Caminhao Tanque
- Biometano: Caminhao GNC, Caminhao GNL, Duto

### RF04 - Auto-selecao de Transporte
O sistema deve automaticamente selecionar o transporte adequado baseado no tipo de fonte:
- Usinas de alcool -> Caminhao Tanque (Vinhaca)
- Aterros/Ecoparques -> Carreta Basculante (RSU)

### RF05 - Execucao de Simulacao
O sistema deve calcular e exibir:
- Producao diaria de biogas e biometano
- Custos (CAPEX, OPEX, logistica, aquisicao de MP)
- Receitas (bruta, ICMS, liquida)
- Resultado financeiro (lucro anual)

### RF06 - Detalhamento de Calculos
O sistema deve fornecer explicacao detalhada de como cada valor e calculado via modal informativo.

---

## Requisitos Nao-Funcionais

### RNF01 - Desempenho
- Tempo de resposta da simulacao: < 3 segundos
- Carregamento inicial do mapa: < 5 segundos

### RNF02 - Usabilidade
- Interface responsiva para desktop e tablet
- Feedback visual para acoes do usuario
- Tooltips explicativos em valores calculados

### RNF03 - Disponibilidade
- Sistema disponivel 99% do tempo em horario comercial

### RNF04 - Seguranca
- CORS configurado para origens permitidas

---

## Modelo de Dados

### Entidades Principais

#### Plant (Usina)
```
Plant
+-- id: Integer (PK)
+-- cnpj: String
+-- razao_social: String
+-- municipio: String
+-- uf: String (2 chars)
+-- latitude: Float
+-- longitude: Float
+-- tipo_materia_prima: String
+-- relationships
    +-- authorized_info: AuthorizedPlantInfo
    +-- pending_info: PendingPlantInfo
```

#### Fontes de Materia-Prima
```
AterrosSanitarios
+-- id: Integer (PK)
+-- nome: String
+-- municipio: String
+-- uf: String
+-- latitude: Float
+-- longitude: Float
+-- volume_diario_recebido: Float

Ecoparque
+-- id: Integer (PK)
+-- nome: String
+-- operador: String
+-- municipio: String
+-- uf: String
+-- latitude: Float
+-- longitude: Float

UsinasAlcool
+-- id: Integer (PK)
+-- nome: String
+-- municipio: String
+-- uf: String
+-- latitude: Float
+-- longitude: Float
```

#### Destinos
```
PontosEntregaGas
+-- id: Integer (PK)
+-- nome: String
+-- estado: String
+-- municipio: String
+-- tipo_transporte: String
+-- latitude: Float
+-- longitude: Float
```

#### Etapas de Processamento
```
PreTratamento, Biodigestao, Purificacao,
PosProcessamento, Digestato, CO2
+-- id: Integer (PK)
+-- tipo/tecnologia: String
+-- capex: Float
+-- opex_anual: Float
+-- [parametros especificos]
```

---

## Fluxo de Simulacao

```
+---------------------------------------------------------------+
|                        ENTRADA (Input)                         |
+---------------------------------------------------------------+
| - source_id, source_type (opcional)                            |
| - plant_id (obrigatorio)                                       |
| - destination_id (obrigatorio)                                 |
| - transport_raw_material_type                                  |
| - transport_biomethane_type                                    |
| - biomethane_price_per_m3                                      |
+---------------------------------------------------------------+
                              |
                              v
+---------------------------------------------------------------+
|                    CALCULO DE DISTANCIAS                       |
+---------------------------------------------------------------+
| - Haversine(origem, usina) x 1.3                               |
| - Haversine(usina, destino) x 1.3                              |
+---------------------------------------------------------------+
                              |
                              v
+---------------------------------------------------------------+
|                    CALCULO DE LOGISTICA                        |
+---------------------------------------------------------------+
| - viagens_dia = ceil(quantidade / capacidade_veiculo)          |
| - custo_viagem = distancia x 2 x custo_km                      |
| - custo_diario = viagens_dia x custo_viagem                    |
+---------------------------------------------------------------+
                              |
                              v
+---------------------------------------------------------------+
|                    CALCULO DE PRODUCAO                         |
+---------------------------------------------------------------+
| - biogas_m3_dia = capacidade_usina / (efic_bio x efic_purif)   |
| - biometano_m3_dia = capacidade_usina                          |
+---------------------------------------------------------------+
                              |
                              v
+---------------------------------------------------------------+
|                    CALCULO FINANCEIRO                          |
+---------------------------------------------------------------+
| - CAPEX = investimento_usina OU soma(capex_etapas)             |
| - OPEX_anual = soma(opex_etapas)                               |
| - Receita_bruta = biometano x preco x 365                      |
| - ICMS = receita_bruta x aliquota_estado                       |
| - Receita_liquida = receita_bruta - ICMS                       |
| - Lucro = receita_liquida - OPEX - logistica - aquisicao_MP    |
+---------------------------------------------------------------+
                              |
                              v
+---------------------------------------------------------------+
|                        SAIDA (Output)                          |
+---------------------------------------------------------------+
| - Producao: biogas_m3_day, biomethane_m3_day                   |
| - Logistica: distancias, viagens, custos diarios/anuais        |
| - Custos: CAPEX, OPEX, logistica, aquisicao MP                 |
| - Receita: bruta, ICMS, liquida                                |
| - Resultado: lucro_anual, payback_anos                         |
+---------------------------------------------------------------+
```

---

## API Endpoints

### Simulacao
```
POST /simulation/run
Body: SimulationInput
Response: SimulationResult
```

### Dados do Mapa
```
GET /plants              -> Lista de usinas
GET /destinations        -> Pontos de entrega
GET /aterros-sanitarios  -> Aterros sanitarios
GET /ecoparques          -> Ecoparques
GET /usinas-alcool       -> Usinas de alcool
```

---

## Estrutura de Diretorios

```
galp-simbio/
+-- frontend/
|   +-- src/
|   |   +-- app/              # Configuracao Redux
|   |   +-- components/       # Componentes React
|   |   |   +-- atoms/        # Componentes basicos
|   |   |   +-- molecules/    # Componentes compostos
|   |   |   +-- organisms/    # Componentes complexos
|   |   +-- services/         # Cliente API
|   |   +-- store/            # Slices Redux
|   |   +-- types/            # Tipos TypeScript
|   +-- package.json
|
+-- backend/
|   +-- app/
|       +-- api/              # Rotas FastAPI
|       +-- data/             # Valores padrao
|       +-- models/           # Modelos SQLAlchemy
|       +-- schemas/          # Schemas Pydantic
|       +-- services/         # Logica de negocio
|       +-- main.py           # Entrada da aplicacao
|
+-- wiki/                     # Esta documentacao
```

---

# Manual de Utilizacao

Este manual apresenta instrucoes passo a passo para utilizar o SimBio, organizadas por tarefas comuns dos usuarios.

---

{
Guia de Instrucoes:
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
Para [Tarefa 1: Realizar uma Simulacao Basica] faca:

Passo 1: Abra o navegador e acesse a URL do SimBio
Passo 2: Aguarde o carregamento do mapa interativo
Passo 3: (Opcional) Selecione uma fonte de materia-prima clicando em um marcador verde no mapa
Passo 4: Selecione uma usina de biometano clicando em um marcador vermelho no mapa
Passo 5: Selecione um ponto de destino clicando em um marcador roxo no mapa
Passo 6: No card "Transporte Biometano", selecione o tipo de transporte desejado
Passo 7: Clique no botao "Simular" (azul, a direita)
Passo 8: Analise os resultados exibidos (Producao, Custos, Receita, Resultado)

>>> Alternativa para localizar pontos no mapa:
    - Via navegacao manual: Use zoom e arraste para encontrar a regiao desejada
    - Via campo de busca: Digite o nome da instalacao para filtrar marcadores
    A busca e mais rapida quando voce conhece o nome exato da instalacao.

>>> Sobre selecao de transporte de biometano:
    - Caminhao GNC (4.000 Nm3): Melhor para distancias curtas (< 100km)
    - Caminhao GNL (10.000 Nm3): Melhor para distancias medias (100-300km)
    - Duto: Melhor opcao quando ha infraestrutura de gasoduto disponivel

Excecoes ou potenciais problemas:
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
Se [o botao "Simular" estiver desabilitado]
   {
   Entao faca: Verifique se os cards "Usina" e "Destinacao" estao preenchidos.
               Complete as selecoes obrigatorias clicando nos marcadores correspondentes.
   }

Se [aparecer uma mensagem de erro vermelha apos clicar em Simular]
   {
   E porque: Houve falha na comunicacao com o servidor.
   Entao faca: Aguarde alguns segundos e tente novamente.
               Se persistir, verifique sua conexao com a internet.
   }

Se [os valores de resultado aparecerem zerados]
   {
   E porque: A usina selecionada possui dados incompletos no sistema.
   Entao faca: Selecione outra usina com dados completos.
   }

Se [o transporte de materia-prima foi selecionado automaticamente]
   {
   E porque: O sistema seleciona automaticamente o transporte adequado baseado no tipo de fonte:
             - Usinas de alcool -> Caminhao Tanque (Vinhaca)
             - Aterros/Ecoparques -> Carreta Basculante (RSU)
   }
}

---

{
Guia de Instrucoes:
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
Para [Tarefa 2: Entender os Calculos da Simulacao] faca:

Passo 1: Execute uma simulacao conforme Tarefa 1
Passo 2: Nos resultados, clique no icone (i) ao lado de "Resultado da Simulacao"
Passo 3: Navegue pelas secoes do modal: Producao, Custos, Receita, Resultado, Detalhes de Logistica
Passo 4: Feche o modal clicando no X ou fora da area do modal

>>> Alternativa para consultar informacoes rapidas:
    - Via modal completo: Clique no icone (i) ao lado do titulo para ver todas as formulas
    - Via tooltips: Passe o mouse sobre icones (i) em valores especificos para ver informacoes pontuais
    Use tooltips quando precisar de informacao rapida sobre um valor especifico.
    Use o modal quando precisar entender o fluxo completo de calculos.

Excecoes ou potenciais problemas:
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
Se [o icone (i) nao estiver visivel]
   {
   E porque: Os resultados da simulacao ainda nao foram gerados.
   Entao faca: Execute uma simulacao primeiro (Tarefa 1).
   }

Se [o tooltip nao aparecer ao passar o mouse]
   {
   Entao faca: Mantenha o cursor sobre o icone por 1-2 segundos.
               Em dispositivos touch, toque e segure o icone.
   }
}

---

{
Guia de Instrucoes:
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
Para [Tarefa 3: Comparar Cenarios de Transporte] faca:

Passo 1: Complete uma simulacao conforme Tarefa 1
Passo 2: Anote os valores de "Logistica Anual" e "Lucro Anual"
Passo 3: No card "Transporte Biometano", selecione outra opcao de transporte
Passo 4: Clique em "Simular" novamente
Passo 5: Compare os novos valores com os anotados
Passo 6: Repita os passos 3-5 para testar outras opcoes

>>> Alternativa para comparar rotas:
    - Alterando transporte: Mantenha o mesmo destino e troque apenas o tipo de transporte
    - Alterando destino: Mantenha o mesmo transporte e selecione outro ponto de entrega
    Alterar transporte e mais rapido para avaliar custos de veiculo.
    Alterar destino e melhor para avaliar impacto da distancia.

>>> Dica: Crie uma tabela comparativa em papel ou planilha:
    | Cenario | Transporte | Destino | Logistica Anual | Lucro Anual |

Excecoes ou potenciais problemas:
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
Se [os custos de logistica sao muito diferentes entre GNC e GNL]
   {
   E porque: A capacidade dos veiculos e diferente (GNC: 4.000 Nm3, GNL: 10.000 Nm3).
             Maior capacidade = menos viagens = menor custo total.
   }

Se [a opcao "Duto" apresenta custo muito menor]
   {
   E porque: O duto tem capacidade ilimitada e opera continuamente.
             Porem, so esta disponivel onde ha infraestrutura de gasoduto.
   }

Se [voce perdeu os valores da simulacao anterior]
   {
   E porque: O sistema nao armazena historico de simulacoes.
   Entao faca: Anote os valores antes de executar uma nova simulacao,
               ou faca capturas de tela dos resultados.
   }
}

---

{
Guia de Instrucoes:
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
Para [Tarefa 4: Filtrar Marcadores no Mapa] faca:

Passo 1: Localize os checkboxes de filtro acima do mapa
Passo 2: Desmarque os tipos que deseja ocultar (Materia Prima, Usinas, Destinacao)
Passo 3: Observe o mapa atualizar automaticamente

>>> Alternativa para encontrar instalacoes:
    - Via filtros de tipo: Use os checkboxes para mostrar apenas um tipo de marcador
    - Via campo de busca: Digite o nome da instalacao ou municipio
    Filtros sao melhores quando voce quer ver todas as opcoes de um tipo em uma regiao.
    Busca e melhor quando voce conhece o nome especifico da instalacao.

Excecoes ou potenciais problemas:
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
Se [nenhum marcador aparece no mapa]
   {
   Entao faca: Verifique se todos os checkboxes de filtro estao marcados.
               Limpe o campo de busca se houver texto digitado.
   }

Se [a busca nao encontra resultados]
   {
   E porque: A busca filtra por nome da instalacao, nao por municipio.
   Entao faca: Tente buscar pelo nome exato da instalacao,
               ou navegue manualmente pelo mapa ate a regiao desejada.
   }
}

---

{
Guia de Instrucoes:
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
Para [Tarefa 5: Remover Selecoes] faca:

Passo 1: Localize o card correspondente ao item que deseja remover
Passo 2: Clique no X ao lado do item selecionado
Passo 3: Observe o card ficar vazio

>>> Alternativa para trocar selecoes:
    - Via botao X: Remove a selecao atual, deixando o card vazio
    - Via novo clique no mapa: Clique em outro marcador do mesmo tipo para substituir automaticamente
    Use o botao X quando quiser limpar completamente a selecao.
    Use novo clique quando ja souber qual item deseja selecionar em seguida.

>>> Para limpar resultados da simulacao:
    Passo 1: Localize o X no canto superior direito do painel de resultados
    Passo 2: Clique no X para ocultar os resultados

Excecoes ou potenciais problemas:
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
Se [o botao X nao esta visivel no card]
   {
   E porque: Nenhum item esta selecionado naquele card.
   }

Se [ao clicar em novo marcador a selecao anterior nao foi substituida]
   {
   E porque: O novo marcador e de um tipo diferente (ex: clicou em usina quando queria trocar destino).
   Entao faca: Verifique a cor do marcador e clique em um do tipo correto.
   }
}

---

{
Guia de Instrucoes:
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
Para [Tarefa 6: Interpretar Resultado Negativo] faca:

Passo 1: Identifique que o Lucro Anual esta em vermelho (negativo)
Passo 2: Analise os componentes de custo: Logistica Anual, OPEX Anual, Aquisicao MP Anual
Passo 3: Identifique qual componente esta mais alto proporcionalmente
Passo 4: Teste ajustes conforme o problema identificado
Passo 5: Execute nova simulacao e compare os resultados

>>> Para identificar o problema:
    - Se Logistica Anual > 30% dos custos: A distancia provavelmente e o problema
    - Se OPEX Anual e muito alto: A usina pode ter custos operacionais elevados
    - Se Receita Liquida e baixa: A capacidade da usina pode ser insuficiente

>>> Ajustes recomendados por tipo de problema:
    - Logistica alta: Selecione destino mais proximo OU troque para GNL/Duto
    - Receita baixa: Selecione usina com maior capacidade de producao

Excecoes ou potenciais problemas:
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
Se [a Logistica Anual representa mais de 50% dos custos]
   {
   E porque: A distancia entre usina e destino e muito grande.
   Entao faca: Selecione um ponto de entrega mais proximo.
               Distancias acima de 200km tendem a inviabilizar projetos com GNC.
   }

Se [o numero de viagens/dia e muito alto (> 10)]
   {
   E porque: O veiculo selecionado tem capacidade insuficiente para o volume.
   Entao faca: Troque para um transporte de maior capacidade (GNL ao inves de GNC).
   }

Se [mesmo com ajustes o projeto continua inviavel]
   {
   E porque: A combinacao de fatores (distancia, capacidade, custos) pode nao ser favoravel.
   Entao faca: Considere outras usinas ou destinos na regiao.
               Use o modal de informacoes para entender cada componente de custo.
   }

Se [voce nao consegue identificar a causa do prejuizo]
   {
   Entao faca: Abra o modal de informacoes (icone i) para ver o detalhamento completo.
               Compare cada componente com os valores de uma simulacao viavel.
   }
}

---

## Glossario

| Termo | Definicao |
|-------|-----------|
| **Biogas** | Gas produzido pela decomposicao anaerobia de materia organica |
| **Biometano** | Biogas purificado com teor de metano >= 96%, equivalente ao gas natural |
| **CAPEX** | Capital Expenditure - investimento inicial em ativos |
| **OPEX** | Operational Expenditure - custos operacionais recorrentes |
| **ICMS** | Imposto sobre Circulacao de Mercadorias e Servicos |
| **RSU** | Residuos Solidos Urbanos |
| **Nm3** | Normal metro cubico - unidade de volume de gas em condicoes padrao |
| **GNC** | Gas Natural Comprimido |
| **GNL** | Gas Natural Liquefeito |
| **Haversine** | Formula para calcular distancia entre dois pontos em uma esfera |

---

*Documento gerado automaticamente a partir da wiki do projeto SimBio*
