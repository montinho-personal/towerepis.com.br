import type { Metadata, Viewport } from 'next'
import { Archivo, Source_Serif_4 } from 'next/font/google'
import './globals.css'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { BarraContextual } from '@/components/BarraContextual'
import { Medicao } from '@/components/Medicao'
import { JsonLd, schemaOrganizacao, schemaSite } from '@/lib/schema'
import { empresa } from '@/config/empresa'

/* Fontes auto-hospedadas pelo next/font: zero requisição externa, sem FOUT. */
const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo',
  weight: ['400', '600', '700', '800', '900'],
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-serif',
  weight: ['400', '600'],
})

export const metadata: Metadata = {
  metadataBase: new URL(empresa.site),
  title: {
    default: `${empresa.nome} — EPI em Fortaleza desde 1995`,
    template: `%s · ${empresa.nome}`,
  },
  description:
    'Equipamentos de proteção individual em Fortaleza e no Ceará. Calçados ocupacionais e de segurança, proteção respiratória, luvas e mais — com orientação de quem é técnico de segurança do trabalho. Desde 1995.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: empresa.nome,
    url: `${empresa.site}/`,
  },
  robots: { index: true, follow: true },

  /**
   * VERIFICAÇÃO DE PROPRIEDADE DO GOOGLE SEARCH CONSOLE.
   *
   * NÃO REMOVER. O Google reconfere esta etiqueta periodicamente; se ela
   * sumir, a propriedade é desverificada e o histórico do Search Console
   * para de ser coletado — inclusive a linha de base que a revisão de 1º de
   * novembro de 2026 (`docs/10-regra-de-avaliacao.md`) existe para comparar.
   *
   * O token é público por natureza: ele vai no HTML de todas as páginas e não
   * dá acesso a nada. Ele só prova que quem o colocou controla o site — por
   * isso fica no código, versionado, e não numa variável de ambiente que
   * ninguém lembra de reconfigurar.
   *
   * Fica no layout raiz de propósito. O Google só exige na página inicial,
   * mas emitir em todas custa 84 bytes por página e sobrevive a qualquer
   * mudança futura de qual URL é verificada.
   */
  verification: {
    google: 'p3bVQRUfbZ7eNaD_vpUkB4sDKxaEcHiJ8_THNntkXIE',
  },
}

export const viewport: Viewport = {
  themeColor: '#fcfbf9',
  colorScheme: 'light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${sourceSerif.variable}`}>
      <body>
        <JsonLd dados={[schemaOrganizacao(), schemaSite()]} />
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <BarraContextual />
        <Medicao />
      </body>
    </html>
  )
}
