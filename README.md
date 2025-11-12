# 🤖 Clanker Telegram Bot

Telegram bot untuk deploy Clanker tokens secara interaktif melalui chat.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Redis (optional, untuk session management)
- Telegram Bot Token

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env dengan konfigurasi Anda
nano .env
```

### Configuration

Edit `.env` file:

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
DATABASE_URL=postgresql://user:password@localhost:5432/clanker_bot
PRIVATE_KEY=your_private_key_here
RPC_URL=https://mainnet.base.org
```

### Development

```bash
# Run in development mode
npm run dev

# Build
npm run build

# Start production
npm start
```

## 📁 Project Structure

```
telegram-bot/
├── src/
│   ├── bot/              # Bot handlers
│   │   ├── index.ts      # Bot initialization
│   │   ├── commands.ts   # Command handlers
│   │   ├── handlers.ts    # Message handlers
│   │   ├── callbacks.ts  # Callback query handlers
│   │   └── messages.ts   # Message templates
│   ├── deployment/       # Deployment flows
│   │   ├── quick.ts      # Quick preset flow
│   │   └── manual.ts     # Manual preset flow
│   ├── database/         # Database layer
│   │   ├── index.ts      # DB initialization
│   │   ├── models.ts     # Type definitions
│   │   └── queries.ts    # Database queries
│   ├── utils/            # Utilities
│   │   ├── logger.ts     # Logging utility
│   │   └── session.ts    # Session management
│   ├── config/           # Configuration
│   │   ├── bot.ts        # Bot config
│   │   ├── database.ts   # DB config
│   │   └── clanker.ts    # Clanker SDK config
│   └── index.ts          # Entry point
├── package.json
├── tsconfig.json
└── README.md
```

## 🎯 Features

- ✅ Quick deployment preset
- ✅ Manual deployment preset
- ✅ V3 & V4 token support
- ✅ Interactive prompts
- ✅ Session management
- ✅ Deployment history
- ✅ Error handling

## ☁️ Cloud Deployment

Deploy bot ke cloud untuk 24/7 uptime:

### Quick Deploy (Railway.app - Recommended)
1. Push code to GitHub
2. Go to https://railway.app
3. Create new project → Deploy from GitHub
4. Add PostgreSQL database
5. Set environment variables
6. Deploy!

**See detailed guides:**
- `QUICK_DEPLOY.md` - Fast deployment guide
- `CLOUD_SETUP_PLAN.md` - Complete cloud setup plan
- `DEPLOYMENT_CHECKLIST.md` - Deployment checklist

### Supported Platforms
- **Railway.app** - $5/month (easiest, recommended)
- **Render.com** - Free tier available
- **Fly.io** - Free tier available
- **Docker** - Any cloud provider

### Health Check
Bot includes health check endpoint:
- `GET /health` - Health status
- `GET /` - Service info

Use for monitoring with UptimeRobot or similar services.

## 📚 Documentation

- `TELEGRAM_BOT_CONCEPT.md` - Bot concept & architecture
- `CLOUD_SETUP_PLAN.md` - Cloud deployment guide
- `DEPLOYMENT_OPTIONS.md` - All deployment options
- `QUICK_DEPLOY.md` - Quick deployment guide
- `DEPLOYMENT_CHECKLIST.md` - Deployment checklist

## 🔒 Security

⚠️ **Important**: 
- Never commit `.env` file
- Store secrets in cloud platform's environment variables
- Use strong database passwords
- Enable 2FA on cloud accounts

## 📝 License

MIT

