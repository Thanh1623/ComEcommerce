# Phase 10: Admin Protection & Dashboard

> **Goal:** Secure the admin section and provide a unified dashboard layout.
> **Status:** ⬜ Todo

## Definition of Done
- [ ] Admin route protected via Middleware (Basic Auth).
- [ ] Admin dashboard layout created (Sidebar navigation).
- [ ] Orders moved to `/admin/orders`.
- [ ] Products moved to `/admin/products`.

## Tasks
| ID | Task | Status | Commit |
|----|------|--------|--------|
| 10.1 | Create Middleware for Admin protection | ⬜ | - |
| 10.2 | Create Admin Layout (Sidebar/Nav) | ⬜ | - |
| 10.3 | Migrate existing Admin pages | ⬜ | - |

## Dependencies
- Phase 9 completed.

## Notes
- Using environment variable `ADMIN_PASSWORD` for basic auth.
- Sidebar navigation for better usability.
