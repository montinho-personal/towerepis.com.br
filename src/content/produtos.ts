/**
 * Catálogo de produtos — o insumo que ainda não existe.
 *
 * ESTE ARQUIVO ESTÁ VAZIO DE PROPÓSITO, e a lista vazia é a informação mais
 * importante do projeto agora.
 *
 * POR QUE ELE EXISTE. O pedido de transformar as páginas de categoria em um
 * catálogo consultivo — com filtros, grade de produtos, comparador, "meu kit"
 * e schema de Product — depende de um único insumo: dados de produto. Uma
 * auditoria do repositório em 5 de setembro de 2026 não encontrou nenhum:
 * zero SKU, zero número de CA, zero fabricante como dado, zero imagem de
 * produto, zero atributo, zero numeração. A palavra "fabricante" aparece
 * apenas na prosa dos artigos.
 *
 * Sem produto não existe filtro (não há o que filtrar), não existe comparador
 * (não há o que comparar), não existe ItemList e não existe Product. Construir
 * essa maquinaria antes do dado seria construir a esteira sem a fábrica.
 *
 * E INVENTAR NÃO É OPÇÃO. A regra 1 do projeto proíbe número, credencial ou
 * selo que não tenha sido confirmado, e o próprio pedido repete: não inventar
 * CA, marca, produto, estoque, preço, proteção, norma nem prazo de entrega.
 * Um CA inventado num site de EPI não é erro de marketing — é informação de
 * segurança errada, e o CA é consultável publicamente por qualquer pessoa.
 *
 * COMO PREENCHER. Cada campo abaixo diz de onde o dado sai. O que a Tower não
 * souber, fica de fora: `undefined` é uma resposta honesta e a página se
 * adapta. Meio produto verdadeiro vale mais que um produto inteiro chutado.
 *
 * O DIA EM QUE ESTA LISTA TIVER ITENS, passam a ser possíveis, nesta ordem:
 * grade de produtos na categoria, filtros derivados dos atributos realmente
 * presentes, comparador, seleção para cotação e o schema de catálogo. Nada
 * disso deve ser construído antes — está tudo descrito em
 * `docs/18-catalogo-consultivo.md`.
 */
import type { ContextoWhatsApp } from '@/lib/whatsapp'

/** Riscos que um EPI cobre. Vira eixo de navegação e de filtro. */
export type Risco =
  | 'escorregamento'
  | 'impacto'
  | 'perfuracao'
  | 'quimico'
  | 'calor'
  | 'umidade'
  | 'eletrico'
  | 'corte'
  | 'ruido'
  | 'particulado'
  | 'vapor'
  | 'frio'

export type Produto = {
  /** Estável e único. Usado na URL e como chave em toda relação. */
  slug: string

  /** Como a Tower chama o item numa conversa, não o nome do catálogo do fabricante. */
  nome: string

  /**
   * Fabricante. Só entra marca que a Tower realmente trabalha — hoje Bompel,
   * 3M e Sticky Shoes, conforme `src/config/empresa.ts`. Listar marca que não
   * se tem é a promessa que a página de marcas existe para não fazer.
   */
  fabricante: string

  /** Código do fabricante, quando houver. */
  modelo?: string

  /**
   * Número do Certificado de Aprovação.
   *
   * OPCIONAL DE PROPÓSITO, E É O CAMPO MAIS DELICADO DO ARQUIVO. Só preencher
   * com o número lido no próprio produto ou na nota — nunca de memória, nunca
   * "do modelo parecido". Um CA errado publicado é pior do que CA nenhum: a
   * pessoa consulta, não bate, e perde a confiança no site inteiro.
   *
   * O CA tem prazo, e o prazo é do modelo. Ver
   * `/conhecimento/ca-vencido-o-epi-pode-continuar-em-uso/`.
   */
  ca?: string

  /** Data em que o CA foi conferido no CAEPI. Sem isto, o número envelhece calado. */
  caConferidoEm?: string

  /** Categoria do site a que pertence: 'ocupacionais', 'seguranca', 'respiratoria'… */
  categorias: string[]

  /** Riscos que o item cobre. Só o que o CA e o fabricante sustentam. */
  riscos: Risco[]

  /** Slugs de `profissoes.ts` onde o item costuma ser usado. */
  profissoes?: string[]

  /**
   * Atributos técnicos, livres por categoria.
   *
   * É daqui que os filtros nascem: a página lista como filtro apenas o que os
   * produtos daquela categoria realmente declaram. Filtro vazio não aparece.
   *
   * Exemplos de chave: 'biqueira', 'solado', 'fechamento', 'material',
   * 'impermeavel', 'classe', 'espessura', 'punho'.
   */
  atributos?: Record<string, string>

  /** Numerações ou tamanhos disponíveis. Vazio significa "perguntar". */
  tamanhos?: string[]

  /** Uma frase sobre onde este item se sai bem. Escrita, não gerada. */
  resumo?: string

  /**
   * Foto do item real, em `/fotos/produto/<slug>.webp`.
   *
   * Regra 8 do projeto: sem banco de imagem. Render oficial do fabricante
   * também não — foto do produto que passou pelas mãos de vocês prova o que
   * um render não prova.
   */
  imagem?: { alt: string }

  /** Contexto de WhatsApp, quando o item merecer mensagem própria. */
  contexto?: ContextoWhatsApp
}

/**
 * VAZIO. Ver o comentário no topo do arquivo.
 *
 * Enquanto estiver assim, nenhuma página do site renderiza grade de produto,
 * filtro ou comparador — e é o comportamento correto, não uma falha.
 */
export const PRODUTOS: Produto[] = []

/**
 * GUARDA DE BUILD: nada de produto pela metade.
 *
 * Um produto sem fabricante ou sem categoria não tem como aparecer em lugar
 * nenhum do site, e um `ca` fora do formato numérico é quase sempre um campo
 * preenchido com texto de rascunho. O build recusa em vez de publicar.
 */
for (const p of PRODUTOS) {
  if (!p.fabricante || !p.categorias.length) {
    throw new Error(`Produto "${p.slug}": precisa de fabricante e de ao menos uma categoria.`)
  }
  if (p.ca !== undefined && !/^\d{3,6}$/.test(p.ca)) {
    throw new Error(
      `Produto "${p.slug}": o CA "${p.ca}" não parece um número de CA. ` +
        `Deixe o campo de fora se ainda não foi conferido no CAEPI.`,
    )
  }
  if (p.ca !== undefined && !p.caConferidoEm) {
    throw new Error(
      `Produto "${p.slug}": tem CA mas não tem a data em que ele foi conferido. ` +
        `Número de CA sem data de conferência envelhece calado.`,
    )
  }
}

export const buscarProduto = (slug: string) => PRODUTOS.find((p) => p.slug === slug)

/** Produtos de uma categoria do site. Vazio enquanto não houver catálogo. */
export const produtosDaCategoria = (slug: string) =>
  PRODUTOS.filter((p) => p.categorias.includes(slug))

/**
 * Filtros de uma categoria, derivados do que os produtos dela declaram.
 *
 * Nunca devolve filtro vazio, porque só existe chave que algum produto tem.
 * É a implementação da regra "não mostrar filtro vazio" pedida no escopo.
 */
export function filtrosDaCategoria(slug: string): Record<string, string[]> {
  const filtros: Record<string, Set<string>> = {}
  for (const p of produtosDaCategoria(slug)) {
    for (const [chave, valor] of Object.entries(p.atributos ?? {})) {
      ;(filtros[chave] ??= new Set()).add(valor)
    }
  }
  return Object.fromEntries(
    Object.entries(filtros)
      .filter(([, v]) => v.size > 1) // filtro de valor único não filtra nada
      .map(([k, v]) => [k, [...v].sort()]),
  )
}
