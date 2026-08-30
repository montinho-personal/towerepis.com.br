import type { Metadata } from 'next'
import { PaginaCalcado, metadataCalcado } from '@/components/PaginaCalcado'

export const metadata: Metadata = metadataCalcado('ocupacionais')

export default function Pagina() {
  return <PaginaCalcado slug="ocupacionais" />
}
