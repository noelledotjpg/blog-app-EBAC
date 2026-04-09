import { MetadataRoute } from 'next'
import { getArtigos } from './lib'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const artigos = await getArtigos()
  const baseUrl = 'https://seu-projeto.vercel.app'

  const artigosSitemap = artigos.map((artigo) => ({
    url: `${baseUrl}/artigos/${artigo.slug}`,
    lastModified: new Date(artigo.data),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...artigosSitemap,
  ]
}
