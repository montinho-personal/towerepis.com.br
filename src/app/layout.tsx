import type { Metadata, Viewport } from 'next'
import { Archivo, Source_Serif_4 } from 'next/font/google'
import './globals.css'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { BotaoFlutuante } from '@/components/BotaoFlutuante'
import { JsonLd, schemaOrganizacao, schemaSite } from '@/lib/schema'
import { empresa } from '@/config/empresa'

/* Fontes auto-hospedadas pelo next/font: zero requisição externa, sem FOUT. */
const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo',
  weight: ['400', '600', '700'],
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
        <BotaoFlutuante />
      </body>
    </html>
  )
}
