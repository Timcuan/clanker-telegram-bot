# 🚀 Deployment Options - Keep Bot & Database Alive

## 📋 Overview

Dokumentasi berbagai opsi untuk menjaga bot Telegram dan database tetap berjalan 24/7.

---

## 🖥️ Option 1: VPS (Virtual Private Server)

### Recommended Providers:
- **DigitalOcean** - $6/month (1GB RAM)
- **Linode** - $5/month (1GB RAM)
- **Vultr** - $6/month (1GB RAM)
- **Hetzner** - €4.51/month (2GB RAM) - Best value
- **AWS EC2** - Pay as you go
- **Google Cloud** - Pay as you go

### Setup Steps:
1. Create VPS instance (Ubuntu 22.04 recommended)
2. Install Node.js, PostgreSQL, PM2
3. Deploy bot code
4. Setup PM2 untuk auto-restart
5. Setup systemd untuk database

### Pros:
✅ Full control
✅ Cost-effective
✅ Scalable
✅ Custom configuration

### Cons:
❌ Need server management
❌ Manual backups
❌ Security responsibility

---

## 🐳 Option 2: Docker + Docker Compose

### Setup:
```yaml
# docker-compose.yml
version: '3.8'
services:
  bot:
    build: .
    restart: always
    environment:
      - NODE_ENV=production
    depends_on:
      - postgres
      - redis
  
  postgres:
    image: postgres:15
    restart: always
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=clanker_bot
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
  
  redis:
    image: redis:7-alpine
    restart: always
```

### Pros:
✅ Easy deployment
✅ Isolated services
✅ Easy scaling
✅ Version control

### Cons:
❌ Need Docker knowledge
❌ Resource overhead

---

## ☁️ Option 3: Cloud Platforms

### 3.1 Railway.app
- **Price**: $5/month (hobby plan)
- **Features**: Auto-deploy, PostgreSQL included
- **Setup**: Connect GitHub, auto-deploy
- **Best for**: Quick deployment

### 3.2 Render.com
- **Price**: Free tier available, $7/month for PostgreSQL
- **Features**: Auto-deploy, managed PostgreSQL
- **Setup**: Connect GitHub repo
- **Best for**: Free tier testing

### 3.3 Fly.io
- **Price**: Free tier, pay for usage
- **Features**: Global deployment, PostgreSQL
- **Setup**: CLI deployment
- **Best for**: Global distribution

### 3.4 Heroku
- **Price**: $7/month (hobby dyno) + $9/month (PostgreSQL)
- **Features**: Easy deployment, add-ons
- **Setup**: Git push deployment
- **Best for**: Traditional PaaS

### 3.5 AWS (ECS/Fargate)
- **Price**: Pay as you go
- **Features**: Highly scalable, managed services
- **Setup**: Container deployment
- **Best for**: Enterprise scale

### 3.6 Google Cloud Run
- **Price**: Pay per request
- **Features**: Serverless, auto-scaling
- **Setup**: Container deployment
- **Best for**: Cost-effective serverless

---

## 💾 Database Options

### 4.1 Managed PostgreSQL Services

#### Supabase
- **Price**: Free tier, $25/month (pro)
- **Features**: PostgreSQL + real-time + storage
- **Best for**: Full-stack apps

#### Neon
- **Price**: Free tier, pay as you go
- **Features**: Serverless PostgreSQL
- **Best for**: Modern apps

#### AWS RDS
- **Price**: ~$15/month (t3.micro)
- **Features**: Managed, backups, scaling
- **Best for**: AWS ecosystem

#### Google Cloud SQL
- **Price**: ~$10/month (db-f1-micro)
- **Features**: Managed, backups
- **Best for**: GCP ecosystem

#### DigitalOcean Managed Database
- **Price**: $15/month
- **Features**: Managed, backups, monitoring
- **Best for**: Simple managed DB

### 4.2 Self-Hosted PostgreSQL
- Run on same VPS as bot
- Use Docker or direct install
- Setup automated backups

---

## 🔄 Process Managers

### PM2 (Recommended)
```bash
# Install
npm install -g pm2

# Start bot
pm2 start dist/index.js --name clanker-bot

# Auto-restart on reboot
pm2 startup
pm2 save

# Monitor
pm2 monit

# Logs
pm2 logs clanker-bot
```

### systemd
```ini
# /etc/systemd/system/clanker-bot.service
[Unit]
Description=Clanker Telegram Bot
After=network.target postgresql.service

[Service]
Type=simple
User=your-user
WorkingDirectory=/path/to/bot
ExecStart=/usr/bin/node dist/index.js
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

### Forever
```bash
npm install -g forever
forever start dist/index.js
forever list
```

---

## 📊 Monitoring & Health Checks

### 1. PM2 Monitoring
```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

### 2. Health Check Endpoint
```typescript
// Add to bot
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});
```

### 3. Uptime Monitoring
- **UptimeRobot** - Free, checks every 5 min
- **Pingdom** - Paid, more features
- **StatusCake** - Free tier available

### 4. Logging
- **Winston** - Structured logging
- **Pino** - Fast JSON logger
- **PM2 Logs** - Built-in logging

---

## 🔒 Security & Backups

### Security:
1. **Firewall** (UFW)
   ```bash
   sudo ufw allow 22/tcp
   sudo ufw enable
   ```

2. **SSL/TLS** - Use HTTPS for webhooks
3. **Environment Variables** - Never commit secrets
4. **Regular Updates** - Keep system updated

### Backups:
1. **Database Backups**
   ```bash
   # Daily backup script
   pg_dump clanker_bot > backup_$(date +%Y%m%d).sql
   ```

2. **Automated Backups**
   - Cron job untuk daily backups
   - Upload to S3/Google Cloud Storage
   - Keep last 30 days

3. **Code Backups**
   - Git repository
   - Regular commits

---

## 🎯 Recommended Setup (Budget-Friendly)

### Option A: VPS + Self-Hosted DB
```
VPS (Hetzner): €4.51/month
- Bot: PM2
- PostgreSQL: Docker
- Redis: Docker (optional)
Total: ~$5/month
```

### Option B: Railway.app
```
Railway Hobby: $5/month
- Bot + PostgreSQL included
- Auto-deploy from GitHub
Total: $5/month
```

### Option C: Render.com
```
Render Free Tier:
- Bot: Free (with limitations)
- PostgreSQL: $7/month
Total: $7/month
```

### Option D: Fly.io
```
Fly.io:
- Bot: Free tier (3 VMs)
- PostgreSQL: Included
Total: Free (for small scale)
```

---

## 📝 Step-by-Step: VPS Setup

### 1. Initial Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Install PM2
sudo npm install -g pm2
```

### 2. Setup Database
```bash
# Create database
sudo -u postgres psql
CREATE DATABASE clanker_bot;
CREATE USER clanker_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE clanker_bot TO clanker_user;
\q
```

### 3. Deploy Bot
```bash
# Clone repository
git clone your-repo.git
cd telegram-bot

# Install dependencies
npm install

# Build
npm run build

# Create .env file
nano .env
# Add all required variables

# Start with PM2
pm2 start dist/index.js --name clanker-bot
pm2 startup
pm2 save
```

### 4. Setup Auto-Restart
```bash
# PM2 auto-restart
pm2 startup systemd
# Follow instructions

# Save PM2 process list
pm2 save
```

### 5. Setup Monitoring
```bash
# PM2 monitoring
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

---

## 📝 Step-by-Step: Railway.app Setup

### 1. Create Account
- Go to railway.app
- Sign up with GitHub

### 2. Create New Project
- Click "New Project"
- Select "Deploy from GitHub repo"

### 3. Add PostgreSQL
- Click "New" → "Database" → "PostgreSQL"
- Railway auto-creates DATABASE_URL

### 4. Configure Environment
- Go to "Variables"
- Add all required env vars:
  - TELEGRAM_BOT_TOKEN
  - PINATA_API_KEY
  - PINATA_SECRET_KEY
  - etc.

### 5. Deploy
- Railway auto-deploys on git push
- Check logs in dashboard

---

## 📝 Step-by-Step: Docker Setup

### 1. Create Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
CMD ["node", "dist/index.js"]
```

### 2. Create docker-compose.yml
```yaml
version: '3.8'
services:
  bot:
    build: .
    restart: always
    env_file: .env
    depends_on:
      - postgres
  
  postgres:
    image: postgres:15-alpine
    restart: always
    environment:
      POSTGRES_DB: clanker_bot
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### 3. Deploy
```bash
docker-compose up -d
docker-compose logs -f bot
```

---

## 🔍 Health Checks

### Bot Health Check
```typescript
// src/utils/health.ts
export async function healthCheck(): Promise<boolean> {
  try {
    // Check database
    const pool = getPool();
    await pool.query('SELECT 1');
    
    // Check bot
    // Add bot status check
    
    return true;
  } catch (error) {
    logger.error('Health check failed:', error);
    return false;
  }
}
```

### Database Health Check
```sql
-- Check database
SELECT 1;

-- Check connections
SELECT count(*) FROM pg_stat_activity;

-- Check database size
SELECT pg_size_pretty(pg_database_size('clanker_bot'));
```

---

## 📊 Comparison Table

| Option | Cost/Month | Setup Time | Maintenance | Best For |
|--------|-----------|------------|--------------|----------|
| VPS + PM2 | $5-10 | 1-2 hours | Medium | Full control |
| Railway | $5 | 15 min | Low | Quick deploy |
| Render | $7 | 20 min | Low | Free tier test |
| Fly.io | Free-$5 | 30 min | Low | Cost-effective |
| Docker | $5-10 | 1 hour | Medium | Containerized |
| Heroku | $16 | 15 min | Low | Traditional PaaS |

---

## 🎯 Quick Recommendations

### For Beginners:
1. **Railway.app** - Easiest, $5/month
2. **Render.com** - Free tier available

### For Budget-Conscious:
1. **Fly.io** - Free tier
2. **Hetzner VPS** - €4.51/month

### For Full Control:
1. **DigitalOcean VPS** - $6/month
2. **AWS EC2** - Pay as you go

### For Production:
1. **AWS ECS/Fargate** - Scalable
2. **Google Cloud Run** - Serverless

---

## 🚨 Important Notes

1. **Always use process manager** (PM2, systemd, Docker restart)
2. **Setup automated backups** untuk database
3. **Monitor logs** regularly
4. **Setup alerts** untuk downtime
5. **Keep dependencies updated**
6. **Use environment variables** untuk secrets
7. **Setup firewall** untuk security

---

## 📚 Additional Resources

- PM2 Documentation: https://pm2.keymetrics.io/
- Railway Docs: https://docs.railway.app/
- Docker Compose: https://docs.docker.com/compose/
- PostgreSQL Backup: https://www.postgresql.org/docs/current/backup.html

---

**Status**: 📋 Ready for Implementation
**Next**: Choose option and follow setup guide

