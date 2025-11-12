# 🚀 Quick Start Guide

## Menu Concept Summary

### 🏠 Main Menu
```
📦 Quick Deploy  |  ⚙️ Custom Deploy
📊 My Tokens     |  ❓ Help
```

### 📦 Quick Deploy Flow (6-8 steps)
1. Token Name
2. Token Symbol  
3. Image (Upload/URL/Skip)
4. Vanity Address (Yes/No)
5. Fee Type (Dynamic/Static)
6. Social Media (Yes/No)
7. Review & Deploy

### ⚙️ Custom Deploy Flow (15-20 steps)
Full control dengan semua opsi:
- Version selection
- Address settings
- Pool configuration
- Fee customization
- Vault settings
- Metadata

## 📷 Image Upload Feature

### Supported Methods:
1. **Upload Photo** - Send photo via Telegram
2. **Upload File** - Send image file as document
3. **URL** - Send image URL (http/https/ipfs)
4. **Skip** - Continue without image

### How It Works:
1. User sends image or URL
2. Bot uploads to Pinata IPFS
3. Returns IPFS URL: `ipfs://Qm...`
4. URL saved to deployment config

### Setup Pinata:
1. Get API keys from https://pinata.cloud
2. Add to `.env`:
   ```
   PINATA_API_KEY=your_key
   PINATA_SECRET_KEY=your_secret
   ```

## 🎯 Key Features

✅ **Simple Menu** - Easy to understand
✅ **Image Upload** - Via Pinata IPFS
✅ **Progress Indicator** - Shows deployment progress
✅ **Smart Defaults** - Pre-filled values
✅ **Quick Actions** - /skip, /back, /cancel
✅ **Error Handling** - Clear error messages

## 📝 Example Flow

```
User: /start
Bot: [Shows main menu]

User: [Clicks "📦 Quick Deploy"]
Bot: Enter token name:
User: My Token

Bot: Enter token symbol:
User: MTK

Bot: Upload image or send URL:
User: [Sends photo]
Bot: ⏳ Uploading to IPFS...
Bot: ✅ Image uploaded! (ipfs://...)

Bot: Enable vanity? [Yes] [No]
User: [Yes]
Bot: Enter suffix (default: 0x4b07):
User: 0x4b07

Bot: Fee type? [Dynamic] [Static]
User: [Dynamic]

Bot: Add social? [Yes] [No]
User: [No]

Bot: 📋 Summary... [Deploy] [Cancel]
User: [Deploy]
Bot: ⏳ Deploying...
Bot: ✅ Deployed! Address: 0x...
```

