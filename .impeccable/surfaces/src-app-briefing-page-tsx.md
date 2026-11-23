---
version: 1
slug: "src-app-briefing-page-tsx"
primary_target: "src/app/briefing/page.tsx"
related_targets: ["src/app/painel/page.tsx"]
---

# Briefing do cliente (/briefing) e painel (/painel)

Mode: Operate. O visitante conclui uma tarefa: contar sobre a empresa e mandar os arquivos. O painel é ferramenta interna do Wesley.

Audience: dono de pequeno negócio local que já fechou o serviço, no celular, vindo de um link do WhatsApp. Constraint: tudo precisa caber no polegar e sobreviver a internet ruim (rascunho salvo no aparelho, envio de arquivo com progresso e nova tentativa).

## Direction contract

THESIS: o briefing é uma conversa curta com quem vai fazer o site: um assunto por tela, palavras do cliente, nada perguntado duas vezes. Recusa o padrão da categoria, uma página única do Google Forms com 23 caixas de texto.

OWN-WORLD: herda o mundo Koinonia sem mudar nada: cantos retos, grafite e verde da marca (#086B5D no claro, #10B39A no escuro), títulos em Space Grotesk maiúsculo em tamanhos fixos, Geist nos rótulos e campos. A opção escolhida ganha a sombra deslocada da marca (-4px 4px 0), como o plano em destaque. Claro por padrão nesta rota (uso no celular, de dia, no balcão), escuro quando o visitante escolheu.

STORY: o cliente entende o que vai ser feito e quanto tempo leva, escolhe site, Google ou os dois, passa por 5 a 7 telas curtas, manda fotos e logo ali mesmo, revisa e envia, e sai sabendo o próximo passo (o Wesley chama no WhatsApp).

FIRST VIEWPORT: cabeçalho mínimo (logo à esquerda, ajuda no WhatsApp e tema à direita). Título "Conte sobre a sua empresa", uma frase, três opções empilhadas no celular e lado a lado no computador, botão "Começar" logo abaixo, ocupando a largura no celular. Linha de fatos: tempo, rascunho salvo, envio de fotos.

FORM: assistente em etapas com barra de progresso fixa, barra de ação presa embaixo no celular, validação no lugar do erro e tela de revisão com "Editar" por etapa. Posição 1 da lista (pedido estreito, desenhado direto). seed: none (pinned) "criasse uma página dentro do site da Koinonia Dev para preenchimento desses formulários pelos clientes"

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
