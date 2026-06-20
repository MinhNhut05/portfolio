/**
 * Toàn bộ chữ (copy) của landing page + trang con.
 * Tông giọng: "builder tự tin" — nhấn sản phẩm đã ship, không khoa trương,
 * không bịa kinh nghiệm. VN-first (xem design-system Mục 4 — hỗ trợ đủ dấu).
 *
 * Quy ước hero: H1 = tên; 1 cụm in nghiêng (Playfair italic) tạo nhịp
 * calligraphic (Mục 4.2). Eyebrow theo Mục 8: gạch ngắn + UPPERCASE vàng.
 */

export const copy = {
  hero: {
    eyebrow: '— PORTFOLIO',
    title: 'MinhNhut',
    /** cụm in nghiêng nhấn nhịp, đặt cạnh/dưới tên (tùy layout) */
    titleAccent: 'kiến tạo sản phẩm web',
    sub: 'fullstack developer · React · TypeScript · Sài Gòn',
    scrollHint: 'cuộn để khám phá',
  },

  about: {
    eyebrow: '— GIỚI THIỆU',
    heading: 'Tự học, và ship thật.',
    paragraphs: [
      'Tôi là lập trình viên fullstack tự học tại Sài Gòn, làm xuyên suốt từ ' +
        'React / Next.js ở frontend tới NestJS, Prisma và PostgreSQL ở backend.',
      'Tôi đã tự tay đưa nhiều sản phẩm hoàn chỉnh lên production — một hệ quản ' +
        'lý dự án realtime, một nền tảng học có AI tutor và thanh toán, một ' +
        'pipeline biến tài liệu thành thiết kế Canva — kèm Docker, CI/CD và test.',
      'Tôi học nhanh và ưu tiên thứ chạy được, đo được: auth & OAuth, realtime ' +
        'bằng Socket.IO + Redis, tích hợp AI có cơ chế fallback, thanh toán có ' +
        'verify chữ ký webhook. Mọi repo đều có README gọn để người khác đọc hiểu ngay.',
    ],
    cta: { label: '→ Tìm hiểu thêm', href: '/about' },
  },

  skills: {
    eyebrow: '— KỸ NĂNG',
    heading: 'Công cụ tôi dùng để ship.',
  },

  projects: {
    eyebrow: '— DỰ ÁN',
    heading: 'Vài thứ tôi đã dựng.',
    viewAll: { label: 'Xem tất cả →', href: '/projects' },
  },

  footer: {
    thanks: 'Cảm ơn đã ghé qua.',
    subtext: 'Đang mở cho cơ hội junior fullstack — tại Việt Nam và remote.',
    /** lời mời liên hệ nhẹ, không CTA ép (Mục 1) */
    contactPrompt: 'Muốn trao đổi? Gửi cho tôi một dòng.',
  },

  contact: {
    eyebrow: '— LIÊN HỆ',
    heading: 'Gửi tôi một lời nhắn.',
    sub: 'Tôi đọc và phản hồi qua email. Để lại tên và lời nhắn là đủ.',
    form: {
      name: { label: 'Tên của bạn', placeholder: 'Nguyễn Văn A' },
      email: { label: 'Email', placeholder: 'ban@email.com' },
      message: { label: 'Lời nhắn', placeholder: 'Chào MinhNhut, mình muốn…' },
      submit: 'Gửi lời nhắn',
      sending: 'Đang gửi…',
    },
    toast: {
      success: 'Đã gửi — cảm ơn bạn! Tôi sẽ phản hồi sớm.',
      error: 'Gửi chưa được. Thử lại, hoặc nhắn qua GitHub giúp tôi nhé.',
    },
    /** thông báo lỗi inline — nói rõ cách sửa (Mục 9) */
    validation: {
      nameRequired: 'Cho tôi xin tên với nhé.',
      emailRequired: 'Cần email để tôi phản hồi bạn.',
      emailInvalid: 'Email chưa đúng định dạng — kiểm tra lại giúp tôi.',
      messageRequired: 'Viết vài dòng cho tôi biết bạn cần gì nhé.',
    },
  },

  nav: {
    links: [
      { label: 'home', href: '/' },
      { label: 'works', href: '/projects' },
      { label: 'about', href: '/about' },
      { label: 'blog', href: '/blog' },
    ],
  },

  /** alt text mô tả thật cho ảnh/scene (a11y — Mục 11) */
  alt: {
    heroCrane:
      'Hạc trắng-bạc sải cánh giữa dải lụa đỏ son, trôi trong nền tím vũ trụ điểm sao',
    footerCrane: 'Bóng hạc mờ phía sau lời cảm ơn',
  },
} as const;

export type Copy = typeof copy;
