import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Página não encontrada',
  description: 'A página que você está procurando não existe.',
}

export default function NotFound() {
  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            Dev<span>Blog</span>
          </Link>
        </div>
      </nav>
      <div className="not-found">
        <p className="not-found-number">404</p>
        <h2>Página não encontrada</h2>
        <p>O artigo que você está procurando não existe ou foi removido.</p>
        <Link href="/" className="btn-primary">
          ← Voltar ao início
        </Link>
      </div>
    </>
  )
}
