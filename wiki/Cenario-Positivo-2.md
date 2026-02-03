# Cenário Positivo 2: Comparação de Rotas Logísticas

## Contexto

**Ator**: Carla Oliveira, 32 anos, consultora de energia em uma empresa de consultoria ambiental
**Ambiente**: Home office, usando desktop com dois monitores
**Objetivo**: Comparar diferentes configurações de transporte de biometano para otimizar custos de um cliente
**Conhecimento prévio**: Especialista em logística de energia, usuária frequente do SimBio

## Narrativa

Carla está elaborando um relatório para um cliente que possui uma usina de biometano em São Paulo e precisa decidir entre três opções de transporte para entregar o biometano a diferentes destinos: caminhão GNC (gás natural comprimido), caminhão GNL (gás natural liquefeito) ou injeção em gasoduto.

Ela acessa o SimBio e rapidamente localiza a usina do cliente no mapa de São Paulo. Como a usina utiliza vinhaça de uma usina de álcool vizinha como matéria-prima, Carla seleciona a usina de álcool correspondente. O sistema automaticamente configura "Caminhão Tanque (Vinhaça)" como transporte de matéria-prima.

Para a primeira simulação, Carla seleciona um ponto de entrega em Campinas (100 km de distância) e escolhe **"Caminhão GNC (Comprimido)"** como transporte de biometano. Ela anota os resultados:
- Logística Anual: R$ 1.850.000
- Viagens/dia: 12
- Custo/dia: R$ 5.068

Para a segunda simulação, Carla mantém o mesmo destino mas troca para **"Caminhão GNL (Liquefeito)"**. Os novos resultados mostram:
- Logística Anual: R$ 680.000
- Viagens/dia: 5
- Custo/dia: R$ 1.863

Carla observa que, apesar do custo por Nm³/km do GNL ser menor, a redução mais significativa vem da maior capacidade do caminhão GNL (10.000 Nm³ vs 4.000 Nm³ do GNC), que reduz o número de viagens necessárias.

Para a terceira simulação, ela seleciona um ponto de entrega conectado ao gasoduto da região e escolhe **"Duto (Gasoduto)"**:
- Logística Anual: R$ 520.000
- Viagens/dia: 1 (contínuo)
- Custo/dia: R$ 1.425

Carla abre o modal de informações para confirmar que entendeu corretamente: o custo do duto é calculado por Nm³/km com capacidade ilimitada, resultando em apenas uma "viagem" contínua por dia.

Ela compila os três cenários em uma tabela comparativa:

| Transporte | Logística Anual | Economia vs GNC |
|------------|-----------------|-----------------|
| Caminhão GNC | R$ 1.850.000 | - |
| Caminhão GNL | R$ 680.000 | 63% |
| Gasoduto | R$ 520.000 | 72% |

Com esses dados, Carla prepara uma recomendação para o cliente: se houver acesso ao gasoduto, esta é a opção mais econômica. Caso contrário, o investimento em infraestrutura de liquefação (GNL) pode se pagar rapidamente comparado ao transporte por GNC.

## Resultado

Carla conseguiu comparar três cenários logísticos em menos de 15 minutos, obtendo dados quantitativos para embasar sua recomendação ao cliente. A análise revelou que:
- O transporte por gasoduto oferece economia de 72% comparado ao GNC
- O GNL é uma alternativa viável quando não há acesso a gasodutos
- A capacidade do veículo impacta mais o custo do que a tarifa por km

## Funcionalidades Utilizadas

1. Manutenção de seleções entre simulações (mesma fonte e usina)
2. Troca rápida de tipo de transporte via dropdown
3. Comparação de diferentes destinos
4. Detalhes de logística (distância, viagens/dia, custo/dia)
5. Modal explicativo dos cálculos de transporte
6. Subtítulos informativos nos cards de transporte mostrando capacidade e custo/km
