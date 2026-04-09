import type { Metadata } from 'next'
import Link from 'next/link'
import { getArtigos, formatarData } from './lib'

// SSG: página gerada estaticamente em build time
export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'DevBlog - Artigos sobre desenvolvimento web moderno',
  description:
    'Explore artigos sobre Next.js, React, TypeScript, SEO e as melhores práticas do desenvolvimento web moderno.',
  openGraph: {
    title: 'DevBlog',
    description: 'Artigos sobre desenvolvimento web moderno',
    type: 'website',
  },
}

const SparkleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/></svg>
)

export default async function HomePage() {
  const artigos = await getArtigos()
  const [destaque, ...resto] = artigos

  return (
    <>
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

      <section className="hero">
        <div className="hero-inner">
          <p className="hero-eyebrow">Publicação técnica</p>
          <h1>
            Ideias, tutoriais e <em>boas práticas</em> para devs modernos
          </h1>
          <p className="hero-description">
            Conteúdo aprofundado sobre Next.js, React, TypeScript e o ecossistema
            JavaScript - escrito por devs, para devs.
          </p>
        </div>
      </section>

      <main className="main-content">
        <div className="section-header">
          <h2 className="section-title">Todos os artigos</h2>
          <span className="section-count">{artigos.length} publicações</span>
        </div>

        <div className="articles-grid">
          {/* Artigo em destaque */}
          <Link href={`/artigos/${destaque.slug}`} className="card card-featured">
            <div>
              <p className="card-featured-label"><SparkleIcon /> Em destaque</p>
              <span className="card-category">{destaque.categoria}</span>
            </div>
            <div className="card-body">
              <h2 className="card-title">{destaque.titulo}</h2>
              <p className="card-excerpt">{destaque.resumo}</p>
              <div className="card-meta">
                <span className="card-author">{destaque.autor}</span>
                <span className="card-separator" />
                <time dateTime={destaque.data}>{formatarData(destaque.data)}</time>
                <span className="card-arrow">→</span>
              </div>
            </div>
          </Link>

          {/* Demais artigos */}
          {resto.map((artigo) => (
            <Link key={artigo.id} href={`/artigos/${artigo.slug}`} className="card">
              <span className="card-category">{artigo.categoria}</span>
              <h2 className="card-title">{artigo.titulo}</h2>
              <p className="card-excerpt">{artigo.resumo}</p>
              <div className="card-meta">
                <span className="card-author">{artigo.autor}</span>
                <span className="card-separator" />
                <time dateTime={artigo.data}>{formatarData(artigo.data)}</time>
                <span className="card-arrow">→</span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="footer">
        <p className="footer-logo">Dev<span>Blog</span></p>
        <p className="footer-text">
        </p>
      </footer>
    </>
  )
}
