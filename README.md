# Postely (modo local)

Projeto configurado para funcionar apenas com JSON mock + arquivos locais.

## Rotas públicas

- `/`
- `/:clientSlug` (ex.: `/tiberio`)
- `/:clientSlug/:posterSlug` (ex.: `/tiberio/tiberio-poster-001`)

## Fonte de dados

- [mock/postely-mock.json](/home/thiago/Projetos/Postely/mock/postely-mock.json)
- cópia pública usada pela app: `public/mock/postely-mock.json`

Estrutura:
- `clients[]`
- cada client possui `posters[]`
- cada poster possui `images[]`

## Rodar local

1. `npm install`
2. `npm run dev`

## Build

- `npm run build`

## Publicar no Netlify

### Fluxo recomendado (Git + deploy automático)

1. Suba o projeto para um repositório no GitHub/GitLab/Bitbucket.
2. No Netlify, clique em `Add new site` > `Import an existing project`.
3. Conecte o repositório e use estas configurações:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Clique em `Deploy site`.

Este projeto já está preparado com:
- `netlify.toml` (build/publish + Node 20)
- `public/_redirects` para SPA (`/* /index.html 200`) e funcionar com `react-router-dom`.

### Fluxo alternativo (deploy manual via CLI)

1. Instale a CLI: `npm i -g netlify-cli`
2. Gere o build: `npm run build`
3. Faça deploy de preview: `netlify deploy --dir=dist`
4. Publique em produção: `netlify deploy --prod --dir=dist`
