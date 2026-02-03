# Manual de Utilização

Este manual apresenta instruções passo a passo para utilizar o SimBio, organizadas por tarefas comuns dos usuários.

---

## Tarefa 1: Realizar uma Simulação Básica

### Objetivo
Executar uma simulação completa para avaliar a viabilidade financeira de um projeto de biometano.

### Pré-requisitos
- Acesso ao sistema via navegador web
- Conhecimento da localização aproximada dos pontos de interesse

### Passos

#### 1.1 Acessar o Sistema
1. Abra o navegador e acesse a URL do SimBio
2. Aguarde o carregamento do mapa interativo

#### 1.2 Selecionar a Fonte de Matéria-Prima (Opcional)
1. No mapa, localize a fonte de matéria-prima desejada:
   - **Marcadores verdes**: Aterros sanitários, Ecoparques e Usinas de Alcool
2. Clique no marcador para selecioná-lo
3. Observe que o card "Matéria Prima" é preenchido automaticamente
4. O sistema seleciona automaticamente o transporte adequado:
   - Usinas de álcool → Caminhão Tanque (Vinhaça)
   - Aterros/Ecoparques → Carreta Basculante (RSU)

> **Dica**: Use o campo de busca para filtrar marcadores por nome

#### 1.3 Selecionar a Usina de Biometano (Obrigatório)
1. Localize a usina de biometano no mapa (marcadores vermelhos)
2. Clique no marcador para selecioná-lo
3. Verifique se o card "Usina" foi preenchido

#### 1.4 Selecionar o Destino (Obrigatório)
1. Localize o ponto de entrega de gás no mapa (marcadores roxos)
2. Clique no marcador para selecioná-lo
3. Verifique se o card "Destinação" foi preenchido

#### 1.5 Configurar Transporte de Biometano
1. No card "Transporte Biometano", clique no dropdown
2. Selecione uma das opções:
   - **Caminhão GNC**: Para distâncias curtas, capacidade 4.000 Nm³
   - **Caminhão GNL**: Para distâncias médias, capacidade 10.000 Nm³
   - **Duto**: Quando há infraestrutura de gasoduto disponível

#### 1.6 Executar a Simulação
1. Verifique que os cards obrigatórios estão preenchidos:
   - ✓ Usina
   - ✓ Destinação
2. Clique no botão **"Simular"** (azul, à direita)
3. Aguarde o processamento

#### 1.7 Analisar os Resultados
Os resultados são exibidos em quatro seções:

| Seção | Informações |
|-------|-------------|
| **Produção** | Biogás (m³/dia), Biometano (Nm³/dia) |
| **Custos** | CAPEX Total, OPEX Anual, Logística Anual, Aquisição MP |
| **Receita** | Receita Bruta, ICMS, Receita Líquida |
| **Resultado** | Lucro Anual (verde = positivo, vermelho = negativo) |

### Exceções e Tratamento de Erros

| Situação | Causa | Solução |
|----------|-------|---------|
| Botão "Simular" desabilitado | Falta selecionar usina ou destino | Complete as seleções obrigatórias |
| Mensagem de erro vermelha | Falha na comunicação com servidor | Tente novamente; verifique conexão |
| Valores zerados | Dados incompletos da usina | Selecione outra usina com dados completos |

---

## Tarefa 2: Entender os Cálculos

### Objetivo
Compreender como cada valor do resultado é calculado.

### Passos

#### 2.1 Abrir o Modal de Explicação
1. Execute uma simulação (ver Tarefa 1)
2. Nos resultados, clique no ícone **(i)** ao lado de "Resultado da Simulação"
3. O modal "Como os valores são calculados" será aberto

#### 2.2 Navegar pelas Seções
O modal contém explicações detalhadas para:
- **Produção**: Fórmulas de conversão de biogás para biometano
- **Custos**: Composição do CAPEX e OPEX
- **Receita**: Cálculo de receita e impostos
- **Resultado**: Fórmula do lucro anual
- **Detalhes de Logística**: Cálculo de distâncias e viagens

#### 2.3 Consultar Tooltips
- Passe o mouse sobre ícones **(i)** nos valores para ver informações adicionais
- Exemplo: ICMS mostra a descrição do benefício fiscal do estado

---

## Tarefa 3: Comparar Cenários de Transporte

### Objetivo
Avaliar diferentes opções de transporte para otimizar custos.

### Passos

#### 3.1 Realizar Primeira Simulação
1. Complete uma simulação conforme Tarefa 1
2. Anote os valores de **Logística Anual** e **Lucro Anual**

#### 3.2 Alterar Tipo de Transporte
1. No card "Transporte Biometano", selecione outra opção
2. Clique em "Simular" novamente
3. Compare os novos valores

#### 3.3 Testar Destino Alternativo
1. Clique em outro ponto de entrega no mapa
2. Execute nova simulação
3. Compare distâncias e custos logísticos

### Dica de Análise
Crie uma tabela comparativa:

| Cenário | Transporte | Destino | Logística Anual | Lucro Anual |
|---------|------------|---------|-----------------|-------------|
| 1 | GNC | Campinas | R$ X | R$ Y |
| 2 | GNL | Campinas | R$ X | R$ Y |
| 3 | Duto | Paulínia | R$ X | R$ Y |

---

## Tarefa 4: Filtrar Marcadores no Mapa

### Objetivo
Visualizar apenas os tipos de pontos relevantes para sua análise.

### Passos

#### 4.1 Usar Filtros de Tipo
1. Acima do mapa, localize os checkboxes de filtro
2. Desmarque os tipos que deseja ocultar:
   - [ ] Matéria Prima
   - [ ] Usinas
   - [ ] Destinação
3. O mapa será atualizado automaticamente

#### 4.2 Usar Campo de Busca
1. Digite o nome da instalação ou município no campo de busca
2. Os marcadores serão filtrados conforme a busca
3. Limpe o campo para mostrar todos novamente

---

## Tarefa 5: Remover Seleções

### Objetivo
Limpar seleções para iniciar nova simulação.

### Passos

#### 5.1 Remover Item Individual
1. No card correspondente, clique no **X** ao lado do item selecionado
2. O item será removido e o card ficará vazio

#### 5.2 Substituir Seleção
1. Clique em outro marcador do mesmo tipo no mapa
2. A seleção anterior será automaticamente substituída

#### 5.3 Limpar Resultados
1. Nos resultados da simulação, clique no **X** no canto superior direito
2. Os resultados serão ocultados

---

## Tarefa 6: Interpretar Resultado Negativo

### Objetivo
Entender por que um projeto apresentou prejuízo e identificar possíveis ajustes.

### Passos

#### 6.1 Identificar Componentes de Custo
Quando o Lucro Anual é negativo (vermelho), verifique:
1. **Logística Anual**: Se muito alta, a distância pode ser o problema
2. **OPEX Anual**: Custos operacionais fixos da usina
3. **Aquisição MP Anual**: Custo da matéria-prima

#### 6.2 Testar Ajustes
| Se o problema for... | Tente... |
|---------------------|----------|
| Logística alta | Selecionar destino mais próximo |
| Logística alta | Trocar para transporte mais eficiente (GNL ou Duto) |
| Receita baixa | Verificar se a usina tem capacidade suficiente |

#### 6.3 Consultar Detalhes de Logística
Na seção abaixo dos resultados principais:
- Verifique a **distância em km** - distâncias acima de 200km tendem a inviabilizar projetos
- Verifique **viagens/dia** - muitas viagens indicam veículo subdimensionado

---

## Glossário

| Termo | Definição |
|-------|-----------|
| **Biogás** | Gás produzido pela decomposição anaeróbia de matéria orgânica |
| **Biometano** | Biogás purificado com teor de metano ≥ 96%, equivalente ao gás natural |
| **CAPEX** | Capital Expenditure - investimento inicial em ativos |
| **OPEX** | Operational Expenditure - custos operacionais recorrentes |
| **ICMS** | Imposto sobre Circulação de Mercadorias e Serviços |
| **RSU** | Resíduos Sólidos Urbanos |
| **Nm³** | Normal metro cúbico - unidade de volume de gás em condições padrão |
| **GNC** | Gás Natural Comprimido |
| **GNL** | Gás Natural Liquefeito |
| **Haversine** | Fórmula para calcular distância entre dois pontos em uma esfera |

---
