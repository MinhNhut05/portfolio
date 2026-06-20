# PLAN — Portfolio "Hạc" v1

**Trạng thái:** Approved 2026-06-16 · Session lập-plan (chưa code) · Complexity: **LARGE**
**Nguồn:** `design-system.md` (§13 Prompt 1→5) · `CLAUDE.md` · `PREREQUISITES.md` · `content/*.ts` · `docs/deployment.md`
**Scope v1:** Landing + `/projects` + `/about` + form liên hệ (footer/section). KHÔNG `/blog`, không trang `/contact` riêng, không analytics.

---

## Quyết định đã chốt (tóm tắt — chi tiết ở CLAUDE.md)
- Stack: Next.js App Router + TS + Tailwind + R3F + drei + postprocessing + lenis + framer-motion + detect-gpu · pnpm.
- i18n: **VN-first**, dựng `next-intl [locale]` sẵn (default `vi`, `localePrefix:'as-needed'` → URL VN sạch). Chưa điền EN.
- Contact: route `/api/contact` + **Resend** (Zod + honeypot + rate-limit 5/h).
- Deploy: **VPS DigitalOcean + Docker `output:standalone` + Caddy** (auto-HTTPS), domain `minhnhut.devpath.tech`, CI/CD **GitHub Actions → Docker → SSH**. Repo **public**, `.env*` trong `.gitignore`.
- Test: **Vitest nhẹ** (tier logic + form validation).
- Adaptive **3 tier A/B/C**, tôn trọng `prefers-reduced-motion`. Canvas `dynamic ssr:false` + `HeroPoster`.
- Asset: AI free-tier. **Code dùng placeholder/primitive trước**, ráp asset sau (`ASSETS.md`, `docs/asset-generation-brief.md`).

## Dự án (LOCKED — đã verify qua gh 2026-06-16)
| Dự án | Vai trò | Repo | Live | accent |
|---|---|---|---|---|
| **PMS / DevTeamOS** | featured (đinh, order 1) | `github.com/MinhNhut05/devteam-os` (PUBLIC — **bỏ badge Private**) | xác nhận nếu có | son |
| **DevPath** | featured (order 2) | **không link** (public nhưng theo ý user) | `devpathos.tech` | berry |
| **SileTravel** | featured (order 3) | `github.com/MinhNhut05/canva-schedule` | — | crane |
| **ExamRoomAllocator** | gallery `/projects` | **không có** (chỉ `sapxepdanhsach-history` archive) | `dung.devteamos.me` | gold |

---

## Patterns to Mirror (greenfield — define, không bịa)
| Category | Source | Pattern |
|---|---|---|
| Style/Naming | `content/*.ts` | typed `as const`, `export interface`, comment VN giải thích "tại sao" |
| Structure | `design-system.md §10` | `src/app · src/three · src/components · src/content · src/styles · public/assets` |
| Tokens | `design-system.md §3,§10` | CSS vars `:root` → Tailwind `theme.extend` |
| Content | `content/*.ts` | import data, KHÔNG hardcode chữ trong component |
| Ops | `docs/deployment.md` | Docker standalone + Caddy + GH Actions (sketch sẵn) |

---

## Phase 0 — Init & sửa content *(làm đầu tiên session sau)*
- **Sửa `content/projects.ts`** theo bảng LOCKED ở trên:
  - PMS: bỏ `private`/note Private; `links.repo = 'https://github.com/MinhNhut05/devteam-os'`.
  - SileTravel: `links.repo = 'https://github.com/MinhNhut05/canva-schedule'`.
  - DevPath: `links.repo = null`, `links.live = 'https://devpathos.tech'`.
  - ExamRoom: `links.repo = null`, `links.live = 'https://dung.devteamos.me'`.
- **Sửa `CLAUDE.md`**: dòng "PMS private → badge Private, không nút repo" → cập nhật (PMS public, có repo).
- `git init` + `.gitignore` (`.env*`, `node_modules`, `.next`) → tạo repo **public** qua `gh` (tên: hỏi `portfolio` vs `minhnhut.devpath.tech`).
- Scaffold Next.js (App Router, TS, Tailwind, pnpm). Cài deps:
  ```
  three @react-three/fiber @react-three/drei @react-three/postprocessing
  lenis framer-motion detect-gpu next-intl resend zod clsx
  ```
- **Validate:** `pnpm dev` chạy, trang trắng OK; `pnpm tsc --noEmit` xanh.

## Phase 1 — Foundation (≈ Prompt 1)
- `src/styles/tokens.css` (toàn bộ §3: màu, gradient, spacing, radius, type scale) → map `tailwind.config` (§10).
- `next/font`: Playfair Display, Be Vietnam Pro, JetBrains Mono. `globals.css`: body = `--grad-nebula`, chữ `--text-hi`.
- Lenis smooth-scroll provider.
- **next-intl skeleton:** `src/i18n/`, `middleware.ts`, `app/[locale]/layout.tsx`, messages `vi.json`. `setRequestLocale` + `generateStaticParams`.
- Copy `content/*.ts` → `src/content/`.
- **Validate:** font + nền nebula hiển thị; route `/` (vi) render; `tsc` xanh.

## Phase 2 — 3D & Hero (≈ Prompt 2) — *rủi ro cao nhất*
- `src/three/tier.ts` (detect-gpu + reduced-motion → A/B/C).
- `Scene.tsx` (Canvas + ScrollControls + PerformanceMonitor + AdaptiveDpr).
- `Crane.tsx` (**placeholder primitive**, slot useGLTF sau), `Silk.tsx`, `Starfield.tsx`.
- Bloom (intensity .7, threshold .35). Camera FOV 35 theo useScroll.
- Tier C: layered-PNG component (placeholder). `dynamic ssr:false` + `HeroPoster`.
- Hero overlay: eyebrow/H1 (Playfair, cụm italic)/sub/scroll-hint từ `copy.ts`.
- **Validate:** hero render 3 tier; reduced-motion → Tier C; không hydration error.

## Phase 3 — Layout & sections landing (≈ Prompt 3)
- `Nav` (sticky, mờ dần > 60px), `Eyebrow`, `SectionDivider` (hoa văn SVG placeholder).
- `About` (grid 7/5 lệch trái), `Skills` (Chip + marquee từ `skills.ts`), `Footer`.
- Reveal framer-motion (fade-up, stagger), tôn trọng reduced-motion.

## Phase 4 — Projects + trang con (≈ Prompt 4)
- `ProjectCard` (tilt ≤8° tier A/B; tier C đổi viền). Hiển thị repo/live theo bảng LOCKED.
- Featured section (3 card) + ghost "Xem tất cả →".
- `/projects` (gallery + filter tag), `/about` (story + timeline + skill đầy đủ).
- Thumbnail = placeholder; ráp screenshot thật sau (DevPath/ExamRoom chụp từ live, PMS/SileTravel user gửi).

## Phase 5 — Contact form (≈ Prompt 5 phần form)
- `ContactForm` (validate inline, thông báo từ `copy.contact.validation`).
- `app/api/contact/route.ts`: Zod + honeypot + rate-limit theo IP + Resend. Dev: log nếu thiếu `RESEND_API_KEY`.

## Phase 6 — a11y / SEO / perf
- metadata + JSON-LD `Person` + sitemap + robots + OG (dùng `site.seo`).
- `<Canvas aria-hidden>`, focus ring gold, alt từ `copy.alt`.
- Đo LCP/JS budget (chrome-devtools MCP). Mục tiêu §7.5.

## Phase 7 — Tests (Vitest nhẹ)
- `tier.ts` (chọn tier theo input mock) + form validation (Zod schema).

## Phase 8 — Deploy infra (inert tới khi có VPS)
- `Dockerfile`, `Caddyfile`, `docker-compose.yml`, `.github/workflows/deploy.yml` từ `docs/deployment.md`.
- Cần PREREQUISITES mục C/D (VPS, DNS, Resend verify, secrets).

---

## Dependencies giữa phase
`P0 → P1 → P2` · `P3,P4` song song sau P1 · `P5` độc lập · `P6,P7` sau UI · `P8` cần VPS.

## Risks
| Risk | Mức | Mitigation |
|---|---|---|
| LCP > 2.5s vì Canvas | 🔴 | `dynamic ssr:false` + HeroPoster; tier system |
| Asset hạc chưa có | 🔴 | placeholder primitive; pipeline asset chạy song song |
| R3F hydration mismatch | 🟡 | `ssr:false` mọi Canvas |
| next-intl phức tạp cho site gần như VN | 🟡 | setup tối thiểu, `localePrefix:'as-needed'` |
| Email vào spam (Resend) | 🟡 | verify domain devpath.tech (SPF/DKIM) |
| VPS/CI chưa sẵn | 🟢 | P8 inert, không chặn dev |

## Validation (chạy ở mỗi mốc)
```bash
pnpm tsc --noEmit      # type
pnpm test              # Vitest (sau P7)
pnpm build             # standalone build OK
# LCP/perf: chrome-devtools MCP trên pnpm start
```

## Open items (xác nhận sau, không chặn)
- Tên repo: `portfolio` vs `minhnhut.devpath.tech`?
- PMS / SileTravel có live demo để gắn nút "Xem live" không?
- Khi nào generate asset thật (hạc GLB + lớp PNG + hoa văn).

## Acceptance v1
- [ ] Landing + /projects + /about render đúng 3 tier, reduced-motion OK.
- [ ] 4 dự án hiển thị đúng repo/live theo bảng LOCKED.
- [ ] Form liên hệ gửi được qua Resend (hoặc log ở dev).
- [ ] `tsc` + `pnpm test` + `pnpm build` xanh.
- [ ] LCP < 2.5s, JS initial < 250KB gz, không lỗi a11y rõ ràng.
- [ ] Pattern mirror `content/*.ts`, không hardcode chữ.
