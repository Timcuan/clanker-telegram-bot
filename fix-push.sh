#!/bin/bash

# Fix push error script

set -e

cd "$(dirname "$0")"

echo "🔍 Checking remote status..."

# Check if remote exists
if git remote get-url origin >/dev/null 2>&1; then
    echo "✅ Remote exists: $(git remote get-url origin)"
else
    echo "❌ No remote found"
    exit 1
fi

# Fetch remote
echo "📥 Fetching remote..."
git fetch origin 2>&1 || echo "⚠️  Fetch failed (might be empty repo)"

# Check if remote has commits
if git rev-parse --verify origin/main >/dev/null 2>&1; then
    echo "📋 Remote has commits, checking differences..."
    
    # Show what's on remote
    echo ""
    echo "Files on remote:"
    git ls-tree -r origin/main --name-only | head -10
    
    echo ""
    read -p "Remote has files. Pull and merge? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🔄 Pulling and merging..."
        git pull origin main --allow-unrelated-histories || {
            echo "⚠️  Merge conflict detected. Resolve manually."
            exit 1
        }
        echo "✅ Merged successfully"
    else
        echo "⚠️  Skipped merge. Use force push? (WARNING: overwrites remote)"
        read -p "Force push? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            git push -u origin main --force
            echo "✅ Force pushed"
            exit 0
        else
            echo "❌ Cancelled"
            exit 1
        fi
    fi
else
    echo "✅ Remote is empty, safe to push"
fi

# Push
echo "📤 Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Successfully pushed to GitHub!"
echo "🔗 https://github.com/Timcuan/clanker-telegram-bot"

