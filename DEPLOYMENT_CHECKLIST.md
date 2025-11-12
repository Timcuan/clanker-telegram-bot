# ✅ Cloud Deployment Checklist

## 📋 Pre-Deployment

### Code Preparation
- [ ] All code committed to GitHub
- [ ] `package.json` has all dependencies
- [ ] Build script works: `npm run build`
- [ ] Bot tested locally: `npm run dev`
- [ ] No TypeScript errors: `npm run typecheck`

### Environment Variables Ready
- [ ] `TELEGRAM_BOT_TOKEN` - From @BotFather
- [ ] `PINATA_API_KEY` - From Pinata dashboard
- [ ] `PINATA_SECRET_KEY` - From Pinata dashboard
- [ ] `PINATA_GATEWAY` - `https://gateway.pinata.cloud/ipfs/`
- [ ] `PRIVATE_KEY` - Wallet private key (0x...)
- [ ] `RPC_URL` - Alchemy/Infura RPC URL
- [ ] `NODE_ENV=production`

### Database Ready
- [ ] PostgreSQL service created (or will be auto-created)
- [ ] Database name decided: `clanker_bot`
- [ ] Backup strategy planned (optional)

---

## 🚀 Deployment Steps

### Step 1: Choose Platform
- [ ] Railway.app (Recommended - $5/month)
- [ ] Render.com (Free tier available)
- [ ] Fly.io (Free tier available)

### Step 2: Create Account
- [ ] Sign up with GitHub
- [ ] Verify email
- [ ] Authorize platform access

### Step 3: Create Project
- [ ] Create new project
- [ ] Connect GitHub repository
- [ ] Select `telegram-bot` as root directory

### Step 4: Add Database
- [ ] Create PostgreSQL service
- [ ] Copy `DATABASE_URL` (auto-created)
- [ ] Note database credentials

### Step 5: Configure Build
- [ ] Build command: `npm run build`
- [ ] Start command: `node dist/index.js`
- [ ] Node version: 18+ (auto-detected)

### Step 6: Set Environment Variables
- [ ] `TELEGRAM_BOT_TOKEN`
- [ ] `DATABASE_URL` (auto-set if using managed DB)
- [ ] `PINATA_API_KEY`
- [ ] `PINATA_SECRET_KEY`
- [ ] `PINATA_GATEWAY`
- [ ] `PRIVATE_KEY`
- [ ] `RPC_URL`
- [ ] `NODE_ENV=production`
- [ ] `PORT=3000` (optional, defaults to 3000)

### Step 7: Deploy
- [ ] Trigger deployment (auto on git push)
- [ ] Monitor build logs
- [ ] Wait for deployment to complete
- [ ] Check deployment status: "Live" or "Running"

---

## 🧪 Post-Deployment Testing

### Basic Tests
- [ ] Bot responds to `/start` command
- [ ] Bot responds to `/help` command
- [ ] Bot responds to `/menu` command
- [ ] Health check endpoint works: `https://your-app.railway.app/health`

### Feature Tests
- [ ] Image upload works (send image to bot)
- [ ] Quick preset deployment works
- [ ] Manual preset deployment works
- [ ] Database saves user data
- [ ] Database saves deployment records

### Error Handling
- [ ] Invalid commands show error message
- [ ] Missing data shows helpful message
- [ ] Network errors handled gracefully

---

## 📊 Monitoring Setup

### Logs
- [ ] Can view logs in cloud dashboard
- [ ] Logs show bot startup
- [ ] Logs show database connection
- [ ] No error messages in logs

### Health Monitoring (Optional)
- [ ] Setup UptimeRobot (free)
  - URL: `https://your-app.railway.app/health`
  - Interval: 5 minutes
- [ ] Setup alerts for downtime
- [ ] Test alert notification

### Database Monitoring
- [ ] Can access database (via dashboard or CLI)
- [ ] Database shows tables created
- [ ] Can query user data
- [ ] Database backups configured (if available)

---

## 🔒 Security Checklist

### Secrets Management
- [ ] All secrets in environment variables (not in code)
- [ ] `.env` file in `.gitignore`
- [ ] No secrets committed to Git
- [ ] Private keys secured

### Access Control
- [ ] Database password strong
- [ ] Platform account secured (2FA if available)
- [ ] GitHub repository access controlled

### Network Security
- [ ] Health endpoint doesn't expose sensitive data
- [ ] Database not publicly accessible (if possible)
- [ ] Firewall rules configured (if using VPS)

---

## 📈 Performance & Optimization

### Resource Usage
- [ ] Memory usage reasonable (< 512MB)
- [ ] CPU usage low (< 50%)
- [ ] Database connections pooled
- [ ] No memory leaks

### Response Time
- [ ] Bot responds within 2 seconds
- [ ] Health check responds quickly
- [ ] Database queries optimized

---

## 🔄 Maintenance Plan

### Regular Tasks
- [ ] Monitor logs weekly
- [ ] Check database size monthly
- [ ] Update dependencies quarterly
- [ ] Review costs monthly

### Backup Strategy
- [ ] Database backups automated (if available)
- [ ] Backup retention: 30 days
- [ ] Test restore process (optional)

### Updates
- [ ] Update bot code via Git push
- [ ] Platform auto-deploys on push
- [ ] Test updates in staging (optional)

---

## 🚨 Troubleshooting Guide

### Bot Not Responding
- [ ] Check `TELEGRAM_BOT_TOKEN` is correct
- [ ] Check logs for errors
- [ ] Verify bot is not blocked
- [ ] Test token with curl: `curl https://api.telegram.org/bot<TOKEN>/getMe`

### Database Connection Failed
- [ ] Check `DATABASE_URL` format
- [ ] Verify database is running
- [ ] Check network connectivity
- [ ] Verify credentials

### Build Failed
- [ ] Check Node.js version (18+)
- [ ] Verify all dependencies in `package.json`
- [ ] Check build logs for errors
- [ ] Test build locally first

### Image Upload Failed
- [ ] Verify Pinata API keys
- [ ] Check Pinata gateway URL
- [ ] Verify image format supported
- [ ] Check file size limits

### Health Check Failing
- [ ] Check database connection
- [ ] Verify health endpoint accessible
- [ ] Check logs for errors
- [ ] Test health check locally

---

## 📝 Notes

### Deployment URL
- Railway: `https://your-app.up.railway.app`
- Render: `https://your-app.onrender.com`
- Fly.io: `https://your-app.fly.dev`

### Database URL Format
```
postgresql://user:password@host:port/database
```

### Useful Commands
```bash
# Railway CLI
railway logs
railway status

# Render CLI
render logs

# Fly.io CLI
fly logs
fly status
```

---

## ✅ Final Verification

Before marking deployment as complete:

- [ ] All tests pass
- [ ] Bot responds to all commands
- [ ] Database working correctly
- [ ] Health check working
- [ ] Logs show no errors
- [ ] Monitoring setup (optional)
- [ ] Documentation updated

---

**Status**: ⏳ Ready to Deploy  
**Estimated Time**: 30-60 minutes  
**Next**: Follow `CLOUD_SETUP_PLAN.md` for detailed steps

