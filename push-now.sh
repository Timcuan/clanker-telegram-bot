#!/bin/bash
# Quick push script

REPO_NAME=${1:-"clanker-telegram-bot"}
GITHUB_USER=${2:-"Timcuan"}

echo "🚀 Pushing to: https://github.com/$GITHUB_USER/$REPO_NAME"
echo ""

# Check if remote exists
if git remote get-url origin >/dev/null 2>&1; then
    echo "✅ Remote already set"
    git remote -v
else
    echo "➕ Adding remote..."
    git remote add origin "https://github.com/$GITHUB_USER/$REPO_NAME.git"
fi

echo ""
echo "📤 Pushing to GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "✅ Done! Repository: https://github.com/$GITHUB_USER/$REPO_NAME"
