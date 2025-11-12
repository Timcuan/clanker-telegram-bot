# ☁️ Cloud Setup Plan - Clanker Telegram Bot

## 🎯 Overview

Plan lengkap untuk deploy bot Telegram ke cloud dengan database terpisah. Bot akan selalu online dan auto-restart.

---

## 📋 Pre-requisites

- [ ] GitHub account
- [ ] Telegram Bot Token (dari @BotFather)
- [ ] Pinata API keys (untuk image upload)
- [ ] Wallet private key (untuk deployment)
- [ ] RPC URL (Alchemy/Infura)

---

## 🚀 Option 1: Railway.app (RECOMMENDED - Termudah)

### Why Railway?
✅ Setup 15 menit  
✅ Auto-deploy dari GitHub  
✅ PostgreSQL included  
✅ Auto-restart built-in  
✅ $5/month (hobby plan)  
✅ Free trial available  

### Step-by-Step Setup

#### Step 1: Prepare Repository
```bash
# Pastikan semua code sudah di GitHub
git add .
git commit -m "Ready for cloud deployment"
git push origin main
```

#### Step 2: Create Railway Account
1. Go to https://railway.app
2. Click "Start a New Project"
3. Sign up with GitHub
4. Authorize Railway to access your repos

#### Step 3: Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your `clanker-sdk-old-` repository
4. Select `telegram-bot` folder as root directory

#### Step 4: Add PostgreSQL Database
1. In Railway dashboard, click "New"
2. Select "Database" → "Add PostgreSQL"
3. Railway akan auto-create `DATABASE_URL` environment variable
4. Copy `DATABASE_URL` untuk nanti

#### Step 5: Configure Environment Variables
Go to your bot service → "Variables" tab, add:

```env
# Telegram
TELEGRAM_BOT_TOKEN=your_bot_token_here

# Database (auto-created by Railway)
DATABASE_URL=postgresql://postgres:password@host:port/dbname

# Pinata (Image Upload)
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_KEY=your_pinata_secret_key
PINATA_GATEWAY=https://gateway.pinata.cloud/ipfs/

# Clanker SDK
PRIVATE_KEY=your_wallet_private_key
RPC_URL=https://eth-mainnet.g.alchemy.com/v2/your_key

# Optional: Redis (if using)
REDIS_URL=redis://default:password@host:port

# App Config
NODE_ENV=production
PORT=3000
```

#### Step 6: Configure Build Settings
Railway akan auto-detect, tapi pastikan:
- **Build Command**: `npm run build`
- **Start Command**: `node dist/index.js`
- **Root Directory**: `telegram-bot`

#### Step 7: Deploy
1. Railway akan auto-deploy saat push ke main branch
2. Check "Deployments" tab untuk status
3. View logs di "Logs" tab

#### Step 8: Verify
1. Check bot logs di Railway dashboard
2. Test bot di Telegram
3. Test `/start` command
4. Test image upload

### Railway Pricing
- **Hobby Plan**: $5/month
  - 512MB RAM
  - 1GB storage
  - 100GB bandwidth
  - PostgreSQL included

### Railway Commands (CLI)
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link project
railway link

# View logs
railway logs

# Open dashboard
railway open
```

---

## 🌐 Option 2: Render.com (Free Tier Available)

### Why Render?
✅ Free tier untuk testing  
✅ Auto-deploy dari GitHub  
✅ Managed PostgreSQL ($7/month)  
✅ Auto-restart  
✅ Easy setup  

### Step-by-Step Setup

#### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub
3. Verify email

#### Step 2: Create PostgreSQL Database
1. Click "New +" → "PostgreSQL"
2. Name: `clanker-bot-db`
3. Database: `clanker_bot`
4. User: `clanker_user`
5. Region: Choose closest
6. Plan: Free (dev) or Starter ($7/month)
7. Click "Create Database"
8. Copy "Internal Database URL"

#### Step 3: Create Web Service (Bot)
1. Click "New +" → "Web Service"
2. Connect GitHub repository
3. Select `clanker-sdk-old-` repo
4. Configure:
   - **Name**: `clanker-telegram-bot`
   - **Root Directory**: `telegram-bot`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `node dist/index.js`
   - **Plan**: Free (dev) or Starter ($7/month)

#### Step 4: Add Environment Variables
In Web Service → "Environment" tab:

```env
TELEGRAM_BOT_TOKEN=your_bot_token
DATABASE_URL=postgresql://user:pass@host:port/dbname
PINATA_API_KEY=your_key
PINATA_SECRET_KEY=your_secret
PINATA_GATEWAY=https://gateway.pinata.cloud/ipfs/
PRIVATE_KEY=your_private_key
RPC_URL=your_rpc_url
NODE_ENV=production
```

#### Step 5: Link Database
1. In Web Service → "Environment"
2. Click "Add Environment Variable"
3. Name: `DATABASE_URL`
4. Value: Copy from PostgreSQL service (Internal Database URL)

#### Step 6: Deploy
1. Render akan auto-deploy
2. Check "Logs" tab
3. Wait for "Your service is live"

### Render Pricing
- **Free Tier**: 
  - 512MB RAM
  - Spins down after 15min inactivity
  - Good for testing
- **Starter Plan**: $7/month
  - Always on
  - 512MB RAM
  - Better for production

---

## 🚁 Option 3: Fly.io (Cost-Effective)

### Why Fly.io?
✅ Free tier (3 VMs)  
✅ Pay as you go  
✅ Global deployment  
✅ PostgreSQL included  
✅ Great for scaling  

### Step-by-Step Setup

#### Step 1: Install Fly CLI
```bash
# macOS
curl -L https://fly.io/install.sh | sh

# Or with Homebrew
brew install flyctl
```

#### Step 2: Login
```bash
fly auth login
```

#### Step 3: Create App
```bash
cd telegram-bot
fly launch
```

Follow prompts:
- App name: `clanker-bot` (or auto-generated)
- Region: Choose closest
- PostgreSQL: Yes
- Redis: Optional

#### Step 4: Configure fly.toml
File akan auto-created, update jika perlu:

```toml
app = "clanker-bot"
primary_region = "sin"  # Singapore, or your region

[build]
  builder = "paketobuildpacks/builder:base"

[env]
  NODE_ENV = "production"

[[services]]
  http_checks = []
  internal_port = 3000
  processes = ["app"]
  protocol = "tcp"
  script_checks = []

  [services.concurrency]
    hard_limit = 25
    soft_limit = 20
    type = "connections"

  [[services.ports]]
    handlers = ["http"]
    port = 80

  [[services.ports]]
    handlers = ["tls", "http"]
    port = 443

  [[services.tcp_checks]]
    grace_period = "1s"
    interval = "15s"
    restart_limit = 0
    timeout = "2s"
```

#### Step 5: Set Secrets
```bash
fly secrets set TELEGRAM_BOT_TOKEN=your_token
fly secrets set PINATA_API_KEY=your_key
fly secrets set PINATA_SECRET_KEY=your_secret
fly secrets set PRIVATE_KEY=your_key
fly secrets set RPC_URL=your_url
```

#### Step 6: Deploy
```bash
fly deploy
```

#### Step 7: Check Status
```bash
fly status
fly logs
```

### Fly.io Pricing
- **Free**: 3 shared-cpu-1x VMs
- **Pay as you go**: ~$1.94/month per VM
- PostgreSQL: Included in free tier

---

## 📊 Comparison Table

| Feature | Railway | Render | Fly.io |
|---------|---------|--------|--------|
| **Setup Time** | 15 min | 20 min | 30 min |
| **Free Tier** | ❌ | ✅ | ✅ |
| **Cost/Month** | $5 | $7-14 | Free-$5 |
| **Auto-Deploy** | ✅ | ✅ | ✅ |
| **PostgreSQL** | Included | $7 extra | Included |
| **Always On** | ✅ | Free: ❌ | ✅ |
| **Ease of Use** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |

---

## 🎯 Recommended: Railway.app

**Why?**
- Easiest setup (15 minutes)
- PostgreSQL included
- Always on
- Great documentation
- Reliable

**Cost**: $5/month total

---

## 📝 Deployment Checklist

### Pre-Deployment
- [ ] Code pushed to GitHub
- [ ] All dependencies in `package.json`
- [ ] `.env.example` updated
- [ ] Build script works locally (`npm run build`)
- [ ] Bot tested locally

### Environment Variables
- [ ] `TELEGRAM_BOT_TOKEN` - From @BotFather
- [ ] `DATABASE_URL` - From cloud provider
- [ ] `PINATA_API_KEY` - From Pinata
- [ ] `PINATA_SECRET_KEY` - From Pinata
- [ ] `PINATA_GATEWAY` - Pinata gateway URL
- [ ] `PRIVATE_KEY` - Wallet private key
- [ ] `RPC_URL` - Alchemy/Infura RPC
- [ ] `NODE_ENV=production`

### Database Setup
- [ ] PostgreSQL created
- [ ] Database URL copied
- [ ] Connection tested
- [ ] Migrations run (if any)

### Deployment
- [ ] Service created
- [ ] Environment variables set
- [ ] Build successful
- [ ] Service running
- [ ] Logs checked

### Testing
- [ ] Bot responds to `/start`
- [ ] Bot responds to `/menu`
- [ ] Image upload works
- [ ] Quick preset works
- [ ] Manual preset works
- [ ] Database queries work

### Monitoring
- [ ] Logs accessible
- [ ] Health check working
- [ ] Uptime monitoring setup (optional)
- [ ] Alerts configured (optional)

---

## 🔧 Post-Deployment Setup

### 1. Setup Database Migrations
```bash
# If using migrations, run:
npm run migrate
# Or manually create tables
```

### 2. Test Bot Commands
```
/start - Should show welcome
/menu - Should show menu
/help - Should show help
```

### 3. Test Image Upload
1. Send image to bot
2. Check Pinata upload
3. Verify IPFS URL saved

### 4. Setup Monitoring (Optional)
- **UptimeRobot**: Free uptime monitoring
  - Add bot health endpoint
  - Check every 5 minutes
- **Logs**: Monitor via cloud dashboard

### 5. Setup Backups (Optional)
- Database backups (if using managed DB)
- Or use cloud provider's backup feature

---

## 🚨 Troubleshooting

### Bot Not Responding
1. Check logs in cloud dashboard
2. Verify `TELEGRAM_BOT_TOKEN` is correct
3. Check bot is not blocked
4. Verify webhook/polling is working

### Database Connection Failed
1. Check `DATABASE_URL` format
2. Verify database is running
3. Check firewall/network settings
4. Test connection locally

### Build Failed
1. Check Node.js version (should be 18+)
2. Verify all dependencies in `package.json`
3. Check build logs for errors
4. Test build locally first

### Image Upload Failed
1. Verify Pinata API keys
2. Check Pinata gateway URL
3. Verify image format supported
4. Check file size limits

---

## 📚 Next Steps

1. **Choose cloud provider** (Railway recommended)
2. **Follow setup steps** above
3. **Deploy and test**
4. **Setup monitoring** (optional)
5. **Setup backups** (optional)

---

## 🔗 Useful Links

- Railway: https://railway.app
- Render: https://render.com
- Fly.io: https://fly.io
- Telegram Bot API: https://core.telegram.org/bots/api
- Pinata: https://pinata.cloud

---

**Status**: ✅ Ready to Deploy  
**Recommended**: Railway.app ($5/month)  
**Estimated Setup Time**: 15-30 minutes

