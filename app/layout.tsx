// @ts-nocheck
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | DevBlog',
    default: 'DevBlog - Artigos sobre desenvolvimento web moderno',
  },
  description:
    'Blog técnico sobre Next.js, React, TypeScript, CSS e as melhores práticas do desenvolvimento web moderno.',
  authors: [{ name: 'DevBlog' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'DevBlog',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Anonymous+Pro:ital,wght@0,400;0,700;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
