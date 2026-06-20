# PREREQUISITES — cần chuẩn bị trước/khi code

> Mọi thứ bạn cần **cung cấp** hoặc **set up** cho portfolio. Chia theo *khi nào
> cần*: có thể **bắt đầu code mà chưa cần** phần lớn — asset & deploy bổ sung sau.
> Quyết định đã chốt: VN-first (next-intl-ready) · v1 = Landing + /projects + /about ·
> VPS DigitalOcean + Docker + Caddy · CI/CD GitHub Actions · contact = route + Resend ·
> repo public · domain `minhnhut.devpath.tech` · asset free-tier.
>
> Mức độ: 🔴 blocker (không có thì kẹt) · 🟡 cần trước khi launch · 🟢 nice-to-have.

---

## A. Đã sẵn sàng trên máy (không cần làm gì)
- ✅ Node 22 · pnpm 11 · git · Chrome (cho chrome-devtools MCP khi chụp screenshot).
- ✅ Fonts: Playfair Display / Be Vietnam Pro / JetBrains Mono — nạp qua `next/font`, **không cần tải tay**.

## B. Có thể BẮT ĐẦU CODE ngay khi có (tối thiểu)
| # | Việc | Mức | Ghi chú |
|---|---|---|---|
| 1 | **GitHub repo** (public) cho portfolio | 🔴 | Tôi có thể `git init` + tạo repo qua `gh` khi bạn cho phép. Tên gợi ý: `portfolio` hoặc `minhnhut.devpath.tech`. |
| 2 | **Xác nhận URL 3 repo dự án** | 🔴 | Đang để `github.com/MinhNhut05/{devpath, canva-schedule, excel-cen}`. Đúng/sai? |
| 3 | Quyết "đồng ý tôi scaffold" | 🔴 | Khi bạn OK, tôi chạy Prompt 1→5 (design-system §13). |

> Asset hạc/lụa/hoa văn **chưa cần** để bắt đầu — code dựng với placeholder/primitive,
> ráp asset thật sau (xem `ASSETS.md`).

## C. Tài khoản & dịch vụ (cần TRƯỚC KHI LAUNCH/DEPLOY)
| # | Dịch vụ | Mức | Bạn cần làm | Free? |
|---|---|---|---|---|
| 1 | **VPS DigitalOcean** | 🟡 | Tạo droplet (Ubuntu, 1–2GB), lấy **IP** + SSH key. Cài Docker + Caddy (tôi hướng dẫn). | ~$6/mo |
| 2 | **Domain `devpath.tech`** | 🟡 | Bạn đã sở hữu? Cần quyền vào DNS để thêm record cho `minhnhut.devpath.tech`. | đã có |
| 3 | **Resend** | 🟡 | Đăng ký, tạo **API key**, **verify domain** `devpath.tech` (thêm SPF/DKIM TXT). | free ~3k mail/mo |
| 4 | **AI asset tool** | 🟡 | Tạo tài khoản **Meshy** (100cr/mo) hoặc **Rodin** (10cr) cho hạc GLB; Midjourney/LayerDiffuse cho lớp PNG (tùy). | free tier |

## D. DNS records (khi deploy)
Thêm trong quản lý DNS của `devpath.tech`:
- 🔴 `A` record: `minhnhut` → **IP của VPS**.
- 🟡 Resend (để gửi mail không vào spam): `TXT` SPF + `TXT` DKIM (Resend cấp khi verify), nên có cả `DMARC`.

## E. Secrets / env (KHÔNG commit — `.env*` vào `.gitignore`)
| Biến | Dùng cho | Lấy ở đâu |
|---|---|---|
| `RESEND_API_KEY` | gửi mail form liên hệ | dashboard Resend |
| `CONTACT_TO_EMAIL` | địa chỉ nhận mail | email của bạn (server-only, không lộ client) |
| `NEXT_PUBLIC_SITE_URL` | canonical/OG | `https://minhnhut.devpath.tech` |
| (deploy) `SSH_HOST` `SSH_USER` `SSH_KEY` | GitHub Actions → VPS | secrets của repo |

→ Chi tiết cài đặt: [`docs/deployment.md`](./docs/deployment.md).

## F. Nội dung & asset bạn CUNG CẤP
| # | Thứ | Mức | Trạng thái |
|---|---|---|---|
| 1 | **Screenshot PMS & SileTravel** (2 app không live công khai) | 🟡 | ⬜ chờ bạn gửi (DevPath + ExamRoom tôi tự chụp từ live) |
| 2 | **CV PDF** (VN; EN sau) → `public/assets/cv/` | 🟡 | ⬜ chờ bạn gửi |
| 3 | **LinkedIn URL** (nếu có) → thêm vào `site.ts` | 🟢 | ⬜ tùy |
| 4 | Avatar/headshot (nếu muốn ở About — design thiên illustration nên **không bắt buộc**) | 🟢 | ⬜ tùy |
| 5 | Hạc GLB + lớp PNG + hoa văn SVG (tạo bằng AI theo brief) | 🟡 | ⬜ xem `ASSETS.md` + `docs/asset-generation-brief.md` |

## G. Tùy chọn / hoãn
- 🟢 Analytics: **không làm v1** (có thể thêm Umami self-host sau).
- 🟢 Blog (`/blog` MDX): hoãn, không trong v1.
- 🟢 Bản EN: cấu trúc next-intl dựng sẵn, điền nội dung EN sau.
- 🟢 Blender + uv: **chỉ khi** muốn tự chỉnh model trong Blender (hiện không cần — dùng web generator).

---

## Tóm tắt: bạn cần làm gì NGAY để tôi bắt đầu code
1. ✅/✏️ Xác nhận 3 URL repo dự án (mục B-2).
2. ✅ Cho phép tôi tạo GitHub repo + `git init` (mục B-1).
3. ✅ Nói "scaffold đi" → tôi dựng Next.js theo design-system.

**Phần còn lại (VPS, Resend, domain, CV, screenshot, asset)** gom dần trong lúc tôi
code — chỉ thực sự cần khi tới bước deploy/launch. Không cái nào chặn việc bắt đầu.
