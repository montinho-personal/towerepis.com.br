import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // Desliga explicitamente APIs que o site não usa. Se um script de
          // terceiro entrar um dia, ele já nasce sem acesso a câmera,
          // microfone e geolocalização.
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          { key: 'X-DNS-Prefetch-Control', value: 'off' },
        ],
      },
      {
        // Os modelos para baixar existem para servir o artigo que os explica.
        // Indexado, o PDF disputaria a busca com a própria página e levaria a
        // visita para um arquivo sem contexto e sem WhatsApp.
        source: '/modelos/:arquivo*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
    ]
  },
}

export default nextConfig
