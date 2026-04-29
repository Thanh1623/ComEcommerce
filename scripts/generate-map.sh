#!/bin/bash

# ============================================================
# generate-map.sh — Build/Update Code Knowledge Graph
# Uses code-review-graph (Tree-sitter + MCP)
# Fallback: Repomix compress nếu chưa cài code-review-graph
# ============================================================

set -e

echo "🗺️ Building Code Knowledge Graph..."

# Check if code-review-graph is installed
if command -v code-review-graph &> /dev/null; then
  # Check if graph already exists → incremental update
  if [ -d ".code-review-graph" ]; then
    echo "📡 Incremental update (only changed files)..."
    code-review-graph update
  else
    echo "🔨 First build (full parse)..."
    code-review-graph build
  fi

  echo ""
  echo "✅ Knowledge Graph updated: .code-review-graph/"
  echo "📊 Stats:"
  code-review-graph status 2>/dev/null || true
  echo ""
  echo "AI sẽ tự động dùng graph qua MCP tools."

# Fallback: dùng Repomix compress
else
  echo "⚠️  code-review-graph chưa cài. Dùng Repomix compress fallback."
  echo "   Cài đặt: pip install code-review-graph && code-review-graph install"
  echo ""

  if ! command -v npx &> /dev/null; then
    echo "❌ npx cũng không có. Cài Node.js hoặc code-review-graph."
    exit 1
  fi

  npx -y repomix --compress --ignore "**/*.svg,**/*.md,**/*.json" --output context/repo-map.md
  echo ""
  echo "✅ Fallback Map generated: context/repo-map.md"
fi
