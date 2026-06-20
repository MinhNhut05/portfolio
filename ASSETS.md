# ASSETS.md — Manifest & Checklist

> Mọi asset cần cho portfolio: tên file, đường dẫn, kích thước, định dạng, lớp z,
> hệ số parallax, tier dùng, trạng thái. Pipeline chi tiết: design-system §12.
> Prompt tạo bằng AI: [`docs/asset-generation-brief.md`](./docs/asset-generation-brief.md).
> Mood gốc: 4 ảnh trong [`./picture/`](./picture/) (8Wonder / Enterspace).
>
> **Trạng thái:** ⬜ chưa có · 🟡 nháp/đang sửa · ✅ xong & tối ưu.
> Tất cả đặt dưới `public/assets/` của dự án Next.js.

---

## 1. Hạc 3D — GLB (Tier A / B)

| File | Đường dẫn | Yêu cầu | Trạng thái |
|---|---|---|---|
| `crane.glb` | `public/assets/glb/` | < 1.5MB sau **Draco**; texture ≤1024² (mobile 512²); origin tâm ngực; +Y lên; scale ~1 unit | ⬜ |
| `crane-low.glb` | `public/assets/glb/` | Bản low-poly cho Tier B (Draco) | ⬜ |

- Material: trắng-bạc chuyển `--crane-200 (#C1C7D2)` → `--crane-500 (#4C6079)`, fresnel viền sáng.
- Tách node "wing" nếu muốn flap bằng bone/morph; nếu không, animate cả model rất nhẹ.
- Pipeline: AI tạo (Rodin/Meshy) → Blender chỉnh/giảm poly → `gltfjsx --transform` (Draco+WebP+1024²+prune).

## 2. Hạc 2.5D — PNG nhiều lớp (Tier C + dùng lại cho parallax)

Cùng canvas **2400×1500 @2x**, **nền trong suốt**, mép feather mềm (chừa chỗ cho bloom).
Xuất kèm **WebP/AVIF** (trùng tên, khác đuôi) + PNG fallback.

| z | File | Nội dung | Parallax | Trạng thái |
|---|---|---|---|---|
| 00 | `crane/00_nebula.png` | hậu cảnh nebula (hoặc để CSS lo) | 0.02 | ⬜ |
| 10 | `crane/10_stars.png` | bụi sao (hoặc particle R3F) | 0.04 | ⬜ |
| 20 | `crane/20_silk_back.png` | lụa đỏ sau hạc | 0.06 | ⬜ |
| 30 | `crane/30_crane.png` | **HẠC** (chủ thể) | 0.08 | ⬜ |
| 40 | `crane/40_silk_front.png` | lụa đỏ trước hạc | 0.10 | ⬜ |
| 50 | `crane/50_fan.png` | quạt / ô giấy tiền cảnh | 0.11 | ⬜ |
| 60 | `crane/60_dust.png` | đốm sáng tiền cảnh | 0.12 | ⬜ |

Đường dẫn gốc: `public/assets/png/crane/`.

## 3. Lụa & quạt (motif phụ)

| File | Đường dẫn | Dùng | Trạng thái |
|---|---|---|---|
| `silk/ribbon-*.png` (2–3 dải) | `public/assets/png/silk/` | divider lụa nối section, hover | ⬜ |
| `fans/fan-*.png` | `public/assets/png/fans/` | accent góc, loading | ⬜ |

Màu lụa = `--grad-silk` (linear `#6E2C3D → #B73D50 → #CA7274`).

## 4. Hoa văn & icon — SVG

| File | Đường dẫn | Yêu cầu | Trạng thái |
|---|---|---|---|
| `pattern-corner.svg` | `public/assets/svg/` | 1 góc, ghép 4 góc khung ảnh/card | ⬜ |
| `pattern-border.svg` | `public/assets/svg/` | cạnh **tileable** cho divider/khung bất kỳ size | ⬜ |
| `logo-crane.svg` | `public/assets/svg/` | logo hạc cách điệu (Nav), đơn sắc vàng | ⬜ |
| `instruments/*.svg` | `public/assets/svg/instruments/` | đàn nguyệt, tỳ bà, nhị, tranh — stroke 1.5px, `currentColor` | ⬜ |
| `social/{github,linkedin,mail}.svg` | `public/assets/svg/social/` | icon line 1.5px, `currentColor` | ⬜ |

- Icon: stroke **1.5px**, bo tròn, `currentColor` để đổi màu bằng CSS. Tránh icon đặc khối.
- Tối ưu bằng **SVGO** trước khi commit.

## 5. Poster & OG (LCP + share)

| File | Đường dẫn | Dùng | Trạng thái |
|---|---|---|---|
| `hero-poster.webp` | `public/assets/og/` | ảnh tĩnh hero lúc Canvas chưa hydrate (LCP) | ⬜ |
| `og-cover.webp` | `public/assets/og/` | 1200×630 — og:image / share | ⬜ |
| `favicon` (16/32/180/512) | `public/` | favicon + apple-touch + maskable | ⬜ |

## 6. Project thumbnails

Khung hoa văn bao quanh; tỉ lệ ~16:10; WebP. Khớp `thumbnail` trong `content/projects.ts`.

| File | Dự án | Trạng thái |
|---|---|---|
| `projects/pms-devteamos.webp` | DevTeamOS — PMS | ⬜ |
| `projects/devpath.webp` | DevPath — path-learn | ⬜ |
| `projects/siletravel.webp` | SileTravel — Canva Schedule | ⬜ |
| `projects/examroom-allocator.webp` | ExamRoomAllocator | ⬜ |

> Gợi ý: thumbnail dự án có thể là **screenshot thật** của app (đẹp + trung thực)
> đặt trong khung hoa văn, thay vì ảnh AI. PMS private → screenshot mờ logo nhạy cảm.

---

## Checklist xuất file (design-system §12.4 mở rộng)
- [ ] PNG layer trong suốt, đặt tên theo z (00→60), kèm WebP/AVIF.
- [ ] `crane.glb` < 1.5MB (Draco), texture ≤1024²; có bản `crane-low.glb`.
- [ ] SVG hoa văn (góc + cạnh tileable) + icon `currentColor`, đã chạy SVGO.
- [ ] `hero-poster.webp` + `og-cover.webp` (1200×630) + favicon set.
- [ ] 4 project thumbnails khớp tên trong `projects.ts`.
- [ ] Kiểm tổng dung lượng asset hero không phá ngân sách LCP < 2.5s.

## Palette nhanh để feed cho tool tạo ảnh
`#0A0608` ink · `#6B2E73` violet nebula · `#5E2446` berry · `#B73D50` đỏ son ·
`#CA7274` rose · `#C9A24E` vàng khung · `#B37041` đồng · `#C1C7D2` bạc hạc ·
`#4C6079` slate hạc · `#F3E7E9` chữ.
