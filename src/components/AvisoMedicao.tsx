import { MEDICAO_CONFIGURADA } from '@/lib/consentimento'

/**
 * Aviso de que a medição descrita ainda não está ligada.
 *
 * POR QUE ISTO EXISTE. As páginas legais foram escritas ANTES de o GA4 ir ao
 * ar, que é a ordem certa — a política de cookies prometia por escrito que o
 * banner viria antes da ferramenta. Só que isso cria uma janela em que os
 * documentos descrevem um tratamento que ainda não acontece, e descrever
 * tratamento inexistente é o erro que a versão original desta política
 * cometia e que a auditoria pegou.
 *
 * Então o texto se ajusta sozinho ao build: enquanto `NEXT_PUBLIC_GA_ID` não
 * estiver definida, este aviso aparece e diz exatamente o que é verdade.
 * Definida a variável, ele some sem ninguém precisar lembrar de editar nada.
 *
 * É componente de servidor: a variável é lida no build, não no navegador.
 */
export function AvisoMedicaoInativa() {
  if (MEDICAO_CONFIGURADA) return null
  return (
    <div className="border-l-[3px] border-rule-strong bg-paper-2 p-5">
      <p className="eyebrow">Estado hoje</p>
      <p className="mt-3 text-[0.95rem] leading-relaxed">
        <strong>A medição descrita nesta página ainda não está ligada.</strong> Enquanto
        não estiver, não existe banner, não existe cookie nenhum e nada é enviado ao
        Google — o site se comporta como se esta seção não existisse. O texto foi
        publicado antes da ferramenta de propósito, para que ninguém seja medido sob uma
        política que ainda não estava no ar.
      </p>
    </div>
  )
}
