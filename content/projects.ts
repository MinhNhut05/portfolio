/**
 * Dự án — nguồn sự thật cho section "Dự án nổi bật" (landing) và trang /projects.
 *
 * - `featured: true` + sắp theo `order` → 3 card trên landing. Card order=1 là
 *   "đinh" (Mục 9: PMS đứng đầu vì câu chuyện kỹ thuật mạnh nhất).
 * - `links.repo = null` → dự án không gắn repo (private hoặc theo ý user).
 * - `highlights` = điểm nhấn để kể khi phỏng vấn / đọc nhanh.
 * - `thumbnail` trỏ tới ảnh sẽ tạo — xem ASSETS.md (mục "Project thumbnails").
 *
 * URL đã verify (gh repo view): devteam-os=PUBLIC · canva-schedule=PUBLIC ·
 * devpath=PUBLIC · excel-cen=PRIVATE.
 */

export type ProjectAccent = 'son' | 'berry' | 'crane' | 'gold';

export interface ProjectLinks {
  repo: string | null;
  live: string | null;
  /** true khi mã nguồn không công khai */
  private?: boolean;
}

export interface Project {
  slug: string;
  name: string;
  /** 1 dòng — hiện trên card */
  tagline: string;
  /** đoạn mô tả ngắn — hiện ở trang /projects */
  description: string;
  role: string;
  year: number;
  stack: string[];
  /** tag mono ngắn hiện trên card (3–6 cái) */
  tags: string[];
  /** điểm nhấn kỹ thuật */
  highlights: string[];
  links: ProjectLinks;
  thumbnail: string;
  accent: ProjectAccent;
  featured: boolean;
  order: number;
  note?: string;
}

export const projects: Project[] = [
  {
    slug: 'pms-devteamos',
    name: 'DevTeamOS — PMS',
    tagline: 'Hệ quản lý dự án kiểu Kanban, realtime, cho team startup nhỏ.',
    description:
      'Progress Management System cho freelancer và team 2–15 người: workspace ' +
      'đa tenant, task Kanban, collaboration realtime. Monorepo pnpm với ranh ' +
      'giới sạch (contracts chỉ chứa type, không logic).',
    role: 'Fullstack (trọng tâm backend)',
    year: 2026,
    stack: [
      'pnpm monorepo',
      'React 18 + Vite',
      'TanStack Query',
      'Zustand',
      'dnd-kit',
      'Recharts',
      'NestJS 10',
      'Prisma',
      'PostgreSQL 16',
      'Socket.IO + Redis adapter',
      'BullMQ',
      'Passport (JWT + Google OAuth)',
      'Sentry',
      'Docker Compose + Caddy',
    ],
    tags: ['NestJS', 'PostgreSQL', 'Socket.IO', 'Redis', 'RBAC', 'Monorepo'],
    highlights: [
      'Realtime scale bằng Redis adapter + BullMQ cho notification async (7 loại).',
      'RBAC 2 tầng decorator-based: @WorkspaceRoles + guard ở project.',
      'Monorepo ranh giới sạch — contracts type-only, không rò logic.',
    ],
    links: { repo: 'https://github.com/MinhNhut05/devteam-os', live: null },
    thumbnail: '/assets/projects/pms-devteamos.webp',
    accent: 'son',
    featured: true,
    order: 1,
  },
  {
    slug: 'devpath',
    name: 'DevPath — path-learn',
    tagline: 'Nền tảng học IT theo lộ trình AI, có tutor và thanh toán.',
    description:
      'Người học làm onboarding đánh giá trình độ → AI sinh lộ trình cá nhân ' +
      'hoá → AI tutor + quiz + theo dõi tiến độ, có gói subscription trả phí ' +
      '(MoMo / VNPay).',
    role: 'Fullstack',
    year: 2026,
    stack: [
      'React 18 + Vite',
      'Zustand',
      'React Query',
      'NestJS 11',
      'Prisma 7',
      'PostgreSQL 16',
      'Redis 7',
      'JWT + refresh cookie + Email OTP',
      'Google/GitHub OAuth',
      'Anthropic-compatible proxy (Gemini/Claude)',
      'MoMo + VNPay',
      'Docker + DigitalOcean VPS',
    ],
    tags: ['NestJS', 'React', 'AI', 'Payments', 'OAuth'],
    highlights: [
      'AI graceful degradation: timeout 30s bằng AbortController, fail thì trả fallback; chọn model theo tier.',
      'Payment HMAC: verify chữ ký webhook MoMo SHA256 / VNPay SHA512 chống giả mạo.',
      'Quota fail-fast: check trước khi gọi AI để tiết kiệm cost.',
    ],
    links: { repo: null, live: 'https://devpathos.tech' },
    thumbnail: '/assets/projects/devpath.webp',
    accent: 'berry',
    featured: true,
    order: 2,
  },
  {
    slug: 'siletravel',
    name: 'SileTravel — Canva Schedule',
    tagline: 'Biến file tour (PDF/DOCX/Excel) thành tài liệu Canva bằng AI.',
    description:
      'Pipeline cho công ty du lịch: upload → parse → AI bóc tách có cấu trúc → ' +
      'người duyệt → sinh design Canva (lịch trình + menu). 8 template, gửi ' +
      'email hàng loạt qua worker.',
    role: 'Fullstack (trọng tâm frontend)',
    year: 2026,
    stack: [
      'Next.js 15.3 (App Router + Server Actions)',
      'React 19',
      'NextAuth v5',
      'Prisma 6 + PostgreSQL',
      'OpenAI (extraction + Zod)',
      'Canva OAuth/API',
      'pdfjs / mammoth',
      'AWS S3',
      'Vitest + Playwright',
      'Docker + GitHub Actions CI/CD',
    ],
    tags: ['Next.js 15', 'React 19', 'OpenAI', 'Canva API', 'Playwright'],
    highlights: [
      'Pipeline file→text→AI→data có Zod validate + retry, kèm quality scoring.',
      'OAuth 2.0 token lifecycle đầy đủ: refresh rotation, cooldown, retry queue.',
      'Next.js 15 Server Actions + middleware JWT + RBAC (admin/member).',
    ],
    links: { repo: 'https://github.com/MinhNhut05/canva-schedule', live: 'https://canva.devteamos.me' },
    thumbnail: '/assets/projects/siletravel.webp',
    accent: 'crane',
    featured: true,
    order: 3,
  },
  {
    slug: 'examroom-allocator',
    name: 'ExamRoomAllocator',
    tagline: 'Xếp phòng thi từ Excel — chia công bằng, kéo-thả, xuất in.',
    description:
      'Import roster Excel → tự dò sheet/header → chia phòng công bằng bằng 3 ' +
      'thuật toán → kéo-thả chỉnh tay (versioned) → xuất Excel/PDF in được. ' +
      'README tốt nhất trong các dự án.',
    role: 'Fullstack',
    year: 2026,
    stack: [
      'Next.js 16.2 + React 19',
      'Prisma 6 + PostgreSQL',
      'ExcelJS + xlsx',
      'Zod 4',
      'dnd-kit',
      'Tailwind 4',
      'Vitest',
      'Docker + GitHub Actions CI/CD',
      'Anthropic API (header mapping fallback)',
    ],
    tags: ['Next.js 16', 'Algorithms', 'ExcelJS', 'i18n', 'dnd-kit'],
    highlights: [
      'Sort tiếng Việt chuẩn bằng Intl.Collator("vi") + tie-break (tên → đệm → mã SV).',
      'Chia phòng largest-remainder (representative_ratio) + fairness metrics.',
      'History snapshot bất biến: edit tạo version mới → audit & undo không cần query phức tạp.',
    ],
    links: { repo: null, live: 'https://dung.devteamos.me' },
    thumbnail: '/assets/projects/examroom-allocator.webp',
    accent: 'gold',
    featured: false,
    order: 4,
    note: 'README tốt nhất — proof "production cred".',
  },
];

/** 3 card trên landing, đã sắp thứ tự. */
export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.order - b.order);
