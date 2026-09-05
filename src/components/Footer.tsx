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
    titulo: 'Por profissão',
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
      { href: '/marcas/bompel/', rotulo: 'Bompel' },
      { href: '/marcas/', rotulo: 'Marcas' },
      { href: '/orcamento/', rotulo: 'Montar cotação' },
      { href: '/empresas/', rotulo: 'Para empresas' },
      { href: '/conhecimento/', rotulo: 'Conhecimento' },
      { href: '/epi-por-cidade/', rotulo: 'Onde atendemos' },
      { href: '/contato/', rotulo: 'Contato' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t-4 border-tower-red bg-grafite-900 text-paper">
      <div className="wrap py-16 sm:py-20">
        {/* Assinatura de marca antes da navegação. O rodapé fecha a marca;
            os links vêm depois, não no lugar dela. */}
        <div className="border-b border-grafite-600 pb-12">
          <p className="font-display text-[1.6rem] font-extrabold leading-[1.35] tracking-[0.03em] sm:text-[2.1rem]">
            TOWER EPI&rsquo;S
            <br />
            FORTALEZA — CE
            <br />
            <span className="text-tower-red-light">DESDE 1995</span>
          </p>
        </div>

        <div className="mt-12 grid gap-14 lg:grid-cols-[minmax(0,1fr)_2.2fr]">
          <div>
            <Logo prefixo="rodape" tom="escuro" className="h-14 w-auto" />
            <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed text-paper/70">
              Equipamentos de proteção individual em Fortaleza e região metropolitana
              do Ceará.
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

            <p className="numeral mt-12 text-mega leading-[0.8] text-grafite-700" aria-hidden="true">
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

        <div className="mt-16 flex flex-col gap-3 border-t border-grafite-600 pt-8 text-xs text-paper/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {empresa.nome}
            {empresa.cnpj ? ` · CNPJ ${empresa.cnpj}` : ''} · Fortaleza — CE
          </p>
          {/* Documentos legais visíveis, sem virar lista de palavra-chave. */}
          <nav aria-label="Documentos legais" className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/politica-de-privacidade/" className="hover:text-paper">
              Privacidade
            </Link>
            <Link href="/politica-de-cookies/" className="hover:text-paper">
              Cookies
            </Link>
            <Link href="/termos-de-uso/" className="hover:text-paper">
              Termos de uso
            </Link>
          </nav>
        </div>

        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-paper/55">
          O que está aqui ajuda a escolher EPI. Não substitui a avaliação de riscos do
          ambiente de trabalho, que deve ser feita por profissional habilitado.
        </p>
      </div>
    </footer>
  )
}
