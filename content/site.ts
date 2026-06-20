/**
 * Site-level config: danh tính, liên hệ, SEO.
 * Nguồn sự thật cho Nav, Footer, <head> metadata.
 *
 * BẢO MẬT: email thật KHÔNG để lộ dạng text ở client (chống bot scrape).
 * Form liên hệ POST về server route, server đọc CONTACT_TO_EMAIL từ env.
 * Chỉ GitHub được hiển thị công khai.
 */

export const site = {
  name: 'MinhNhut',
  role: 'Fullstack Developer',
  roleVi: 'Lập trình viên Fullstack',
  /** Dòng phụ dưới H1 hero (Mục 9, design-system) */
  tagline: 'fullstack developer · React · TypeScript · Sài Gòn',
  location: 'Sài Gòn, Việt Nam',
  locationEn: 'Ho Chi Minh City, Vietnam',

  /** domain production: DNS A-record → VPS; verify Resend trên devpath.tech */
  url: 'https://minhnhut.devpath.tech',

  /** i18n: launch VN; cấu trúc next-intl [locale] sẵn để thêm EN sau (không refactor) */
  i18n: {
    defaultLocale: 'vi',
    locales: ['vi'] as const,
    planned: ['vi', 'en'] as const,
  },

  /** nút Tải CV — file PDF đặt ở public/assets/cv/ (user cung cấp) */
  cv: {
    enabled: true,
    label: 'Tải CV',
    href: '/assets/cv/minhnhut-cv-vi.pdf',
    // hrefEn: '/assets/cv/minhnhut-cv-en.pdf', // khi có bản EN
  },

  social: {
    github: 'https://github.com/MinhNhut05',
    // linkedin: '', // TODO: thêm nếu có
  },

  /**
   * Email KHÔNG render dạng text. Để form hoạt động, đặt CONTACT_TO_EMAIL
   * trong .env.local (server-only). Đừng import giá trị email vào client bundle.
   */
  contact: {
    showEmailAsText: false,
    /** form POST tới route Next.js; route dùng Resend SDK gửi mail */
    formEndpoint: '/api/contact',
    provider: 'resend',
    /** server đọc từ env — KHÔNG để email/secret trong client bundle */
    env: { to: 'CONTACT_TO_EMAIL', resendKey: 'RESEND_API_KEY' },
    /** chống spam: validate Zod + honeypot + rate-limit theo IP */
    rateLimitPerHour: 5,
  },

  seo: {
    siteName: 'MinhNhut',
    title: 'MinhNhut — Fullstack Developer',
    description:
      'Lập trình viên fullstack tự học tại Sài Gòn. React/Next.js, NestJS, ' +
      'PostgreSQL — đã ship nhiều sản phẩm web có realtime, AI và thanh toán.',
    /** poster tĩnh dùng cho og:image — xem ASSETS.md */
    ogImage: '/assets/og/og-cover.webp',
    locale: 'vi_VN',
    themeColor: '#0A0608', // --ink-900
  },
} as const;

export type Site = typeof site;
