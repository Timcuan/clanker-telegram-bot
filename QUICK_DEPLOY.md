# ⚡ Quick Deploy Guide - Cloud Setup

## 🎯 Fastest Way: Railway.app (15 minutes)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for cloud deployment"
git push origin main
```

### Step 2: Create Railway Account
1. Go to https://railway.app
2. Click "Start a New Project"
3. Sign up with GitHub

### Step 3: Deploy
1. Click "New Project" → "Deploy from GitHub repo"
2. Select your repository
3. Select `telegram-bot` as root directory
4. Railway auto-detects and starts building

### Step 4: Add PostgreSQL
1. Click "New" → "Database" → "Add PostgreSQL"
2. Railway auto-creates `DATABASE_URL`

### Step 5: Add Environment Variables
Go to your service → "Variables" → Add:

```env
TELEGRAM_BOT_TOKEN=your_token_from_botfather
PINATA_API_KEY=your_pinata_key
PINATA_SECRET_KEY=your_pinata_secret
PINATA_GATEWAY=https://gateway.pinata.cloud/ipfs/
PRIVATE_KEY=your_wallet_private_key
RPC_URL=your_alchemy_or_infura_url
NODE_ENV=production
```

### Step 6: Deploy & Test
1. Railway auto-deploys
2. Check "Logs" tab
3. Test bot: `/start` in Telegram

**Done! 🎉**

---

## 📋 Environment Variables Checklist

Copy-paste ini ke Railway/Render/Fly.io:

```env
# Required
TELEGRAM_BOT_TOKEN=
DATABASE_URL=          # Auto-created by cloud provider
PINATA_API_KEY=
PINATA_SECRET_KEY=
PINATA_GATEWAY=https://gateway.pinata.cloud/ipfs/
PRIVATE_KEY=
RPC_URL=
NODE_ENV=production

# Optional
REDIS_URL=            # If using Redis
PORT=3000
```

---

## 🔍 Verify Deployment

### Check Logs
- Railway: Dashboard → Logs tab
- Render: Dashboard → Logs
- Fly.io: `fly logs`

### Test Bot
1. Open Telegram
2. Find your bot
3. Send `/start`
4. Should receive welcome message

### Test Image Upload
1. Send image to bot
2. Bot should process and save IPFS URL

---

## 🚨 Common Issues

### Bot Not Responding
- Check `TELEGRAM_BOT_TOKEN` is correct
- Check logs for errors
- Verify bot is not blocked

### Database Error
- Check `DATABASE_URL` format
- Verify database is running
- Check connection in logs

### Build Failed
- Check Node.js version (18+)
- Verify all dependencies
- Check build logs

---

## 📞 Need Help?

1. Check logs in cloud dashboard
2. Verify all environment variables
3. Test locally first: `npm run dev`
4. Check `CLOUD_SETUP_PLAN.md` for detailed guide

---

**Estimated Time**: 15-30 minutes  
**Cost**: $5/month (Railway) or Free (Fly.io)

