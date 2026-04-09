import { Artigo } from './types'
import artigos from '../data/artigos.json'

// Simula fetch de API usando JSON local
// Para usar API real, substitua por fetch('https://sua-api.com/artigos')
export async function getArtigos(): Promise<Artigo[]> {
  // Simula latência de rede
  await new Promise((r) => setTimeout(r, 0))
  return artigos as Artigo[]
}

export async function getArtigoPorSlug(slug: string): Promise<Artigo | null> {
  const todos = await getArtigos()
  return todos.find((a) => a.slug === slug) ?? null
}

export function formatarData(dataISO: string): string {
  return new Date(dataISO).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}
