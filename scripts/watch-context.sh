#!/bin/bash
# Watch files and auto-regenerate context

echo "👀 Watching for file changes to auto-update context..."
echo "Press Ctrl+C to stop."

if ! command -v npx &> /dev/null; then
  echo "❌ npx not found. Please install Node.js first."
  exit 1
fi

# Run nodemon to watch src, docs, and skills directories
npx -y nodemon --watch src --watch docs --watch skills --ext js,ts,jsx,tsx,css,md --exec "./scripts/generate-context.sh"
