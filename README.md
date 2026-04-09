# DevBlog — Next.js 14 App Router

Blog técnico construído com Next.js 14, App Router, Server Components e SEO dinâmico.

## 🚀 Tecnologias

- **Next.js 14** com App Router
- **TypeScript** com tipagem estrita
- **Server Components** por padrão (sem useEffect para fetching)
- **generateStaticParams** para SSG (Static Site Generation)
- **generateMetadata** para SEO dinâmico por página
- **JSON-LD** para dados estruturados
- **sitemap.ts** e **robots.ts** gerados programaticamente
- **CSS puro** com design editorial refinado

## 📁 Estrutura

```
blog-app/
├── app/
│   ├── layout.tsx              # Layout raiz com metadados globais
│   ├── page.tsx                # Listagem de artigos (SSG)
│   ├── globals.css             # Estilos globais
│   ├── lib.ts                  # Funções de data fetching
│   ├── types.ts                # Tipos TypeScript
│   ├── sitemap.ts              # Sitemap dinâmico
│   ├── robots.ts               # robots.txt
│   ├── not-found.tsx           # Página 404
│   └── artigos/
│       └── [slug]/
│           └── page.tsx        # Página de artigo com generateMetadata
└── data/
    └── artigos.json            # Fonte de dados local
```

## 🏃 Rodando localmente

```bash
npm install
npm run dev
```

Acesse: http://localhost:3000

## 📦 Build e Deploy

### Build local

```bash
npm run build
```

### Deploy na Vercel

1. Faça push do projeto para um repositório GitHub
2. Acesse [vercel.com](https://vercel.com) e clique em **Add New Project**
3. Importe o repositório
4. A Vercel detecta automaticamente o Next.js e configura o build
5. Clique em **Deploy** ✅

### Após o deploy

Atualize a `baseUrl` nos arquivos:
- `app/sitemap.ts` → coloque sua URL real da Vercel
- `app/robots.ts` → coloque sua URL real da Vercel

## 🔍 Funcionalidades de SEO

Cada artigo tem:
- `<title>` único com template `"Título | DevBlog"`
- `<meta name="description">` com o resumo do artigo
- Open Graph tags (Facebook, LinkedIn, WhatsApp)
- Twitter Card tags
- JSON-LD (Article schema)
- URL amigável via slug

## 📡 Trocando para API real

Em `app/lib.ts`, substitua a leitura do JSON por um fetch real:

```typescript
// Antes (JSON local)
import artigos from '../data/artigos.json'
export async function getArtigos() {
  return artigos as Artigo[]
}

// Depois (API REST)
export async function getArtigos() {
  const res = await fetch('https://sua-api.com/artigos', {
    next: { revalidate: 3600 } // ISR: revalida a cada 1 hora
  })
  return res.json() as Promise<Artigo[]>
}
```

## 🗂 Usando generateStaticParams vs force-dynamic

| Cenário | Estratégia |
|---|---|
| Conteúdo estático (JSON local) | `force-static` + `generateStaticParams` |
| Conteúdo que muda às vezes | ISR com `next: { revalidate: N }` |
| Conteúdo sempre atualizado | `force-dynamic` (SSR a cada request) |
