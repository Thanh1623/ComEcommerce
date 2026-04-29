# Project: Landingpage

> 🧠 File này là source of truth cho MỌI AI coding agent.
> Human developers: đọc `docs/ONBOARDING.md` trước.

---

## ▶ AUTO-START — Đọc section này TRƯỚC

> **🚨 MANDATORY NAVIGATION RULE:**
> 1. KHÔNG BAO GIỜ được tự ý đoán mò file hoặc grep lùng sục lung tung.
> 2. Dùng **code-review-graph MCP tools** để navigate codebase:
>    - `get_minimal_context_tool` — Lấy đúng files cần thiết cho task hiện tại
>    - `get_impact_radius_tool` — Khi sửa file, biết files nào bị ảnh hưởng
>    - `get_architecture_overview_tool` — Hiểu kiến trúc tổng quan
>    - `semantic_search_nodes_tool` — Tìm function/class theo tên
> 3. Nếu MCP không khả dụng → fallback đọc `context/repo-map.md`

Khi user nói bất kỳ thứ gì ("bắt đầu", "start", "tiếp tục", hoặc bất kỳ prompt nào),
hãy tự detect trạng thái project và hành động:

### State Detection:

1. Kiểm tra `docs/specs/` — có file nào (ngoài .gitkeep) không?
   - **KHÔNG** → Project chưa plan → **Chạy Phase 0** (xem `docs/phases/phase-0.md`)
   - **CÓ** → Tiếp bước 2

2. Kiểm tra `tasks/todo.md` — có task "In Progress" hoặc "🔥" không?
   - **CÓ** → **Tiếp tục task đó**
   - **KHÔNG** → Đọc mục "Current Phase" bên dưới → tạo tasks cho phase tiếp theo

3. Đọc `docs/knowledge/INDEX.md` trước khi code — tránh lỗi cũ.

### Phase 0 Auto-Flow:
Nếu project chưa plan, TỰ ĐỘNG bắt đầu:
1. Đọc `docs/BRIEF.md`
2. Hỏi clarify từng câu (ưu tiên multiple choice)
3. Propose 2-3 approaches + recommend
4. Viết spec → `docs/specs/YYYY-MM-DD-design.md`
5. Tạo ADRs → `docs/decisions/`
6. Chia phases phù hợp project → `docs/phases/phase-1..N.md`
7. Tạo tasks Phase 1 → `tasks/todo.md`
8. Update file này (Stack, Folder Structure, Current Phase)
9. Hỏi user approve

KHÔNG cần user ra lệnh cụ thể. Chỉ cần nói "bắt đầu".

<HARD-GATE>
KHÔNG viết code, KHÔNG scaffold, KHÔNG implement cho đến khi có file spec trong docs/specs/ và user đã approve.
</HARD-GATE>

---

## Project Context

Đọc theo thứ tự để hiểu project:
1. `docs/BRIEF.md` — Project overview + ý tưởng ban đầu
2. `docs/ARCHITECTURE.md` — Kiến trúc hệ thống
3. `docs/decisions/` — Tại sao chọn tech stack này
4. `docs/knowledge/INDEX.md` — Lessons learned, tránh lỗi cũ

---

## Stack
- Static HTML/CSS/JavaScript (Phase 1 MVP)

## Folder Structure
- docs/specs/
- docs/decisions/
- tasks/
- memory/

---

## Coding Rules

- Test viết ngay sau mỗi task — không để cuối
- 1 commit = 1 task — message: `feat/fix/test/chore: [mô tả]`
- Error handling cho mọi async function
- Không sửa files ngoài danh sách cho phép trong task
- Đọc `docs/knowledge/INDEX.md` trước khi code feature liên quan

## Skills (AI Auto-Activate)

> **Quy tắc ưu tiên:** `skills/` (template) > `~/.gemini/antigravity/skills/` (global)
> Nếu cùng 1 skill có ở cả 2 nơi → **BẮT BUỘC dùng bản template**.

Đọc `skills/[tên-skill]/SKILL.md` trước khi thực hiện task thuộc danh mục tương ứng:

| Trigger | Skill | File |
|---------|-------|------|
| Trước khi code feature mới | `brainstorming` | `skills/brainstorming/SKILL.md` |
| Khi user yêu cầu plan/checklist | `concise-planning` | `skills/concise-planning/SKILL.md` |
| Khi viết async, API, DB code | `error-handling-patterns` | `skills/error-handling-patterns/SKILL.md` |
| Khi viết tests | `testing-patterns` | `skills/testing-patterns/SKILL.md` |
| Khi viết README, docs | `documentation-templates` | `skills/documentation-templates/SKILL.md` |
| Khi build UI/UX | `ui-ux-pro-max` | `skills/ui-ux-pro-max/SKILL.md` |

## Learned Rules
<!-- AI tự thêm rules đã promote từ docs/knowledge/ vào đây -->
[Chưa có — sẽ được thêm khi knowledge được promote]

---

-## Phase & Task

- **Current Phase:** Phase 1 — Landingpage MVP (Phase 0 planning completed)
- **Tasks:** xem `tasks/todo.md`
- **Phase details:** xem `docs/phases/phase-0.md`

---

## Memory & Knowledge

### Memory (riêng tư — gitignored)
Sau mỗi session, ghi notes vào `memory/YYYY-MM-DD.md`:
- Tasks completed + AI tool used
- Issues encountered
- Key files changed
- Next steps

### Knowledge (shared — committed)
Khi phát hiện bug/pattern đáng nhớ:
1. Tạo `docs/knowledge/YYYY-MM-DD-[topic].md` (dùng `docs/knowledge/TEMPLATE.md`)
2. Update `docs/knowledge/INDEX.md`
3. Nếu pattern cực quan trọng → thêm vào mục "Learned Rules" ở trên

### Decisions (shared — committed)
Khi có architecture/tech decision quan trọng:
- Tạo `docs/decisions/NNN-[topic].md` (dùng `docs/decisions/TEMPLATE.md`)

---

## Codebase Navigation

### Primary: Code-Review-Graph (MCP — tự động)
```bash
# Cài đặt (1 lần)
pip install code-review-graph && code-review-graph install

# Build lần đầu
code-review-graph build

# Update (tự động qua git hook, hoặc thủ công)
code-review-graph update
```
Sau khi build, AI tự động dùng MCP tools để navigate — không cần đọc file thủ công.

### Fallback: Repomix (khi chưa cài code-review-graph)
```bash
./scripts/generate-map.sh     # Structural map (compress)
./scripts/generate-context.sh  # Full codebase export
```

### Export (cho AI trên web: ChatGPT, Claude Web)
```bash
npx repomix                    # Full code → context/repomix-output.md
npx repomix --compress         # Khung xương → tiết kiệm token
```
