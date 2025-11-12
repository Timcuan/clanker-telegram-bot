#!/bin/bash

# Script to push telegram-bot to new GitHub repository
# Usage: ./PUSH_TO_NEW_REPO.sh <github-username> <repo-name>

set -e

GITHUB_USER=${1:-"Timcuan"}
REPO_NAME=${2:-"clanker-telegram-bot"}

echo "🚀 Setting up new repository: $REPO_NAME"
echo "📁 Working directory: telegram-bot"

cd "$(dirname "$0")"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    git config user.email "Timcuan@users.noreply.github.com"
    git config user.name "Timc"
fi

# Add all files
echo "📝 Adding files..."
git add .

# Check if there are changes
if git diff --staged --quiet; then
    echo "⚠️  No changes to commit"
else
    # Commit
    echo "💾 Committing changes..."
    git commit -m "Initial commit: Clanker Telegram Bot v1.0.0

- Complete Telegram bot implementation
- Cloud deployment support (Railway, Render, Fly.io)
- Health check endpoint
- Docker support
- Image upload via Pinata
- Interactive menu system
- Quick and manual deployment presets"
fi

# Set branch to main
git branch -M main

# Add remote (remove if exists)
if git remote get-url origin >/dev/null 2>&1; then
    echo "🔄 Updating remote origin..."
    git remote set-url origin "https://github.com/$GITHUB_USER/$REPO_NAME.git"
else
    echo "➕ Adding remote origin..."
    git remote add origin "https://github.com/$GITHUB_USER/$REPO_NAME.git"
fi

echo ""
echo "✅ Ready to push!"
echo ""
echo "📋 Next steps:"
echo "1. Create repository on GitHub:"
echo "   https://github.com/new"
echo "   Name: $REPO_NAME"
echo "   DO NOT initialize with README"
echo ""
echo "2. Then run:"
echo "   git push -u origin main"
echo ""
echo "Or if repository already exists, push now:"
read -p "Push now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Pushing to GitHub..."
    git push -u origin main
    echo ""
    echo "✅ Successfully pushed to:"
    echo "   https://github.com/$GITHUB_USER/$REPO_NAME"
else
    echo "⏸️  Skipped. Run 'git push -u origin main' when ready."
fi

