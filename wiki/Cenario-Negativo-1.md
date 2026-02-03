# Cenário Negativo 1: Dados Incompletos no Mapa

## Contexto

**Ator**: Fernando Santos, 38 anos, engenheiro ambiental de uma prefeitura no interior do Paraná
**Ambiente**: Escritório da secretaria de meio ambiente, usando computador institucional
**Objetivo**: Avaliar a viabilidade de um projeto de biometano utilizando o aterro sanitário municipal
**Conhecimento prévio**: Conhecimento técnico em gestão de resíduos, primeira vez usando o SimBio

## Narrativa

Fernando está elaborando um estudo preliminar para apresentar à câmara de vereadores sobre a possibilidade de transformar o aterro sanitário do município em uma fonte de biometano. Ele ouviu falar do SimBio em um congresso e decide utilizá-lo.

Ao acessar o sistema, Fernando visualiza o mapa do Brasil e utiliza o campo de busca para encontrar seu município no Paraná. Ele digita o nome da cidade, mas nenhum resultado aparece. Ele tenta filtrar apenas por "Matéria Prima" e navega manualmente pelo mapa até a região.

Ao fazer zoom na área do seu município, Fernando percebe que não há nenhum marcador de aterro sanitário na região. O aterro municipal, que recebe 150 toneladas de resíduos por dia, simplesmente não está cadastrado no sistema.

Frustrado, Fernando tenta uma abordagem alternativa: ele seleciona um aterro de um município vizinho apenas para entender como o sistema funciona. Consegue fazer uma simulação, mas os resultados não refletem a realidade do seu projeto, já que as distâncias e volumes são diferentes.

Fernando procura no sistema alguma forma de cadastrar um novo aterro ou inserir dados customizados, mas não encontra essa funcionalidade na interface principal. Ele nota que há um link para "Admin" no rodapé, mas ao clicar recebe uma mensagem de acesso negado.

Sem conseguir utilizar o sistema para seu caso específico, Fernando é forçado a:
1. Usar os dados de um município vizinho como aproximação grosseira
2. Fazer cálculos manuais em uma planilha separada
3. Abandonar a análise e buscar uma consultoria especializada

## Resultado

Fernando não conseguiu completar sua análise de viabilidade usando o SimBio devido à ausência de dados do seu município. Isso resultou em:
- Perda de tempo tentando encontrar workarounds
- Frustração com a ferramenta
- Necessidade de recorrer a métodos alternativos menos precisos
- Possível desistência do projeto por falta de dados embasados

## Problemas Identificados

1. **Base de dados incompleta**: Nem todos os aterros sanitários do Brasil estão cadastrados
2. **Busca limitada**: A busca não encontra municípios, apenas nomes de instalações
3. **Sem entrada de dados customizados**: Usuários não podem inserir dados de fontes não cadastradas
4. **Feedback insuficiente**: O sistema não informa que a região não possui dados disponíveis
5. **Acesso restrito ao admin**: Usuários não podem contribuir com novos dados

## Oportunidades de Melhoria

1. **Ampliar base de dados**: Incluir todos os aterros sanitários licenciados do Brasil
2. **Melhorar busca**: Permitir busca por município, estado ou região
3. **Modo customizado**: Permitir que usuários insiram coordenadas e parâmetros manualmente
4. **Feedback proativo**: Quando uma região não tem dados, sugerir alternativas ou explicar como solicitar inclusão
5. **Contribuição de dados**: Criar fluxo para usuários sugerirem novos pontos para validação e inclusão
6. **Mensagem informativa**: Exibir aviso quando o zoom está em área sem dados cadastrados
