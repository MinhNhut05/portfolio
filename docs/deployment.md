# Deployment & ops — VPS + Docker + Caddy + GitHub Actions + Resend

> Bản thiết kế ops cho portfolio (deploy lên VPS riêng, không Vercel). Đây là
> **kế hoạch + sketch** để tham chiếu khi build — code thật tạo lúc scaffold.
> Domain: `minhnhut.devpath.tech`. Quyết định: design-system + `CLAUDE.md`.

## Kiến trúc
```
GitHub push (main)
  └─ GitHub Actions: build Docker image (Next.js output:standalone) → push registry
        └─ SSH vào VPS → pull image → docker compose up -d
              └─ Caddy reverse-proxy :443 (auto HTTPS) → Next.js container :3000
```

## 1. Next.js cấu hình cho Docker
`next.config.ts`:
```ts
const nextConfig = {
  output: 'standalone', // image nhỏ, copy .next/standalone là chạy
  images: { formats: ['image/avif', 'image/webp'] },
  // next-intl plugin sẽ wrap ở đây khi thêm i18n
};
```

## 2. Dockerfile (multi-stage, sketch)
```dockerfile
# build
FROM node:22-alpine AS builder
WORKDIR /app
RUN corepack enable
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
# run
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

## 3. Caddy (auto HTTPS — điểm khoe ops)
`Caddyfile` trên VPS:
```
minhnhut.devpath.tech {
    reverse_proxy localhost:3000
    encode zstd gzip
    header {
        Strict-Transport-Security "max-age=31536000"
        X-Content-Type-Options "nosniff"
        Referrer-Policy "strict-origin-when-cross-origin"
    }
}
```
Caddy tự xin Let's Encrypt cert khi DNS `A: minhnhut → IP VPS` đã trỏ đúng.

## 4. docker-compose trên VPS (sketch)
```yaml
services:
  web:
    image: ghcr.io/<owner>/portfolio:latest
    restart: unless-stopped
    ports: ["127.0.0.1:3000:3000"]
    env_file: .env.production   # KHÔNG commit file này
```

## 5. GitHub Actions (sketch `.github/workflows/deploy.yml`)
```yaml
on: { push: { branches: [main] } }
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/build-push-action@v6
        with: { push: true, tags: ghcr.io/${{ github.repository }}:latest }
        # cần đăng nhập ghcr bằng GITHUB_TOKEN
      - name: Deploy over SSH
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd ~/portfolio && docker compose pull && docker compose up -d
```
Secrets repo cần: `SSH_HOST` `SSH_USER` `SSH_KEY` (+ GHCR dùng `GITHUB_TOKEN` sẵn).

## 6. Contact form + Resend
- Route `app/api/contact/route.ts`: validate bằng **Zod**, **honeypot** field, **rate-limit** theo IP (5/giờ), rồi gọi Resend.
```ts
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);
await resend.emails.send({
  from: 'Portfolio <noreply@devpath.tech>',   // domain đã verify ở Resend
  to: process.env.CONTACT_TO_EMAIL!,
  replyTo: data.email,
  subject: `Liên hệ từ ${data.name}`,
  text: data.message,
});
```
- **Verify domain `devpath.tech`** trong Resend (thêm SPF/DKIM TXT) để mail không vào spam.
- `RESEND_API_KEY`, `CONTACT_TO_EMAIL` chỉ ở server (env), không vào client bundle.

## 7. Checklist deploy
- [ ] VPS có Docker + Caddy chạy; mở 80/443.
- [ ] DNS `A: minhnhut.devpath.tech → IP VPS` đã trỏ.
- [ ] `.env.production` trên VPS có RESEND_API_KEY + CONTACT_TO_EMAIL.
- [ ] Resend đã verify domain (mail test gửi được, không spam).
- [ ] GitHub secrets: SSH_HOST/USER/KEY.
- [ ] Push main → Actions xanh → site live HTTPS.
- [ ] Lighthouse: LCP < 2.5s, không lỗi a11y (xem ngân sách design-system §7.5, §11).

## Nguồn
- next-intl App Router — intlpull.com/blog/next-intl-complete-guide-2026
- Resend Next.js — resend.com/docs/send-with-nextjs
- Caddy reverse_proxy — caddyserver.com/docs/quick-starts/reverse-proxy
