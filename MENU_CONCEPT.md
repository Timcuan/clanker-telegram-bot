# 📱 Clanker Bot - Menu Concept

## 🎯 Prinsip Desain

**Simple, Clear, User-Friendly**

Menu dirancang untuk mudah dipahami dan digunakan oleh semua user, bahkan yang belum pernah deploy token sebelumnya.

---

## 🏠 Main Menu (Home)

```
🚀 Clanker Bot

Welcome! Deploy your token on Base network.

[📦 Quick Deploy]  [⚙️ Custom Deploy]
[📊 My Tokens]     [❓ Help]
```

**Commands:**
- `/start` - Show main menu
- `/menu` - Show main menu

**Buttons:**
- `📦 Quick Deploy` → Quick deployment flow
- `⚙️ Custom Deploy` → Manual deployment flow
- `📊 My Tokens` → List user's deployed tokens
- `❓ Help` → Show help & commands

---

## 📦 Quick Deploy Menu

**Flow:**
1. **Token Info** (3 steps)
   - Name
   - Symbol
   - Image (upload or URL)

2. **Quick Settings** (3 steps)
   - Vanity Address? (Yes/No)
   - Fee Type? (Dynamic/Static)
   - Add Social Media? (Yes/No)

3. **Review & Deploy**
   - Show summary
   - Confirm & deploy

**Total Steps:** ~6-8 steps

**Example Flow:**
```
Bot: 📦 Quick Deploy - V4 Token
Bot: Enter token name:
User: My Awesome Token

Bot: Enter token symbol (3-10 chars):
User: MAT

Bot: Upload token image or send URL:
[📷 Upload Image] [🔗 Send URL] [⏭️ Skip]
User: [📷 Upload Image]

Bot: ✅ Image uploaded! (IPFS: ipfs://...)
Bot: Enable vanity address? (CA will end with custom suffix)
[✅ Yes] [❌ No]
User: [✅ Yes]

Bot: Enter vanity suffix (default: 0x4b07):
User: 0x4b07

Bot: Select fee type:
[📈 Dynamic (1-5%)] [📊 Static (3%)]
User: [📈 Dynamic]

Bot: Add social media links?
[✅ Yes] [❌ No]
User: [❌ No]

Bot: 📋 Configuration Summary:
━━━━━━━━━━━━━━━━━━━━━━━━
Token: My Awesome Token (MAT)
Image: ✅ Uploaded
Vanity: ✅ Enabled (0x4b07)
Fees: Dynamic (1% - 5%)
Social: None

Estimated Gas: ~0.01 ETH
━━━━━━━━━━━━━━━━━━━━━━━━

[✅ Deploy] [❌ Cancel]
```

---

## ⚙️ Custom Deploy Menu

**Flow:**
1. **Version Selection**
   - V3 or V4

2. **Token Info**
   - Name, Symbol, Image

3. **Address Settings**
   - Token Creator/Admin
   - Reward Recipient

4. **Pool Settings**
   - Quote Token (WETH/USDC/Custom)
   - Market Cap
   - Pool Positions

5. **Fee Settings**
   - Static or Dynamic
   - Custom fee values

6. **Vanity Settings**
   - Enable/Disable
   - Custom suffix

7. **Vault Settings** (V4 only)
   - Percentage
   - Duration

8. **Metadata**
   - Description
   - Social Media
   - Audit URLs

9. **Review & Deploy**

**Total Steps:** ~15-20 steps (dengan skip options)

---

## 📊 My Tokens Menu

```
📊 Your Deployed Tokens

1. My Awesome Token (MAT)
   Address: 0x1234...5678
   Version: V4
   Date: Nov 12, 2024
   [🔗 View on Clanker] [📊 View on BaseScan]

2. Another Token (ATK)
   Address: 0xabcd...efgh
   Version: V3
   Date: Nov 10, 2024
   [🔗 View on Clanker] [📊 View on BaseScan]

[🔄 Refresh] [🏠 Main Menu]
```

**Features:**
- List semua deployed tokens
- Quick links ke Clanker.world & BaseScan
- Sort by date (newest first)
- Pagination jika banyak tokens

---

## ❓ Help Menu

```
❓ Help & Commands

📚 Quick Commands:
/start - Main menu
/deploy_quick - Quick deployment
/deploy_manual - Custom deployment
/my_tokens - View your tokens
/help - This help

📖 Deployment Guide:
1. Use /deploy_quick for fast deployment
2. Follow the prompts step by step
3. Review your configuration
4. Confirm to deploy

💡 Tips:
• Quick deploy takes ~5 minutes
• Custom deploy gives full control
• Images are uploaded to IPFS automatically
• Vanity addresses may take time

❓ Need more help?
Contact: @support_bot

[🏠 Main Menu]
```

---

## 🎨 Button Layouts

### Inline Keyboards (for selections)

**Yes/No:**
```
[✅ Yes] [❌ No]
```

**Version Selection:**
```
[V3] [V4 (Recommended)]
```

**Fee Type:**
```
[📈 Dynamic (1-5%)] [📊 Static (3%)]
```

**Image Options:**
```
[📷 Upload Image] [🔗 Send URL] [⏭️ Skip]
```

**Action Buttons:**
```
[✅ Deploy] [❌ Cancel] [✏️ Edit]
```

### Reply Keyboards (for quick access)

**Main Menu:**
```
[📦 Quick Deploy] [⚙️ Custom Deploy]
[📊 My Tokens]    [❓ Help]
```

**Navigation:**
```
[⬅️ Back] [❌ Cancel] [🏠 Main Menu]
```

---

## 🔄 State Flow

```
START
  ↓
MAIN_MENU
  ↓
  ├─→ QUICK_DEPLOY
  │     ↓
  │   TOKEN_INFO (name, symbol, image)
  │     ↓
  │   QUICK_SETTINGS (vanity, fees, social)
  │     ↓
  │   REVIEW
  │     ↓
  │   DEPLOYING
  │     ↓
  │   COMPLETED
  │
  ├─→ CUSTOM_DEPLOY
  │     ↓
  │   VERSION_SELECT
  │     ↓
  │   TOKEN_INFO
  │     ↓
  │   ADDRESS_SETTINGS
  │     ↓
  │   POOL_SETTINGS
  │     ↓
  │   FEE_SETTINGS
  │     ↓
  │   VANITY_SETTINGS
  │     ↓
  │   VAULT_SETTINGS (V4)
  │     ↓
  │   METADATA
  │     ↓
  │   REVIEW
  │     ↓
  │   DEPLOYING
  │     ↓
  │   COMPLETED
  │
  ├─→ MY_TOKENS
  │     ↓
  │   TOKEN_LIST
  │
  └─→ HELP
        ↓
      HELP_MENU
```

---

## 📝 Menu Features

### 1. **Smart Defaults**
- Pre-filled dengan default values
- User bisa langsung tekan "Next" untuk skip
- Clear indication untuk required fields

### 2. **Progress Indicator**
```
Step 2 of 6: Enter token symbol
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[████░░░░░░░░░░░░] 33%
```

### 3. **Quick Actions**
- `/skip` - Skip current step
- `/back` - Go to previous step
- `/cancel` - Cancel deployment
- `/menu` - Return to main menu

### 4. **Input Validation**
- Real-time validation
- Clear error messages
- Suggestions untuk fix

### 5. **Confirmation Steps**
- Review sebelum deploy
- Edit option
- Clear summary

---

## 🎯 User Experience Goals

1. **Fast**: Quick deploy dalam < 5 menit
2. **Clear**: Setiap step jelas dan mudah dipahami
3. **Flexible**: Bisa skip optional steps
4. **Safe**: Confirmation sebelum deploy
5. **Informative**: Progress updates & status

---

## 📱 Example Conversations

### Quick Deploy (Happy Path)
```
User: /deploy_quick
Bot: 📦 Quick Deploy - V4 Token
Bot: Enter token name:
User: My Token
Bot: Enter token symbol:
User: MTK
Bot: Upload image or send URL:
User: [sends photo]
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

### With Errors
```
User: /deploy_quick
Bot: Enter token name:
User: A
Bot: ❌ Name must be 3-50 characters
Bot: Please enter a valid name:
User: My Awesome Token
Bot: ✅ Enter token symbol:
```

---

## 🚀 Implementation Priority

### Phase 1 (MVP)
1. ✅ Main menu
2. ✅ Quick deploy (basic flow)
3. ✅ Image upload (Pinata)
4. ✅ My tokens list
5. ✅ Help menu

### Phase 2
1. Custom deploy (full flow)
2. Advanced settings
3. Token management
4. Analytics

### Phase 3
1. Batch operations
2. Templates
3. Community features
4. Admin panel

---

**Status**: 📋 Concept Ready
**Next**: Implementation

