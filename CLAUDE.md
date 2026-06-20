# CLAUDE.md — Portfolio "Hạc" (Vietnamese Neo-Traditional Luxe · 3D)

> Quy tắc dự án cho mọi session Claude Code / Cursor. **Nguồn sự thật đầy đủ là
> [`design-system.md`](./design-system.md)** — file này là bản rút gọn để bám đúng
> mà không phải đọc lại toàn bộ. Khi mâu thuẫn, `design-system.md` thắng.

## Dự án là gì
Portfolio cá nhân của **MinhNhut** — fullstack dev (React/JS) ở Sài Gòn. Dựng như
một *sân khấu kể chuyện*: con hạc trắng sải cánh giữa lụa đỏ + bụi sao, nền tím vũ
trụ. Mục tiêu: **ấn tượng thị giác mạnh + tin cậy tay nghề**, không CTA ép.

## Stack (đã chốt)
- **Next.js (App Router) + TypeScript + Tailwind**. Canvas R3F **dynamic import `{ ssr:false }`**.
- 3D: `@react-three/fiber` `@react-three/drei` `@react-three/postprocessing`.
- Scroll: `lenis`. 2D motion: `framer-motion`. Năng lực máy: `detect-gpu`.
- i18n: **next-intl** — launch VN, dựng cấu trúc `[locale]` sẵn để thêm EN sau (không refactor).
- Contact: **route Next.js + Resend** (tự build, không service no-backend). Test: **Vitest** (logic + form).
- Package manager: **pnpm**. Blog: **hoãn** (không có trong v1).

## Phạm vi v1 & Deploy (chốt 2026-06-15)
- **v1 = Landing + `/projects` + `/about`** + form liên hệ (đặt ở section/footer). Chưa làm `/blog`; không cần trang `/contact` riêng.
- **Deploy: VPS riêng (DigitalOcean) + Docker (`output:'standalone'`) + Caddy reverse-proxy (auto HTTPS).** Domain **`minhnhut.devpath.tech`**.
- **CI/CD: GitHub Actions** → build Docker image → deploy qua SSH. Repo **public** → **KHÔNG commit secret** (`.env*` trong `.gitignore`).
- Việc bạn cần chuẩn bị: **[`PREREQUISITES.md`](./PREREQUISITES.md)**. Chi tiết ops + env: **[`docs/deployment.md`](./docs/deployment.md)**.

## Cấu trúc thư mục mục tiêu
```
src/app/        # routes: / /projects /about /blog /contact
src/three/      # Scene, Crane, Silk, Starfield, tier.ts
src/components/ # Nav, Hero, ProjectCard, Divider, Footer, Eyebrow…
src/content/    # ← LẤY TỪ /content (site.ts copy.ts projects.ts skills.ts)
src/styles/     # tokens.css, globals.css
public/assets/  # glb/ png/crane/ silk/ svg/ projects/ og/  (xem ASSETS.md)
```
Khi scaffold: **copy nội dung từ `/content/*.ts`** (đã điền sẵn data thật) vào `src/content/`.

## Không-thương-lượng
1. **Dark-first.** Nền luôn `--grad-nebula` hoặc `--ink-900`. **Không bao giờ nền sáng.**
2. **Bám token.** Dùng đúng CSS variables / Tailwind token ở §3, §10 design-system.
   Đừng chế màu/spacing mới. Accent đỏ son `--son-500` dùng tiết chế; vàng `--gold-500`
   chỉ cho label/đường mảnh/hoa văn — **không** cho khối chữ dài.
3. **Typography:** Display = Playfair Display; Body/UI = Be Vietnam Pro; code = JetBrains
   Mono. **Phải đủ dấu tiếng Việt.** Nạp qua `next/font`. ≤ 2 độ đậm / khối.
4. **Hoa văn chỉ ở viền** (khung/divider/góc card). Ruột nội dung giữ sạch.
5. **Adaptive 3 tier** (bắt buộc, xem `tier.ts` §7.2):
   - A Cinematic (desktop khỏe): GLB hạc + particle 2–3k + Bloom + tilt.
   - B Lite (mobile khỏe / GPU yếu): GLB low-poly Draco, không postprocessing, particle ≤600.
   - C Still/a11y (`prefers-reduced-motion` hoặc máy yếu): **2.5D layered-PNG** hạc tĩnh, CSS gradient, chỉ fade/slide.
6. **`prefers-reduced-motion` → rơi về Tier C.** Bắt buộc.
7. **Chuyển động chậm, có hồn** (hạc thở, lụa trôi). Không giật, không bay loạn.

## Ngân sách hiệu năng (đo, đừng đoán)
- 60fps desktop, ≥45fps mobile tier B. **LCP < 2.5s** (hero text + poster render ngay, Canvas hydrate sau).
- JS initial **< 250KB gz** (Canvas/scene lazy). GLB hạc **< 1.5MB** sau Draco, texture ≤1024² (mobile ≤512²).
- `dpr={[1, tier==='A'?2:1.5]}`; `frameloop="demand"` khi tĩnh / tab ẩn.

## A11y (bắt buộc)
- `<Canvas aria-hidden>` + có text tương đương ngoài canvas. Đừng dồn thông tin chỉ vào 3D.
- Focus ring `--gold-500` rõ trên **mọi** control. Menu mobile bẫy focus.
- Alt ảnh mô tả thật (xem `copy.alt`). `loading="lazy"`, `next/image`.

## Nội dung & danh tính
- Data thật ở **`/content/*.ts`** — đừng hardcode chữ trong component, import từ đó.
- Tên hiển thị: **MinhNhut**. GitHub công khai; **email KHÔNG render dạng text**
  (form POST `/api/contact`, server đọc `CONTACT_TO_EMAIL` từ env).
- Tông About: **builder tự tin** — nhấn sản phẩm đã ship, không bịa kinh nghiệm.
- 3 dự án featured (landing): **PMS (đinh) · DevPath · SileTravel**. PMS public (repo `devteam-os`); DevPath chỉ gắn live `devpathos.tech` (không gắn repo theo ý user). ExamRoomAllocator ở gallery `/projects` (repo private `excel-cen` → không gắn repo).
- Có nút **Tải CV** (PDF ở `public/assets/cv/`, user cung cấp; VN trước, EN sau).
- Thumbnail dự án = **screenshot thật** (DevPath/ExamRoom chụp từ live; PMS/SileTravel user gửi).

## Assets
- Tất cả asset cần + tên/kích thước/định dạng/trạng thái: **[`ASSETS.md`](./ASSETS.md)**.
- Tạo bằng AI (web): hạc GLB (Rodin/Meshy), lớp PNG (Midjourney/LayerDiffuse), hoa văn SVG.
  Prompt sẵn: **[`docs/asset-generation-brief.md`](./docs/asset-generation-brief.md)**.
- 4 ảnh tham chiếu mood gốc (8Wonder/Enterspace): thư mục `./picture/`.

## Công cụ (MCP/skill) — xem `docs/tooling-setup.md`
- `chrome-devtools-mcp` — screenshot, perf trace, kiểm LCP.
- `threejs-devtools-mcp` — soi scene R3F realtime (hierarchy, material, FPS).
- `mcp-three` — GLB→JSX (`gltfjsx`) + đọc cấu trúc model.
- Skill `frontend-design` (Anthropic) — chống "AI slop", giữ thẩm mỹ.
- `blender-mcp` (tùy chọn, cần cài Blender + uv — hiện CHƯA cài).

## TRÁNH (mùi "AI-generated")
flat startup gradient · neon cyber · glassmorphism generic · emoji/sticker · vui nhộn ·
"AI cream + serif + terracotta" mặc định · hiệu ứng rải rác vô hồn · copy chung chung.

## Cách làm việc trong repo này
- Thay đổi nhỏ nhất đúng yêu cầu; theo style sẵn có; không thêm abstraction thừa.
- Chỗ nội dung thật còn thiếu: dùng placeholder `[...]` rõ ràng, **hỏi lại nếu thiếu asset**.
- Khi build theo từng phần: theo thứ tự **Prompt 1 → 5** ở §13 design-system.
