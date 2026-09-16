// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-08-14',
  devServer: {
    host: 'localhost',
    port: 3000
  },
  devtools: { enabled: true },
  experimental: {
    appManifest: false
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    googleDriveApiKey: process.env.GOOGLE_DRIVE_API_KEY || '',
    googleDriveParentFolderId: process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID || '',
  },
  app: {
    head: {
      title: 'Kuesioner Pembelajaran Digital ASN - Riset Konteks & Kendala E-Learning',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Aplikasi kuesioner empiris untuk mengidentifikasi konteks belajar, hambatan teknis, dan dinamika kedinasan ASN dalam pelatihan digital/e-learning.' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700;800&family=KaTeX_Main:ital,wght@0,400;0,700;1,400&family=KaTeX_Math:ital,wght@1,400;1,700&display=swap' },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css' }
      ]
    }
  }
})
