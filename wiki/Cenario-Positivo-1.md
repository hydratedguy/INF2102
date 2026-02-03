# Cenário Positivo 1: Análise de Viabilidade por Investidor

## Contexto

**Ator**: Ricardo Mendes, 45 anos, diretor de investimentos de um fundo de energia renovável
**Ambiente**: Escritório em São Paulo, usando laptop com conexão à internet
**Objetivo**: Avaliar rapidamente a viabilidade de investir em um projeto de biometano em Goiás
**Conhecimento prévio**: Experiência em análise financeira, conhecimento básico sobre biometano

## Narrativa

Ricardo recebeu uma proposta de investimento em uma usina de biometano localizada em Goiás que processaria resíduos de um aterro sanitário próximo. O projeto solicita R$ 50 milhões e promete retorno em 5 anos. Antes de encaminhar para análise detalhada do comitê, Ricardo precisa fazer uma avaliação preliminar.

Ele acessa o SimBio e visualiza o mapa do Brasil com os marcadores de usinas, fontes de matéria-prima e pontos de entrega de gás. Usando o filtro de busca, ele localiza a região de Goiás e identifica o aterro sanitário mencionado na proposta.

Ricardo clica no marcador do aterro sanitário para selecioná-lo como **Matéria Prima**. O sistema automaticamente seleciona "Carreta Basculante (RSU)" como transporte, já que é o veículo adequado para resíduos sólidos urbanos. Em seguida, ele seleciona a usina de biometano proposta no card **Usina**.

Para o destino, Ricardo procura um ponto de entrega de gás na região Centro-Oeste. Ele seleciona um gasoduto em Goiás como **Destinação** e escolhe "Duto (Gasoduto)" como **Transporte Biometano**, já que há infraestrutura de dutos na região.

Com todas as seleções feitas, Ricardo clica no botão **"Simular"**. Após alguns segundos, os resultados aparecem:

- **Produção**: 45.000 Nm³/dia de biometano
- **CAPEX Total**: R$ 48.000.000 (próximo do valor solicitado)
- **OPEX Anual**: R$ 4.200.000
- **Logística Anual**: R$ 890.000
- **Receita Líquida Anual**: R$ 52.000.000
- **Lucro Anual**: R$ 12.500.000 (em verde, indicando viabilidade)

Ricardo nota o ícone de informação ao lado do CAPEX e passa o mouse sobre ele, vendo que o valor foi obtido diretamente dos dados da usina selecionada. Ele clica no ícone de informações ao lado do título "Resultado da Simulação" para entender como os valores foram calculados.

O modal de explicação detalha cada componente: a produção de biogás baseada na quantidade de RSU, a eficiência de conversão para biometano, os custos de cada etapa do processo, e a alíquota de ICMS de Goiás (2,7% - uma das mais baixas do país devido a incentivos fiscais).

Satisfeito com a análise preliminar, Ricardo exporta uma captura de tela dos resultados e agenda uma reunião com sua equipe para análise mais detalhada do projeto.

## Resultado

Ricardo conseguiu, em menos de 10 minutos, fazer uma análise preliminar de viabilidade que confirma os números apresentados na proposta. Ele identificou que:
- O CAPEX solicitado está alinhado com estimativas de mercado
- A localização em Goiás é estratégica devido aos incentivos fiscais de ICMS
- O projeto apresenta potencial de lucro anual significativo

## Funcionalidades Utilizadas

1. Mapa interativo com filtros de busca
2. Seleção de matéria-prima, usina e destino via clique no mapa
3. Auto-seleção de transporte baseado no tipo de fonte
4. Simulação com cálculo completo de custos e receitas
5. Tooltips informativos sobre valores
6. Modal de explicação detalhada dos cálculos
