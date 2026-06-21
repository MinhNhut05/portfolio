/**
 * Kỹ năng, gom nhóm theo Frontend / Backend / Tooling & Infra / AI & Tích hợp.
 * Dùng cho section "Kỹ năng" (chip + thanh logo trôi ngang — Mục 8, 9).
 *
 * Mọi tech ở đây đều rút ra từ dự án thật (xem projects.ts) — không liệt kê
 * thứ chưa từng dùng. `level`: 'core' = dùng nhiều/tự tin, 'familiar' = đã dùng.
 */

export type SkillLevel = 'core' | 'familiar';

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface SkillGroup {
  id: string;
  label: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    skills: [
      { name: 'React (18/19)', level: 'core' },
      { name: 'Next.js (App Router, Server Actions)', level: 'core' },
      { name: 'TypeScript', level: 'core' },
      { name: 'Tailwind CSS', level: 'core' },
      { name: 'Zustand', level: 'core' },
      { name: 'TanStack Query', level: 'core' },
      { name: 'dnd-kit', level: 'familiar' },
      { name: 'Recharts', level: 'familiar' },
      { name: 'Vite', level: 'core' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    skills: [
      { name: 'NestJS', level: 'core' },
      { name: 'Node.js', level: 'core' },
      { name: 'Prisma', level: 'core' },
      { name: 'PostgreSQL', level: 'core' },
      { name: 'Redis', level: 'familiar' },
      { name: 'Socket.IO', level: 'familiar' },
      { name: 'BullMQ', level: 'familiar' },
      { name: 'REST API', level: 'core' },
      { name: 'JWT + Refresh', level: 'core' },
      { name: 'OAuth (Google/GitHub)', level: 'familiar' },
    ],
  },
  {
    id: 'tooling',
    label: 'Tooling & Infra',
    skills: [
      { name: 'Docker / Compose', level: 'core' },
      { name: 'GitHub Actions CI/CD', level: 'core' },
      { name: 'Vitest', level: 'core' },
      { name: 'Playwright', level: 'familiar' },
      { name: 'Zod', level: 'core' },
      { name: 'Caddy', level: 'familiar' },
      { name: 'DigitalOcean VPS', level: 'familiar' },
      { name: 'Sentry', level: 'familiar' },
      { name: 'Git', level: 'core' },
    ],
  },
  {
    id: 'ai-integrations',
    label: 'AI & Tích hợp',
    skills: [
      { name: 'OpenAI API', level: 'core' },
      { name: 'Anthropic API', level: 'core' },
      { name: 'Structured extraction (Zod)', level: 'core' },
      { name: 'AI fallback / quota', level: 'familiar' },
      { name: 'Canva API/OAuth', level: 'familiar' },
      { name: 'MoMo / VNPay', level: 'familiar' },
      { name: 'HMAC webhook verify', level: 'familiar' },
    ],
  },
];

/** Logo chạy ngang chậm ở section Kỹ năng (Mục 9). Giữ ngắn, chỉ tech "đinh". */
export const marquee: string[] = [
  'React',
  'Next.js',
  'TypeScript',
  'NestJS',
  'Prisma',
  'PostgreSQL',
  'Tailwind',
  'Docker',
  'Redis',
  'Socket.IO',
];
