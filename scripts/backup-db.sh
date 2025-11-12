#!/bin/bash

# Database Backup Script
# Run this daily via cron: 0 2 * * * /path/to/backup-db.sh

set -e

BACKUP_DIR="/backups/clanker-bot"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/clanker_bot_$DATE.sql"
RETENTION_DAYS=30

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Database credentials (use environment variables in production)
DB_NAME="${DB_NAME:-clanker_bot}"
DB_USER="${DB_USER:-postgres}"
DB_HOST="${DB_HOST:-localhost}"

echo "📦 Starting database backup..."

# Create backup
PGPASSWORD="${DB_PASSWORD}" pg_dump -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" > "$BACKUP_FILE"

# Compress backup
gzip "$BACKUP_FILE"
BACKUP_FILE="${BACKUP_FILE}.gz"

echo "✅ Backup created: $BACKUP_FILE"

# Upload to S3 (optional, uncomment if using S3)
# aws s3 cp "$BACKUP_FILE" s3://your-bucket/backups/

# Remove old backups (keep last 30 days)
find "$BACKUP_DIR" -name "clanker_bot_*.sql.gz" -mtime +$RETENTION_DAYS -delete

echo "✅ Backup complete! Old backups cleaned."

