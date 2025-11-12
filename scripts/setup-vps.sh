#!/bin/bash

# Clanker Bot VPS Setup Script
# Run this script on a fresh Ubuntu 22.04 server

set -e

echo "🚀 Starting Clanker Bot VPS Setup..."

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
echo "📦 Installing Node.js 18..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
echo "📦 Installing PostgreSQL..."
sudo apt install -y postgresql postgresql-contrib

# Install PM2
echo "📦 Installing PM2..."
sudo npm install -g pm2

# Install Docker (optional, for containerized setup)
echo "📦 Installing Docker..."
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
rm get-docker.sh

# Install Docker Compose
echo "📦 Installing Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Setup firewall
echo "🔒 Setting up firewall..."
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

# Create app directory
echo "📁 Creating app directory..."
mkdir -p ~/clanker-bot
cd ~/clanker-bot

# Create logs directory
mkdir -p logs

echo "✅ VPS setup complete!"
echo ""
echo "Next steps:"
echo "1. Clone your repository: git clone <your-repo> ."
echo "2. Install dependencies: npm install"
echo "3. Create .env file with your configuration"
echo "4. Build: npm run build"
echo "5. Start with PM2: pm2 start ecosystem.config.js"
echo "6. Setup PM2 startup: pm2 startup && pm2 save"
echo ""
echo "For Docker setup:"
echo "1. Copy docker-compose.yml"
echo "2. Create .env file"
echo "3. Run: docker-compose up -d"

