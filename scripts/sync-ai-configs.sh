#!/bin/bash

# ============================================================
# sync-ai-configs.sh — Regenerate AI adapter files
# Run this after making changes to AGENTS.md structure
# ============================================================

set -e

echo "🔄 Syncing AI adapter files..."

# Check which adapter files exist and remind user to update them
ADAPTERS=()

[ -f "CLAUDE.md" ] && ADAPTERS+=("CLAUDE.md")
[ -f ".cursorrules" ] && ADAPTERS+=(".cursorrules")
[ -f ".windsurfrules" ] && ADAPTERS+=(".windsurfrules")
[ -f ".github/copilot-instructions.md" ] && ADAPTERS+=(".github/copilot-instructions.md")

echo ""
echo "📝 Active adapter files:"
for adapter in "${ADAPTERS[@]}"; do
  echo "  - $adapter"
done

echo ""
echo "ℹ️  Adapter files are thin references to AGENTS.md."
echo "   They rarely need updating unless you add tool-specific rules."
echo ""
echo "   AGENTS.md is the source of truth — update that file."
echo ""
echo "✅ Sync complete."
