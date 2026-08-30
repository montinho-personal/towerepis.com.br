import Link from 'next/link'
import { Logo } from './Logo'
import { empresa } from '@/config/empresa'
import { linkWhatsApp } from '@/lib/whatsapp'

const COLUNAS = [
  {
    titulo: 'Calçados',
    links: [
      { href: '/calcados/comparativo/', rotulo: 'Ocupacional ou de segurança?' },
      { href: '/calcados/ocupacionais/', rotulo: 'Calçados ocupacionais' },
      { href: '/calcados/seguranca/', rotulo: 'Calçados de segurança' },
      { href: '/calcados/antiderrapantes/', rotulo: 'Antiderrapantes' },
    ],
  },
  {
    titulo: 'Proteção',
    links: [
      { href: '/protecao/respiratoria/', rotulo: 'Respiratória' },
      { href: '/protecao/maos/', rotulo: 'Mãos' },
      { href: '/protecao/auditiva/', rotulo: 'Auditiva' },
      { href: '/protecao/olhos-e-face/', rotulo: 'Olhos e face' },
      { href: '/protecao/cabeca/', rotulo: 'Cabeça' },
      { href: '/protecao/corpo/', rotulo: 'Corpo' },
    ],
  },
  {
    titulo: 'Para seu trabalho',
    links: [
      { href: '/para-seu-trabalho/cozinha/', rotulo: 'Cozinha' },
      { href: '/para-seu-trabalho/enfermagem-e-saude/', rotulo: 'Enfermagem e saúde' },
      { href: '/para-seu-trabalho/limpeza-e-conservacao/', rotulo: 'Limpeza' },
      { href: '/para-seu-trabalho/construcao/', rotulo: 'Construção' },
      { href: '/para-seu-trabalho/industria/', rotulo: 'Indústria' },
      { href: '/para-seu-trabalho/logistica-e-estoque/', rotulo: 'Logística' },
      { href: '/para-seu-trabalho/manutencao/', rotulo: 'Manutenção' },
    ],
  },
  {
    titulo: 'A Tower',
    links: [
      { href: '/a-tower/', rotulo: 'Nossa história' },
      { href: '/a-tower/helano/', rotulo: 'Helano' },
      { href: '/marcas/', rotulo: 'Marcas' },
      { href: '/empresas/', rotulo: 'Para empresas' },
      { href: '/conhecimento/', rotulo: 'Conhecimento' },
      { href: '/contato/', rotulo: 'Contato' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="band-ink mt-24">
      <div className="wrap py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_2.2fr]">
          <div>
            <Logo escuro />
            <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed text-paper/70">
              {empresa.assinatura}
              <br />
              Fortaleza, Ceará.
            </p>

            <p className="mt-6 text-[0.95rem] text-paper/70">
              WhatsApp{' '}
              <a
                href={linkWhatsApp('contato')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper underline underline-offset-4"
              >
                {empresa.whatsapp.exibicao}
              </a>
            </p>
            <p className="mt-1 text-[0.95rem] text-paper/70">
              <a
                href={empresa.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper underline underline-offset-4"
              >
                @towerepis
              </a>
            </p>

            <p className="numeral mt-10 text-6xl text-paper/15" aria-hidden="true">
              1995
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {COLUNAS.map((col) => (
              <div key={col.titulo}>
                <h2 className="eyebrow text-paper/55">{col.titulo}</h2>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-[0.9rem] text-paper/75 transition-colors hover:text-paper"
                      >
                        {l.rotulo}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-paper/15 pt-8 text-xs text-paper/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {empresa.nome}
            {empresa.cnpj ? ` · CNPJ ${empresa.cnpj}` : ''} · Fortaleza — CE
          </p>
          <Link href="/politica-de-privacidade/" className="hover:text-paper">
            Política de privacidade
          </Link>
        </div>

        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-paper/55">
          O conteúdo deste site tem finalidade informativa e orienta a escolha de
          equipamentos de proteção individual. Ele não substitui a avaliação de riscos
          do ambiente de trabalho, que deve ser feita por profissional habilitado
          quando necessária.
        </p>
      </div>
    </footer>
  )
}
