# Tooling setup — MCP & skills cho code 3D frontend (2026)

> Mục tiêu: trang bị cho Claude Code (và Cursor) đúng công cụ để dựng + debug
> scene React Three Fiber. **Bạn tự bật từng cái** — không có gì chạy ngầm cho tới
> khi bạn thêm thủ công (vì các package này tải từ npm, nên bật có chủ đích).
>
> Môi trường máy này: Node 22 · pnpm 11 · git ✅ · **Blender / uv: CHƯA cài**.

---

## 1. MCP servers — nên dùng

| Server | Lệnh | Làm gì | Ưu tiên |
|---|---|---|---|
| **chrome-devtools** | `npx chrome-devtools-mcp@latest` | Mở Chrome, screenshot, perf trace, đo **LCP**, đọc console. Kiểm ngân sách §7.5. | ⭐ cao |
| **threejs-devtools** | `npx -y threejs-devtools-mcp` | Soi scene R3F **realtime**: hierarchy, material, shader, light, FPS, memory (59 tool). | ⭐ cao |
| **mcp-three** | `npx mcp-three` | `gltfjsx`: GLB → component R3F (TS, instancing, tối ưu texture) + đọc cấu trúc model. | ⭐ vừa |
| **blender** *(tùy chọn)* | `uvx blender-mcp` | Claude điều khiển Blender: tạo/sửa model, material, light; sinh model qua Hyper3D Rodin; chạy Python. | cần cài thêm |

### Thêm vào Claude Code CLI (chạy trong thư mục dự án)
```bash
claude mcp add chrome-devtools -- npx chrome-devtools-mcp@latest
claude mcp add threejs-devtools -- npx -y threejs-devtools-mcp
claude mcp add mcp-three -- npx mcp-three
# kiểm tra:
claude mcp list
```

### Hoặc tạo `.mcp.json` ở gốc dự án (dán tay sau khi đã xem package)
> Lưu ý bảo mật: file này khiến các npx package trên tự chạy mỗi khi mở dự án.
> Chỉ tạo khi bạn đã rà tên package đúng và tin tưởng. Đừng commit nếu chứa secret.
```json
{
  "mcpServers": {
    "chrome-devtools": { "command": "npx", "args": ["chrome-devtools-mcp@latest"] },
    "threejs-devtools": { "command": "npx", "args": ["-y", "threejs-devtools-mcp"] },
    "mcp-three": { "command": "npx", "args": ["mcp-three"] }
  }
}
```

### Blender MCP (chỉ khi muốn tự dựng/chỉnh hạc trong Blender)
Cần **Blender ≥ 3.0** + **uv** (cài bằng installer chính thức, *không* `pip install uv`).
```bash
# 1) cài uv (Linux/macOS):
curl -LsSf https://astral.sh/uv/install.sh | sh
# 2) cài Blender (Fedora):
sudo dnf install blender        # hoặc tải từ blender.org / flatpak
# 3) thêm server:
claude mcp add blender -- uvx blender-mcp
# 4) trong Blender: cài addon blender-mcp (xem repo) rồi "Connect to MCP server".
```
Repo: github.com/ahujasid/blender-mcp. Nếu lỗi spawn do PATH, dùng full path của `uvx` (`which uvx`).

---

## 2. Skills — nên cài

| Skill | Vì sao | Ghi chú |
|---|---|---|
| **frontend-design** (Anthropic) | Chống "AI slop", giữ thẩm mỹ riêng — đúng mục tiêu "giảm AI-generated feel" của design-system §11. | Cài vào `~/.claude/skills/` hoặc qua marketplace. |
| **React Three Fiber** (skill cộng đồng) | Pattern R3F chuẩn: `useFrame`, Suspense, instancing, perf. | Có nhiều bản trên marketplace; chọn 1. |

Cài skill: tải skill (thư mục có `SKILL.md`) vào `~/.claude/skills/<name>/`, hoặc dùng
marketplace của Claude Code. Kiểm bằng cách gõ `/` xem skill có hiện không.

---

## 3. Khi nào dùng cái gì (luồng thực tế)

1. **Tạo asset** → `docs/asset-generation-brief.md` (Rodin/Meshy/LayerDiffuse), hoặc Blender MCP.
2. **Nhúng model** → `mcp-three` (`get-model-structure` rồi `gltfjsx`) ra component R3F.
3. **Dựng scene** → skill React Three Fiber + bám `CLAUDE.md`.
4. **Debug scene chạy** → `threejs-devtools` (sao FPS tụt? material sai? draw call?).
5. **Đo LCP / perf trang** → `chrome-devtools` (trace, screenshot, console).

---

## 4. Nguồn
- chrome-devtools-mcp — byteiota.com/chrome-devtools-mcp-debug-browser-with-ai-agents-2026
- threejs-devtools-mcp — github.com/DmitriyGolub/threejs-devtools-mcp
- mcp-three — github.com/basementstudio/mcp-three
- blender-mcp — github.com/ahujasid/blender-mcp
- frontend-design skill — claudemarketplaces.com/skills/anthropics/skills/frontend-design
