# 🚀 Deploy Now - Step by Step

## Step 1: Commit & Push to GitHub

```bash
# Dari root project
cd "/Users/aaa/Clanker szn/trial 1/clanker-sdk-old-"

# Add telegram-bot folder
git add telegram-bot/

# Commit
git commit -m "Add Telegram bot with cloud deployment support"

# Push to GitHub
git push origin 2025-10-31-9lvp-25afd
# atau jika main branch:
# git push origin main
```

---

## Step 2: Setup Railway.app

### 2.1 Create Account
1. Go to **https://railway.app**
2. Click **"Start a New Project"**
3. Sign up with **GitHub** (recommended)
4. Authorize Railway to access your repositories

### 2.2 Create Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Find and select your repository: `clanker-sdk-old-`
4. Railway akan auto-detect project

### 2.3 Configure Service
1. Railway akan show root directory
2. **IMPORTANT**: Set **Root Directory** to: `telegram-bot`
   - Click on service → Settings → Root Directory
   - Enter: `telegram-bot`
3. Railway akan auto-detect:
   - Build Command: `npm run build` ✅
   - Start Command: `node dist/index.js` ✅

---

## Step 3: Add PostgreSQL Database

1. In Railway dashboard, click **"New"** button
2. Select **"Database"** → **"Add PostgreSQL"**
3. Railway akan auto-create database
4. **DATABASE_URL** akan otomatis di-set sebagai environment variable
5. Copy **DATABASE_URL** untuk reference (optional)

---

## Step 4: Set Environment Variables

Go to your bot service → **"Variables"** tab → Add these:

### Required Variables:

```env
# Telegram Bot
TELEGRAM_BOT_TOKEN=your_bot_token_from_botfather

# Pinata (Image Upload)
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_KEY=your_pinata_secret_key
PINATA_GATEWAY=https://gateway.pinata.cloud/ipfs/

# Clanker SDK
PRIVATE_KEY=your_wallet_private_key_0x...
RPC_URL=https://eth-mainnet.g.alchemy.com/v2/your_key
# atau
# RPC_URL=https://mainnet.infura.io/v3/your_key

# App Config
NODE_ENV=production
PORT=3000
```

### Notes:
- `DATABASE_URL` sudah auto-set oleh Railway (jangan set manual)
- `TELEGRAM_BOT_TOKEN` - Dapatkan dari @BotFather di Telegram
- `PRIVATE_KEY` - Wallet private key untuk deployment (0x...)
- `RPC_URL` - Alchemy atau Infura RPC URL

---

## Step 5: Deploy

1. Railway akan **auto-deploy** saat:
   - First setup (setelah configure)
   - Setiap push ke GitHub
2. Check **"Deployments"** tab untuk status
3. Wait for build to complete (2-5 minutes)
4. Check **"Logs"** tab untuk melihat output

### Expected Logs:
```
🚀 Starting Clanker Telegram Bot...
📊 Initializing database...
✅ Database initialized
🏥 Health check server running on port 3000
   Health endpoint: http://localhost:3000/health
🤖 Initializing Telegram bot...
✅ Bot started: @your_bot_username
✅ Bot started successfully
```

---

## Step 6: Test Bot

1. Open Telegram
2. Find your bot (username dari @BotFather)
3. Send: `/start`
4. Bot should respond with welcome message
5. Test: `/menu` - Should show menu
6. Test: Send an image - Should process and save

---

## Step 7: Verify Health Check

1. Get your Railway app URL:
   - Railway dashboard → Service → Settings → Domains
   - Atau check "Deployments" → Copy URL
2. Visit: `https://your-app.up.railway.app/health`
3. Should return JSON:
```json
{
  "status": "healthy",
  "uptime": 123.45,
  "database": "connected",
  "timestamp": "2024-...",
  "memory": {
    "used": 50,
    "total": 512,
    "percentage": 10
  }
}
```

---

## 🎉 Done!

Bot Anda sekarang:
- ✅ Running 24/7 di cloud
- ✅ Auto-restart on crash
- ✅ Database connected
- ✅ Health check available
- ✅ Ready to use!

---

## 🚨 Troubleshooting

### Bot Not Responding
- Check `TELEGRAM_BOT_TOKEN` is correct
- Check logs for errors
- Verify bot is not blocked

### Build Failed
- Check logs for specific error
- Verify all dependencies in `package.json`
- Check Node.js version (should be 18+)

### Database Error
- Check `DATABASE_URL` is set (auto by Railway)
- Verify database service is running
- Check connection in logs

### Need Help?
- Check logs in Railway dashboard
- Review `DEPLOYMENT_CHECKLIST.md`
- Check `CLOUD_SETUP_PLAN.md` for detailed guide

---

## 📊 Next Steps (Optional)

1. **Setup Monitoring**: Add UptimeRobot to monitor `/health` endpoint
2. **Setup Alerts**: Configure alerts for downtime
3. **Review Logs**: Check logs regularly for errors
4. **Update Code**: Push to GitHub, Railway auto-deploys

---

**Status**: Ready to Deploy! 🚀

