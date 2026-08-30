import Link from 'next/link'
import { Secao } from '@/components/Blocos'

export default function NaoEncontrado() {
  return (
    <Secao className="wrap">
      <p className="numeral text-6xl text-tower-red">404</p>
      <h1 className="mt-6 text-3xl sm:text-4xl">Esta página não existe.</h1>
      <p className="mt-4 measure text-lg text-ink-2">
        Pode ser um link antigo ou um endereço digitado errado. Se você procura um
        equipamento específico, o caminho mais rápido é falar com a gente.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-ink">Ir para o início</Link>
        <Link href="/para-seu-trabalho/" className="btn btn-ghost">
          Buscar pela minha profissão
        </Link>
      </div>
    </Secao>
  )
}
