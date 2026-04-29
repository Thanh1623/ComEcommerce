# 001: Landingpage Architectural Decision

Status: Proposed

Context
- The Landingpage requires a fast, low-friction delivery path with a professional, corporate look.
- Initial scope includes a marketing landing page with lead capture placeholder and basic analytics placeholders.

Decision
- Use Static HTML/CSS/JS (no framework) for the MVP landing page.
- Rationale:
  - Simple, fast delivery and minimal maintenance.
  - Sufficient for a corporate landing page with a few sections and a CTA.
  - Leaves room to migrate to a framework later if interactivity grows.

Consequences
- No built-in component system or routing; reuse of plain HTML templates.
- Analytics integration kept as placeholders until actual keys are provided.
- Content is managed as static copy; content team will replace placeholders before launch.

Related Documents
- 2026-04-29-landingpage-design.md (design spec) 
