import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArtigos, getArtigoPorSlug, formatarData } from '../../lib'

// SSG: pre-renderiza todas as rotas em build time
export const dynamic = 'force-static'

// Gera os parâmetros estáticos para cada artigo
export async function generateStaticParams() {
  const artigos = await getArtigos()
  return artigos.map((a) => ({ slug: a.slug }))
}

// SEO dinâmico: metadados únicos por artigo
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const artigo = await getArtigoPorSlug(params.slug)

  if (!artigo) {
    return {
      title: 'Artigo não encontrado',
      description: 'O artigo que você está procurando não existe.',
    }
  }

  return {
    title: artigo.titulo,
    description: artigo.resumo,
    authors: [{ name: artigo.autor }],
    openGraph: {
      title: artigo.titulo,
      description: artigo.resumo,
      type: 'article',
      publishedTime: artigo.data,
      authors: [artigo.autor],
      tags: [artigo.categoria],
    },
    twitter: {
      card: 'summary_large_image',
      title: artigo.titulo,
      description: artigo.resumo,
    },
  }
}

export default async function ArtigoPage({
  params,
}: {
  params: { slug: string }
}) {
  const artigo = await getArtigoPorSlug(params.slug)

  if (!artigo) {
    notFound()
  }

  const paragrafos = artigo.conteudo
    .split('\n\n')
    .filter((p) => p.trim().length > 0)

  const inicialAutor = artigo.autor
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')

  // JSON-LD para dados estruturados
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: artigo.titulo,
    description: artigo.resumo,
    author: {
      '@type': 'Person',
      name: artigo.autor,
    },
    datePublished: artigo.data,
    publisher: {
      '@type': 'Organization',
      name: 'DevBlog',
    },
  }

  return (
    <>
      {/* JSON-LD para SEO estruturado */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            Dev<span>Blog</span>
          </Link>
          <ul className="nav-links">
            <li><Link href="/">Início</Link></li>
            <li><Link href="/">Artigos</Link></li>
            <li><Link href="/">Sobre</Link></li>
          </ul>
        </div>
      </nav>

      <header className="article-header">
        <div className="article-header-inner">
          <Link href="/" className="article-back">
            ← Voltar aos artigos
          </Link>

          <span className="article-category">{artigo.categoria}</span>

          <h1 className="article-title">{artigo.titulo}</h1>

          <p className="article-subtitle">{artigo.resumo}</p>

          <div className="article-byline">
            <div className="byline-avatar" aria-hidden="true">
              {inicialAutor}
            </div>
            <div className="byline-info">
              <span className="byline-author">{artigo.autor}</span>
              <time className="byline-date" dateTime={artigo.data}>
                {formatarData(artigo.data)}
              </time>
            </div>
          </div>
        </div>
      </header>

      <main className="article-body">
        <article className="article-content">
          {paragrafos.map((paragrafo, i) => (
            <p key={i}>{paragrafo}</p>
          ))}
        </article>
      </main>

      <footer className="footer">
        <p className="footer-logo">Dev<span>Blog</span></p>
        <p className="footer-text">
          Feito com Next.js 14 App Router · Deploy na Vercel
        </p>
      </footer>
    </>
  )
}
