# ✅ Step 1 Complete - Next Steps

## ✅ Code Pushed to GitHub!

Repository: `https://github.com/Timcuan/clanker-sdk-old-`  
Branch: `2025-10-31-9lvp-25afd`

---

## 🚀 Step 2: Setup Railway.app

### 2.1 Create Account
1. **Go to**: https://railway.app
2. Click **"Start a New Project"**
3. **Sign up with GitHub** (recommended - easiest)
4. Authorize Railway to access your repositories

### 2.2 Create New Project
1. Click **"New Project"** button
2. Select **"Deploy from GitHub repo"**
3. Find and select: **`clanker-sdk-old-`**
4. Railway akan auto-detect project

### 2.3 Configure Service (IMPORTANT!)
1. Railway akan create service automatically
2. **Click on the service** → Go to **"Settings"** tab
3. Find **"Root Directory"** setting
4. **Set to**: `telegram-bot`
5. Click **"Save"**

Railway akan auto-detect:
- ✅ Build Command: `npm run build`
- ✅ Start Command: `node dist/index.js`

---

## 🗄️ Step 3: Add PostgreSQL Database

1. In Railway dashboard, click **"New"** button (top right)
2. Select **"Database"** → **"Add PostgreSQL"**
3. Railway akan auto-create database
4. **DATABASE_URL** akan otomatis di-set sebagai environment variable
5. ✅ No action needed - Railway handles this automatically!

---

## 🔐 Step 4: Set Environment Variables

Go to your bot service → **"Variables"** tab → Click **"New Variable"**

### Add These Variables:

#### 1. Telegram Bot Token
```
Name: TELEGRAM_BOT_TOKEN
Value: [Your bot token from @BotFather]
```

**How to get:**
- Open Telegram
- Search: `@BotFather`
- Send: `/newbot`
- Follow instructions
- Copy the token

#### 2. Pinata API Keys
```
Name: PINATA_API_KEY
Value: [Your Pinata API key]

Name: PINATA_SECRET_KEY
Value: [Your Pinata secret key]

Name: PINATA_GATEWAY
Value: https://gateway.pinata.cloud/ipfs/
```

**How to get:**
- Go to: https://pinata.cloud
- Sign up / Login
- Go to API Keys section
- Create new API key
- Copy Key and Secret

#### 3. Wallet & RPC
```
Name: PRIVATE_KEY
Value: 0x[Your wallet private key]

Name: RPC_URL
Value: https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
# atau
# https://mainnet.infura.io/v3/YOUR_KEY
```

**How to get RPC:**
- **Alchemy**: https://www.alchemy.com → Create app → Copy HTTP URL
- **Infura**: https://infura.io → Create project → Copy endpoint

#### 4. App Config
```
Name: NODE_ENV
Value: production

Name: PORT
Value: 3000
```

**Note:** `DATABASE_URL` sudah auto-set oleh Railway (jangan set manual!)

---

## 🚀 Step 5: Deploy

1. Railway akan **auto-deploy** setelah:
   - Set environment variables
   - Or saat push ke GitHub
2. Go to **"Deployments"** tab
3. Wait for build (2-5 minutes)
4. Check **"Logs"** tab

### Expected Logs:
```
🚀 Starting Clanker Telegram Bot...
📊 Initializing database...
✅ Database initialized
🏥 Health check server running on port 3000
🤖 Initializing Telegram bot...
✅ Bot started: @your_bot_username
✅ Bot started successfully
```

---

## 🧪 Step 6: Test Bot

1. Open Telegram
2. Find your bot (username dari @BotFather)
3. Send: `/start`
4. Bot should respond! ✅

### Test Commands:
- `/start` - Welcome message
- `/menu` - Show menu
- `/help` - Show help
- Send an image - Should process

---

## 🔍 Step 7: Verify Health Check

1. Get your Railway URL:
   - Railway dashboard → Service → Settings → Domains
   - Or check "Deployments" → Copy URL
2. Visit: `https://your-app.up.railway.app/health`
3. Should return JSON with status

---

## 📋 Quick Checklist

- [ ] Railway account created
- [ ] Project created from GitHub
- [ ] Root directory set to `telegram-bot`
- [ ] PostgreSQL database added
- [ ] Environment variables set:
  - [ ] TELEGRAM_BOT_TOKEN
  - [ ] PINATA_API_KEY
  - [ ] PINATA_SECRET_KEY
  - [ ] PINATA_GATEWAY
  - [ ] PRIVATE_KEY
  - [ ] RPC_URL
  - [ ] NODE_ENV=production
- [ ] Deployment successful
- [ ] Bot responds to `/start`
- [ ] Health check works

---

## 🆘 Need Help?

- **Detailed Guide**: See `DEPLOY_NOW.md`
- **Troubleshooting**: See `DEPLOYMENT_CHECKLIST.md`
- **All Options**: See `CLOUD_SETUP_PLAN.md`

---

## 🎯 Current Status

✅ **Step 1**: Code pushed to GitHub  
⏳ **Step 2**: Setup Railway (in progress)  
⏳ **Step 3**: Add database  
⏳ **Step 4**: Set environment variables  
⏳ **Step 5**: Deploy & test  

---

**Next**: Go to https://railway.app and start setup! 🚀

