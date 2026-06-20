# Asset generation brief — prompt dán-là-chạy (2026)

> Bộ prompt + pipeline để tạo toàn bộ asset bằng web tool AI (đã chốt: **Meshy /
> Rodin** cho 3D, **Midjourney / LayerDiffuse** cho PNG lớp). Tên file & kích thước
> bám [`ASSETS.md`](../ASSETS.md). Mood gốc: 4 ảnh trong [`../picture/`](../picture/)
> — upload chúng làm *image reference* khi tool hỗ trợ để khớp đúng phong cách.
>
> **Style chung (dán kèm mọi prompt):**
> *Vietnamese neo-traditional luxe, theatrical stage lighting, deep warm-black
> background, cosmic violet nebula, vermilion-red silk, gold-copper lacquer
> ornament, mother-of-pearl inlay, cinematic, elegant, sacred, high contrast.*
>
> **Palette (ép màu):** `#0A0608` `#6B2E73` `#5E2446` `#B73D50` `#CA7274`
> `#C9A24E` `#B37041` `#C1C7D2` `#4C6079` `#F3E7E9`.
>
> **Negative chung:** *flat startup gradient, neon cyberpunk, glassmorphism,
> emoji, sticker, cartoon mascot, cream + terracotta, watermark, text, logo, lowres.*

---

## A. Hạc 3D → `crane.glb` (Meshy hoặc Rodin)

**Cách 1 — image-to-3D (khuyến nghị, bám ảnh tham chiếu):**
1. Lấy ảnh hạc cận cảnh: `picture/a7c04…(Edited 2).jpg` (hạc cánh trắng→slate, lụa đỏ).
2. Upload vào **Meshy "Image to 3D"** (hoặc Rodin) → bật "quad topology", "PBR".
3. Prompt phụ:
```
A majestic white crane (egret) with wings fully spread, elegant long neck curved,
silver-white plumage transitioning to cool slate-blue at the wingtips, subtle
iridescent sheen, fresnel rim light. Clean neutral pose, centered, no background.
Stylized-realistic, suitable for a hero 3D web scene.
```
4. Export **GLB**. Mục tiêu < 1.5MB sau tối ưu (xem pipeline §D).

**Cách 2 — text-to-3D (nếu không bám ảnh):** dùng đúng prompt trên + style chung.

> Sau khi có model: chỉnh trong Blender nếu cần (origin tâm ngực, +Y lên, scale ~1
> unit; tách node *wing* nếu muốn flap). Hoặc dùng **Blender MCP** để Claude tự chỉnh.

---

## B. Lớp PNG 2.5D (Midjourney v7 / LayerDiffuse — nền trong suốt)

> **LayerDiffuse** (qua Runware) sinh ảnh **có alpha sẵn** trong 1 bước → lý tưởng cho
> từng lớp. Midjourney: thêm `--no background` rồi tách nền, hoặc generate trên nền
> đen phẳng và remove. Canvas **2400×1500**, mép feather mềm.

**30_crane.png (chủ thể):**
```
A single white-silver crane with wings spread wide, neck gracefully curved,
wingtips fading to slate-blue, soft fresnel glow on the edges, transparent
background, no scene, painterly-realistic, Vietnamese neo-traditional luxe.
```
**20_silk_back.png / 40_silk_front.png (lụa đỏ):**
```
Flowing vermilion-red silk ribbon, long sweeping S-curves, soft satin highlights,
gradient #6E2C3D to #B73D50 to #CA7274, semi-translucent edges, transparent
background, no object, elegant, motion-frozen.
```
**00_nebula.png (hậu cảnh — hoặc để CSS gradient):**
```
Deep cosmic nebula, violet #6B2E73 blending into berry #5E2446 and warm-black
#0A0608, soft volumetric clouds, faint star dust, theatrical depth, no subject.
```
**10_stars.png (bụi sao):**
```
Scattered fine star dust and tiny glowing particles on fully transparent
background, varied sizes, soft bloom, no nebula, no subject.
```
**50_fan.png (quạt/ô giấy):** tham chiếu `picture/51f6a…(Edited).jpg` (quạt giấy đỏ-hồng).
```
A traditional Vietnamese paper hand-fan / oil-paper parasol, vermilion and rose
tones, delicate ribs, partly open, soft glow, transparent background, foreground
prop, painterly.
```
**60_dust.png:** đốm sáng bokeh nhỏ, alpha, dùng làm tiền cảnh.

> Xuất mỗi lớp kèm **WebP/AVIF** (trùng tên, khác đuôi). Đặt tên theo z trong ASSETS.md.

---

## C. Hoa văn & icon SVG

Tool ảnh AI **không** xuất SVG sạch tốt. Hai đường:
1. **Vẽ vector** (Figma/Illustrator) rồi tối ưu SVGO — kiểm soát tốt nhất, khuyến nghị cho `pattern-corner` + `pattern-border` (cần tileable chính xác).
2. **AI → trace:** generate hoa văn PNG đơn sắc rồi vectorize (Illustrator Image Trace / `vtracer`), dọn path.

Prompt PNG hoa văn để trace:
```
Symmetrical Vietnamese lacquer ornament motif, single corner piece, fine gold
line-art on transparent background, thin 1.5px strokes, mother-of-pearl inlay
style, ornate but clean, monochrome gold #C9A24E, no fill blocks, vector-friendly.
```
Icon nhạc cụ / social: vẽ tay stroke **1.5px**, `currentColor`. Tránh icon đặc khối.

---

## D. Pipeline tối ưu (sau khi có file thô)

**GLB → web-ready:**
```bash
npx gltfjsx crane.glb --transform --types
#  --transform: Draco + WebP + resize 1024² + dedupe + prune (giảm 70–90%)
#  → ra crane-transformed.glb + Crane.tsx (component R3F)
```
Hoặc dùng MCP `mcp-three` (`gltfjsx` tool) để Claude làm trong phiên.

**PNG → WebP/AVIF:**
```bash
npx @squoosh/cli --webp '{"quality":82}' --avif '{"cqLevel":30}' public/assets/png/crane/*.png
```
**SVG:**
```bash
npx svgo -f public/assets/svg -r
```
**Poster hero (`hero-poster.webp`):** chụp 1 frame đẹp của scene (Tier A) hoặc render
lớp PNG ghép lại → export WebP. Dùng làm `loading` của Canvas + nền trước khi hydrate (LCP).

---

## E. Thứ tự đề xuất (để có cái nhìn sớm)
1. `00_nebula` + `10_stars` (hoặc CSS) → ra ngay được nền hero.
2. `30_crane` (PNG) → đủ dựng Tier C + làm `hero-poster`.
3. `crane.glb` → nâng cấp Tier A/B.
4. lụa + quạt → divider & chiều sâu.
5. hoa văn SVG → khung/divider/card.
6. project thumbnails (ưu tiên **screenshot thật** của app, đặt trong khung hoa văn).
