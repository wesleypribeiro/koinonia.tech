# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Clientes da Koinonia Dev**: donos de pequenos negócios locais (oficinas, estética, serralherias, imobiliárias, cafés, prestadores de serviço), quase sempre no Vale do Paraíba (SP). Chegam por um link mandado no WhatsApp e usam o celular. Quem preenche o briefing já fechou o serviço (confirmado em 23/11/2026).
- **Wesley**, dono da Koinonia Dev: confere os briefings no painel (`/painel`) e usa as respostas e os arquivos para montar o site ou o perfil no Google.

## Product Purpose

A Koinonia Dev é um estúdio de uma pessoa (Wesley) no Vale do Paraíba que cria sites, landing pages e perfis no Google (Google Meu Negócio) para pequenos negócios locais. Vende criação, hospedagem e manutenção e atende pelo WhatsApp (confirmado em 23/11/2026).

O briefing existe para o Wesley receber, de uma vez e organizado, tudo o que precisa para trabalhar: dados, textos, fotos, vídeos e logo, sem ficar perguntando de novo pelo WhatsApp.

## Positioning

- O cliente fala direto com quem faz o site (texto da página de planos).
- A prospecção começa com uma página de demonstração pronta, publicada em `koinoniadev.com.br/<slug>`, antes do primeiro contato.

## Operating Context

- Contato comercial pelo WhatsApp (12) 99715-2029.
- Planos e preços em `planos.koinoniadev.com.br` (fonte: `src/lib/planos.ts`).
- Páginas de demonstração em `public/<slug>/index.html`, abertas em `/<slug>`.
- Briefing do cliente em `/briefing` (links com `?servico=site`, `?servico=google` ou `?servico=ambos`).
- Respostas e arquivos guardados no Vercel Blob privado `koinonia-briefings`; aviso de novo briefing por e-mail via Formspree.

## Capabilities and Constraints

- Next.js 15 (App Router) na Vercel, projeto `koinonia-tech`, plano Hobby. Publicação por push na `main`.
- Formspree no plano grátis: não aceita arquivo e tem limite mensal de envios.
- O armazenamento do Blob tem cota; vídeos pesados gastam a cota rápido.
- O painel tem um único usuário, protegido pela senha da variável `PAINEL_SENHA`.

## Brand Commitments

- Nome: Koinonia Dev. Slogan: "Tecnologia com propósito".
- Texto em português do Brasil, direto, falando "a gente" e "você".

## Evidence on Hand

- Planos e preços reais em `src/lib/planos.ts`.
- Projetos do portfólio em `src/lib/projects.ts`.
- Não há depoimentos de clientes no repositório: não inventar.

## Product Principles

1. Perguntar uma vez só: o cliente nunca repete uma informação que já deu.
2. Celular primeiro: tudo precisa funcionar com o polegar, numa tela pequena e com internet de celular.
3. Palavras do cliente: nada de jargão técnico sem explicação ao lado.
4. Só fatos: nenhum número, prazo ou depoimento que o Wesley não tenha confirmado.
