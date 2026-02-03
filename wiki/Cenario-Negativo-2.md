# Cenário Negativo 2: Resultado Financeiro Inviável

## Contexto

**Ator**: Mariana Costa, 29 anos, analista de novos negócios de uma distribuidora de gás
**Ambiente**: Escritório corporativo, usando notebook durante reunião de planejamento
**Objetivo**: Apresentar análise de viabilidade de um projeto de biometano para a diretoria
**Conhecimento prévio**: Experiência em análise de projetos de gás, conhecimento moderado sobre biometano

## Narrativa

Mariana está em uma reunião com a diretoria apresentando oportunidades de diversificação para biometano. Ela decide fazer uma simulação ao vivo para demonstrar o potencial de um projeto que a equipe comercial identificou: uma usina em Minas Gerais que processaria dejetos de um ecoparque próximo.

Com confiança, Mariana acessa o SimBio e rapidamente seleciona o ecoparque como fonte de matéria-prima, a usina em questão, e um ponto de entrega distante onde a empresa já possui infraestrutura. O sistema configura automaticamente o transporte de matéria-prima como "Carreta Basculante".

Para o transporte de biometano, como não há gasoduto na região, ela seleciona "Caminhão GNC (Comprimido)". Mariana clica em "Simular" esperando ver números promissores.

Os resultados aparecem, e o coração de Mariana dispara ao ver:
- **Lucro Anual**: **-R$ 2.340.000** (em vermelho)
- OPEX Anual: R$ 8.500.000
- Logística Anual: R$ 6.200.000
- Receita Líquida: R$ 12.360.000

O projeto é claramente inviável. A diretoria questiona: "O que está causando esse prejuízo? Podemos ajustar algo para torná-lo viável?"

Mariana olha para os números mas não consegue identificar rapidamente qual componente está fora do esperado. Ela abre o modal de informações, mas ele explica apenas *como* os valores são calculados, não *por que* estão altos ou *o que* poderia ser ajustado.

Ela tenta mudar algumas variáveis:
- Troca o destino para um mais próximo, mas não sabe qual seria ideal
- Considera trocar o tipo de transporte, mas não tem certeza do impacto
- Gostaria de testar um volume diferente de matéria-prima, mas essa opção não está disponível na interface

A diretoria fica impaciente enquanto Mariana faz múltiplas simulações tentando encontrar uma configuração viável. Ela consegue melhorar o resultado trocando para um destino mais próximo e usando GNL ao invés de GNC, mas o lucro ainda é marginal.

Sem uma ferramenta de análise de sensibilidade ou recomendações do sistema, Mariana não consegue responder com confiança:
- Qual a distância máxima viável para este projeto?
- Qual o volume mínimo de matéria-prima necessário?
- Qual combinação de parâmetros otimizaria o resultado?

## Resultado

A apresentação não foi bem-sucedida. Mariana conseguiu mostrar que o projeto inicial era inviável, mas não conseguiu:
- Identificar rapidamente os principais direcionadores de custo
- Propor ajustes específicos para viabilizar o projeto
- Responder perguntas da diretoria sobre limiares de viabilidade
- Demonstrar domínio da análise financeira

## Problemas Identificados

1. **Sem análise de sensibilidade**: O sistema não mostra quais variáveis têm maior impacto no resultado
2. **Sem comparação de cenários**: Não é possível ver múltiplos cenários lado a lado
3. **Sem recomendações**: O sistema não sugere ajustes quando o resultado é negativo
4. **Parâmetros fixos**: Volume de matéria-prima e preço de venda não são configuráveis pelo usuário
5. **Sem indicadores de referência**: Não há benchmarks para comparar se custos estão dentro do esperado
6. **Sem destaque de problemas**: O sistema não indica qual componente está causando inviabilidade

## Oportunidades de Melhoria

1. **Análise de sensibilidade**: Gráfico mostrando impacto de cada variável no lucro
2. **Modo comparativo**: Permitir salvar e comparar múltiplos cenários
3. **Alertas inteligentes**: Destacar componentes com valores atípicos (ex: "Logística representa 50% dos custos - acima da média de 25%")
4. **Parâmetros editáveis**: Permitir ajustar volume de matéria-prima, preço de venda, e outros inputs
5. **Sugestões de otimização**: "Para tornar viável, reduza a distância de destino para menos de 150km ou aumente o volume para 500 ton/dia"
6. **Breakeven analysis**: Mostrar ponto de equilíbrio para cada variável
7. **Histórico de simulações**: Permitir comparar simulações anteriores da sessão
8. **Exportação de relatório**: Gerar PDF com análise detalhada para apresentações
