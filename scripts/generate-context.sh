#!/bin/bash

# ============================================================
# generate-context.sh — Generate AI-readable codebase snapshot
# Uses Repomix to pack codebase into a single file
# ============================================================

set -e

echo "🔍 Generating codebase context..."

# Check if npx is available
if ! command -v npx &> /dev/null; then
  echo "❌ npx not found. Please install Node.js first."
  exit 1
fi

# Run repomix
npx -y repomix --output context/repomix-output.md

echo ""
echo "✅ Context generated: context/repomix-output.md"
echo "📋 Use this file to give any AI full codebase context."
echo ""
echo "Usage:"
echo "  - Paste contents into AI chat"
echo "  - Or reference: \"Read context/repomix-output.md\""
