/**
 * Dados estruturados.
 *
 * A Tower não tem loja física desde 2018 — opera como service-area business.
 * Por isso o LocalBusiness é emitido SEM streetAddress, apenas com cidade,
 * estado e areaServed. Publicar endereço que não recebe cliente seria pior
 * do que não publicar nenhum.
 *
 * Product não é usado na v1: sem preço e sem oferta o markup fica frágil e
 * gera aviso no Search Console.
 */
import { empresa } from '@/config/empresa'

const SITE = empresa.site

export const urlAbsoluta = (caminho: string) =>
  caminho === '/' ? `${SITE}/` : `${SITE}${caminho}`

export function schemaOrganizacao() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    '@id': `${SITE}/#organizacao`,
    name: empresa.nome,
    alternateName: 'Tower EPIs',
    description: empresa.descricaoCurta,
    url: `${SITE}/`,
    foundingDate: String(empresa.fundacao),
    telephone: `+${empresa.whatsapp.numero}`,
    // O selo quadrado que a Tower já usa no Instagram. O Google pede o
    // logotipo para o painel de conhecimento, e o reconhecimento tem que ser
    // o mesmo que o cliente já viu em outro lugar.
    logo: `${SITE}/logo-tower-epis.png`,
    image: `${SITE}/fotos/pessoas/helano-e-cristina.jpg`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: empresa.endereco.cidade,
      addressRegion: empresa.endereco.estado,
      addressCountry: empresa.endereco.pais,
    },
    areaServed: empresa.areaAtendida.map((nome) => ({
      '@type': 'AdministrativeArea',
      name: nome,
    })),
    knowsAbout: [
      'Equipamento de Proteção Individual',
      'Calçado de segurança',
      'Calçado ocupacional',
      'Proteção respiratória',
      'Segurança do trabalho',
      'NR-6',
    ],
    sameAs: [empresa.instagram],
  }
}

export function schemaSite() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE}/#site`,
    url: `${SITE}/`,
    name: empresa.nome,
    inLanguage: 'pt-BR',
    publisher: { '@id': `${SITE}/#organizacao` },
  }
}

export function schemaBreadcrumb(itens: { nome: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: itens.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.nome,
      item: urlAbsoluta(item.url),
    })),
  }
}

/** Só usar onde a pergunta e a resposta estão visíveis na página. */
export function schemaFaq(perguntas: { pergunta: string; resposta: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: perguntas.map((p) => ({
      '@type': 'Question',
      name: p.pergunta,
      acceptedAnswer: { '@type': 'Answer', text: p.resposta },
    })),
  }
}

export function schemaArtigo(dados: {
  titulo: string
  descricao: string
  url: string
  publicado: string
  atualizado: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: dados.titulo,
    description: dados.descricao,
    mainEntityOfPage: urlAbsoluta(dados.url),
    datePublished: dados.publicado,
    dateModified: dados.atualizado,
    inLanguage: 'pt-BR',
    author: { '@id': `${SITE}/a-tower/helano/#pessoa` },
    reviewedBy: { '@id': `${SITE}/a-tower/helano/#pessoa` },
    publisher: { '@id': `${SITE}/#organizacao` },
  }
}

export function schemaPessoaHelano() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE}/a-tower/helano/#pessoa`,
    name: empresa.socios.helano.nome,
    jobTitle: empresa.socios.helano.credencial,
    worksFor: { '@id': `${SITE}/#organizacao` },
    url: `${SITE}/a-tower/helano/`,
    image: `${SITE}/fotos/pessoas/helano.jpg`,
    knowsAbout: [
      'Segurança do trabalho',
      'Equipamento de Proteção Individual',
      'Proteção respiratória',
      'Calçado de segurança',
      'NR-6',
    ],
  }
}

export function JsonLd({ dados }: { dados: object | object[] }) {
  const lista = Array.isArray(dados) ? dados : [dados]
  return (
    <>
      {lista.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </>
  )
}
