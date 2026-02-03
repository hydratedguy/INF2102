# SimBio - Simulador de Biometano

## Breve Descrição

O **SimBio** é um simulador de cadeia de suprimentos de biometano desenvolvido para analisar e avaliar a viabilidade financeira de projetos de produção e distribuição de biometano no Brasil.

### Função Principal
O sistema permite modelar cenários completos desde a captação de matéria-prima até a entrega do biometano ao consumidor final, calculando volumes de produção, custos, receitas e métricas financeiras chave.

### Funcionalidades Específicas
- **Simulação multi-fonte**: Modelagem de três tipos de fontes de matéria-prima (aterros sanitários, ecoparques e usinas de álcool)
- **Interface de mapa interativo**: Seleção visual de usinas, fontes e destinos
- **Modelagem logística**: Cálculo de custos de transporte de matéria-prima e biometano
- **Análise financeira completa**: CAPEX, OPEX, receitas, impostos (ICMS) e payback
- **Configuração de processos**: Parametrização de etapas de pré-tratamento, biodigestão, purificação e pós-processamento

### Usuários Contemplados
- Empresas de energia e produtores de biometano
- Investidores avaliando retorno de projetos
- Consultores ambientais e de energia
- Órgãos governamentais e reguladores
- Pesquisadores acadêmicos em energia renovável

### Natureza do Programa
Aplicação web responsiva com frontend em React e backend em FastAPI, utilizando banco de dados PostgreSQL para armazenamento de dados e parâmetros de simulação.

### Ressalvas de Uso
- Os valores calculados são estimativas baseadas em parâmetros de referência do mercado brasileiro
- Distâncias são aproximadas usando fórmula de Haversine com fator de correção de 1.3x para estradas
- Alíquotas de ICMS podem variar conforme legislação estadual vigente
- Os resultados devem ser validados com estudos de viabilidade detalhados antes de decisões de investimento

---

## Índice da Wiki

1. [Visão de Projeto](Visao-de-Projeto)
2. [Cenário Positivo 1 - Análise de Viabilidade por Investidor](Cenario-Positivo-1)
3. [Cenário Positivo 2 - Comparação de Rotas Logísticas](Cenario-Positivo-2)
4. [Cenário Negativo 1 - Dados Incompletos no Mapa](Cenario-Negativo-1)
5. [Cenário Negativo 2 - Resultado Financeiro Inviável](Cenario-Negativo-2)
6. [Documentação Técnica](Documentacao-Tecnica)
7. [Manual de Utilização](Manual-de-Utilizacao)
