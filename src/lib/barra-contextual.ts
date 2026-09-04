import { destinoDaRota } from './contexto-rota'
import type { ContextoWhatsApp } from './whatsapp'
import { PROFISSOES } from '@/content/profissoes'
import { PROTECOES } from '@/content/protecoes'
import { CALCADOS } from '@/content/calcados'
import { SETORES } from '@/content/setores'
import { ARTIGOS } from '@/content/artigos'
import { CIDADES, ESTADOS } from '@/content/cidades'

/**
 * A frase da barra contextual.
 *
 * O QUE JÁ EXISTIA: `contexto-rota.ts` resolve rota → contexto de WhatsApp e
 * mensagem pré-escrita. O botão flutuante usa isso desde antes desta barra —
 * 46 mensagens diferentes em 58 páginas, medido na QA.
 *
 * O QUE FALTAVA: a frase. Um círculo verde não responde "por que eu deveria
 * falar com a Tower agora?". A barra responde, e a mensagem do WhatsApp
 * continua vindo do motor que já existe — não há dois sistemas.
 *
 * DERIVADO, NÃO ESCRITO À MÃO. Regra por URL vira dívida: página nova nasce
 * sem regra e ninguém lembra. Aqui a frase sai do próprio conteúdo — uma
 * profissão nova, um artigo novo ou uma cidade nova entram sozinhos.
 *
 * HIERARQUIA (a ordem de resolução abaixo é a prioridade pedida): página
 * comercial específica → cidade → profissão → setor → cluster do artigo →
 * categoria → institucional → padrão.
 */
export type Barra = {
  /** A frase. Curta, sem ponto de exclamação, sem urgência fabricada. */
  chamada: string
  /** Rótulo do botão. Duas a cinco palavras. */
  rotulo: string
  contexto: ContextoWhatsApp
  mensagem?: string
  /**
   * Quanto da página precisa ser percorrido antes de a barra aparecer.
   *
   * Página de intenção alta aparece cedo: quem está em /orcamento/ já
   * decidiu. Artigo aparece tarde: interromper quem está lendo o texto que
   * você escreveu para ele é trabalhar contra si mesmo.
   */
  gatilho: number
}

/** Onde a barra não aparece. */
const SILENCIO = [
  '/politica-de-privacidade/',
  '/politica-de-cookies/',
  '/termos-de-uso/',
  // O contato inteiro já É o CTA. Uma barra sobre ele seria eco.
  '/contato/',
  // A ferramenta termina em WhatsApp com o resultado. Barra por cima
  // competiria com o próprio fluxo que ela construiu.
  '/encontrar-epi/',
  // O construtor de cotação tem o botão de envio como ação principal da
  // tela. Segunda ação fixa por cima é exatamente a pilha que a gente
  // decidiu não ter.
  '/orcamento/',
]

const PADRAO: Omit<Barra, 'contexto' | 'mensagem'> = {
  chamada: 'Precisa de ajuda para escolher um EPI?',
  rotulo: 'Falar com a Tower',
  gatilho: 0.3,
}

/** Frases das páginas singulares. As demais são derivadas do conteúdo. */
const SINGULARES: Record<string, Omit<Barra, 'contexto' | 'mensagem'>> = {
  '/': {
    chamada: 'Precisa de EPI para a sua equipe?',
    rotulo: 'Conversar no WhatsApp',
    gatilho: 0.25,
  },
  '/calcados/': {
    chamada: 'Não sabe qual calçado atende a sua operação?',
    rotulo: 'Pedir orientação',
    gatilho: 0.2,
  },
  '/calcados/comparativo/': {
    chamada: 'Ainda em dúvida entre os dois?',
    rotulo: 'Pedir orientação',
    gatilho: 0.35,
  },
  '/empresas/': {
    chamada: 'Vai equipar uma equipe?',
    rotulo: 'Solicitar atendimento',
    gatilho: 0.2,
  },
  '/empresas/como-atendemos/': {
    chamada: 'Quer começar um orçamento?',
    rotulo: 'Pedir orçamento',
    gatilho: 0.25,
  },
  '/protecao/': {
    chamada: 'Não sabe qual proteção a sua atividade exige?',
    rotulo: 'Perguntar no WhatsApp',
    gatilho: 0.3,
  },
  '/para-seu-trabalho/': {
    chamada: 'Não achou a sua atividade?',
    rotulo: 'Perguntar no WhatsApp',
    gatilho: 0.3,
  },
  '/conhecimento/': {
    chamada: 'Sua dúvida não está aqui?',
    rotulo: 'Perguntar no WhatsApp',
    gatilho: 0.4,
  },
  '/epi-por-cidade/': {
    chamada: 'Quer saber se a Tower atende a sua cidade?',
    rotulo: 'Perguntar no WhatsApp',
    gatilho: 0.25,
  },
  '/marcas/': {
    chamada: 'Procura uma marca específica?',
    rotulo: 'Perguntar disponibilidade',
    gatilho: 0.3,
  },
  '/marcas/bompel/': {
    chamada: 'Quer ver a linha Bompel para a sua equipe?',
    rotulo: 'Pedir orçamento',
    gatilho: 0.3,
  },
  '/marcas/3m/': {
    chamada: 'Precisa de proteção respiratória?',
    rotulo: 'Consultar disponibilidade',
    gatilho: 0.35,
  },
  '/a-tower/': {
    chamada: 'Quer falar direto com um dos sócios?',
    rotulo: 'Falar com a Tower',
    gatilho: 0.4,
  },
  '/a-tower/helano/': {
    chamada: 'Tem uma dúvida técnica sobre EPI?',
    rotulo: 'Perguntar ao Helano',
    gatilho: 0.4,
  },
}

/**
 * Frase por cluster de artigo.
 *
 * O artigo é o ponto mais delicado: a pessoa está lendo. A frase precisa
 * continuar o problema do texto, não interromper com oferta.
 */
const POR_ARTIGO: Record<string, { chamada: string; rotulo: string }> = {
  'calcado-para-cozinha-como-escolher': {
    chamada: 'Precisa escolher calçado para uma equipe de cozinha?',
    rotulo: 'Pedir orientação',
  },
  'solado-antiderrapante-o-que-significa': {
    chamada: 'Quer ajuda para escolher pelo tipo de piso?',
    rotulo: 'Perguntar no WhatsApp',
  },
  'o-que-e-ca-certificado-de-aprovacao': {
    chamada: 'Quer conferir o CA dos EPIs que a sua equipe usa?',
    rotulo: 'Mandar a lista',
  },
  'nr-6-o-que-a-empresa-precisa-saber': {
    chamada: 'Precisa saber qual EPI a sua atividade exige?',
    rotulo: 'Conversar com a equipe',
  },
  'calcado-ocupacional-ou-de-seguranca': {
    chamada: 'Quer saber qual dos dois serve para a sua rotina?',
    rotulo: 'Pedir orientação',
  },
  'ficha-de-entrega-de-epi-o-que-precisa-constar': {
    chamada: 'Precisa do CA de cada item para preencher a ficha?',
    rotulo: 'Pedir orçamento com CA',
  },
  'botina-que-machuca-calcado-ou-numeracao': {
    chamada: 'O calçado da sua equipe está machucando?',
    rotulo: 'Pedir orientação',
  },
  'luva-de-procedimento-nao-e-luva-de-limpeza': {
    chamada: 'Quer conferir se a luva da sua equipe é a certa?',
    rotulo: 'Perguntar no WhatsApp',
  },
  'mascara-descartavel-nao-protege-de-vapor-quimico': {
    chamada: 'Quer conferir o respirador que a sua equipe usa?',
    rotulo: 'Perguntar no WhatsApp',
  },
  'biqueira-de-composite-ou-de-aco-qual-escolher': {
    chamada: 'Em dúvida entre composite e aço para a sua atividade?',
    rotulo: 'Pedir orientação',
  },
  'grade-de-numeracao-como-definir-para-a-equipe': {
    chamada: 'Já tem a grade da sua equipe?',
    rotulo: 'Mandar a grade',
  },
}

/**
 * Frase por categoria de calçado e por parte do corpo.
 *
 * Aqui a derivação automática produziu frase torta — "proteção de respiração",
 * "proteção de corpo" — e a mesma frase para os três tipos de calçado. Onde o
 * português não colabora com o molde, o texto é escrito à mão. Derivar é bom
 * para nome próprio (cidade, profissão); é ruim para preposição.
 */
const POR_CALCADO: Record<string, { chamada: string; rotulo: string }> = {
  ocupacionais: {
    chamada: 'Quer ajuda para escolher um calçado ocupacional?',
    rotulo: 'Pedir orientação',
  },
  seguranca: {
    chamada: 'Precisa de calçado com biqueira para a sua equipe?',
    rotulo: 'Pedir orçamento',
  },
  antiderrapantes: {
    chamada: 'Quer escolher pelo piso onde a equipe trabalha?',
    rotulo: 'Pedir orientação',
  },
}

const POR_PROTECAO: Record<string, string> = {
  respiratoria: 'Não sabe qual máscara ou respirador usar?',
  maos: 'Não sabe qual luva serve para o seu risco?',
  auditiva: 'Precisa de proteção auditiva para o seu nível de ruído?',
  'olhos-e-face': 'Precisa proteger olhos ou rosto na sua atividade?',
  cabeca: 'Precisa de capacete para a sua equipe?',
  corpo: 'Precisa de vestimenta de proteção?',
}

/** Frase por setor — o vocabulário do comprador, não o do catálogo. */
const POR_SETOR: Record<string, string> = {
  alimentacao: 'Precisa de calçado para a sua equipe de cozinha?',
  saude: 'Vai padronizar o EPI da sua unidade?',
  industria: 'Precisa padronizar o EPI da sua operação?',
  construcao: 'Vai equipar uma equipe de obra?',
  'facilities-e-limpeza': 'Vai equipar a sua equipe de limpeza?',
}

export function barraDaRota(pathname: string): Barra | null {
  const rota = pathname.endsWith('/') ? pathname : `${pathname}/`
  if (SILENCIO.includes(rota)) return null

  const { contexto, mensagem } = destinoDaRota(rota)
  const base = { contexto, mensagem }

  // 1. Páginas singulares, escritas à mão.
  const singular = SINGULARES[rota]
  if (singular) return { ...singular, ...base }

  // 2. Cidade — contexto geográfico sem fingir presença física.
  const cidade = CIDADES.find((c) => rota === `/epi-por-cidade/${c.slug}/`)
  if (cidade) {
    return {
      chamada: `Precisa de EPI para uma equipe em ${cidade.nome}?`,
      rotulo: 'Solicitar atendimento',
      gatilho: 0.25,
      ...base,
    }
  }

  const estado = ESTADOS.find((e) => rota === `/epi-por-cidade/${e.slug}/`)
  if (estado) {
    return {
      chamada: `Precisa de EPI para uma equipe ${estado.uf === 'CE' ? 'no Ceará' : estado.uf === 'PI' ? 'no Piauí' : 'no Rio Grande do Norte'}?`,
      rotulo: 'Solicitar atendimento',
      gatilho: 0.25,
      ...base,
    }
  }

  // 3. Profissão — a pessoa, não a empresa. Tom mais próximo.
  const profissao = PROFISSOES.find((p) => rota === `/para-seu-trabalho/${p.slug}/`)
  if (profissao) {
    return {
      chamada: `Quer ajuda para escolher o EPI de ${profissao.nome.toLowerCase()}?`,
      rotulo: 'Perguntar no WhatsApp',
      gatilho: 0.3,
      ...base,
    }
  }

  // 4. Setor — quem lê é quem compra para a equipe.
  const setor = SETORES.find((s) => rota === `/empresas/${s.slug}/`)
  if (setor) {
    return {
      chamada: POR_SETOR[setor.slug] ?? `Vai equipar uma equipe de ${setor.nome.toLowerCase()}?`,
      rotulo: 'Solicitar atendimento',
      gatilho: 0.2,
      ...base,
    }
  }

  // 5. Artigo — continua o problema do texto.
  const artigo = ARTIGOS.find((a) => rota === `/conhecimento/${a.slug}/`)
  if (artigo) {
    const copy = POR_ARTIGO[artigo.slug]
    return {
      chamada: copy?.chamada ?? 'Ficou com dúvida sobre o que leu?',
      rotulo: copy?.rotulo ?? 'Perguntar no WhatsApp',
      // Artigo é o gatilho mais tardio do site: metade do texto.
      gatilho: 0.5,
      ...base,
    }
  }

  // 6. Categoria de calçado.
  const calcado = CALCADOS.find((c) => rota === `/calcados/${c.slug}/`)
  if (calcado) {
    const copy = POR_CALCADO[calcado.slug]
    return {
      chamada: copy?.chamada ?? `Quer ajuda para escolher entre os modelos de ${calcado.nome.toLowerCase()}?`,
      rotulo: copy?.rotulo ?? 'Pedir orientação',
      gatilho: 0.25,
      ...base,
    }
  }

  // 7. Parte do corpo.
  const protecao = PROTECOES.find((p) => rota === `/protecao/${p.slug}/`)
  if (protecao) {
    return {
      chamada: POR_PROTECAO[protecao.slug] ?? `Quer ajuda para escolher proteção para ${protecao.parte.toLowerCase()}?`,
      rotulo: 'Perguntar no WhatsApp',
      gatilho: 0.3,
      ...base,
    }
  }

  // 8. Padrão inteligente.
  return { ...PADRAO, ...base }
}
