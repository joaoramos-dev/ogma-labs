# Rolagem em etapas

## Objetivo
Fazer a página avançar de uma seção para a próxima com uma transição suave após um gesto curto de rolagem, começando da Hero para “Sobre”.

## Implementação
- Reforçar o encaixe de cada seção no início da tela.
- Em telas com mouse/trackpad, detectar a direção da rolagem e conduzir suavemente à próxima seção.
- Preservar a rolagem normal dentro de seções cujo conteúdo ultrapassa uma tela, para nada ficar inacessível.
- Manter o comportamento nativo e mais flexível em celulares.
- Adicionar uma entrada sutil ao conteúdo de cada seção durante a troca.
- Respeitar a preferência do sistema por movimento reduzido.

## Validação
- Conferir a sequência Hero → Sobre → Serviços em desktop.
- Conferir que seções longas continuam totalmente navegáveis.
- Conferir a experiência em celular e a ausência de erros visuais.
