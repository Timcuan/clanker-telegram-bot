import TelegramBot from 'node-telegram-bot-api';
import { createInlineKeyboard, createReplyKeyboard } from './messages.js';

/**
 * Show main menu
 */
export async function showMainMenu(bot: TelegramBot, chatId: number) {
  const message = `🚀 *Clanker Bot*

Welcome! Deploy your token on Base network easily.

*Quick Actions:*
📦 Quick Deploy - Fast deployment (~5 min)
⚙️ Custom Deploy - Full control deployment
📊 My Tokens - View your deployed tokens
❓ Help - Get help & commands`;

  const keyboard = createReplyKeyboard([
    ['📦 Quick Deploy', '⚙️ Custom Deploy'],
    ['📊 My Tokens', '❓ Help'],
  ]);

  await bot.sendMessage(chatId, message, {
    parse_mode: 'Markdown',
    reply_markup: keyboard,
  });
}

/**
 * Show image upload options
 */
export async function showImageOptions(bot: TelegramBot, chatId: number) {
  const message = `📷 *Token Image*

Upload your token image or provide a URL.

*Options:*
📷 Upload Image - Upload via Telegram
🔗 Send URL - Provide image URL
⏭️ Skip - Continue without image`;

  const keyboard = createInlineKeyboard([
    [
      { text: '📷 Upload Image', callback_data: 'image_upload' },
      { text: '🔗 Send URL', callback_data: 'image_url' },
    ],
    [{ text: '⏭️ Skip', callback_data: 'image_skip' }],
  ]);

  await bot.sendMessage(chatId, message, {
    parse_mode: 'Markdown',
    reply_markup: keyboard,
  });
}

/**
 * Show vanity address options
 */
export async function showVanityOptions(bot: TelegramBot, chatId: number) {
  const message = `🔮 *Vanity Address*

Enable vanity address? Your contract address will end with a custom suffix.

*Example:* \`0x...4b07\`

*Options:*
✅ Yes - Enable vanity (may take 5-15 min)
❌ No - Use random address (instant)`;

  const keyboard = createInlineKeyboard([
    [
      { text: '✅ Yes', callback_data: 'vanity_yes' },
      { text: '❌ No', callback_data: 'vanity_no' },
    ],
  ]);

  await bot.sendMessage(chatId, message, {
    parse_mode: 'Markdown',
    reply_markup: keyboard,
  });
}

/**
 * Show fee type selection
 */
export async function showFeeTypeOptions(bot: TelegramBot, chatId: number) {
  const message = `💸 *Fee Configuration*

Select fee type for your token.

*Options:*
📈 Dynamic Fees - 1% min, 5% max (recommended)
📊 Static Fees - 3% flat fee`;

  const keyboard = createInlineKeyboard([
    [
      { text: '📈 Dynamic (1-5%)', callback_data: 'fee_dynamic' },
      { text: '📊 Static (3%)', callback_data: 'fee_static' },
    ],
  ]);

  await bot.sendMessage(chatId, message, {
    parse_mode: 'Markdown',
    reply_markup: keyboard,
  });
}

/**
 * Show social media options
 */
export async function showSocialMediaOptions(bot: TelegramBot, chatId: number) {
  const message = `📱 *Social Media Links*

Add social media links for better token visibility?

*Options:*
✅ Yes - Add social media links
❌ No - Skip`;

  const keyboard = createInlineKeyboard([
    [
      { text: '✅ Yes', callback_data: 'social_yes' },
      { text: '❌ No', callback_data: 'social_no' },
    ],
  ]);

  await bot.sendMessage(chatId, message, {
    parse_mode: 'Markdown',
    reply_markup: keyboard,
  });
}

/**
 * Show deployment summary
 */
export async function showDeploymentSummary(
  bot: TelegramBot,
  chatId: number,
  summary: {
    name: string;
    symbol: string;
    image?: string;
    vanity?: { enabled: boolean; suffix?: string };
    fees: { type: string; details?: string };
    social?: boolean;
  }
) {
  let message = `📋 *Deployment Summary*\n\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*Token:* ${summary.name} (${summary.symbol})\n`;
  
  if (summary.image) {
    message += `*Image:* ✅ ${summary.image.substring(0, 50)}...\n`;
  } else {
    message += `*Image:* ❌ None\n`;
  }

  if (summary.vanity?.enabled) {
    message += `*Vanity:* ✅ Enabled (${summary.vanity.suffix || '0x4b07'})\n`;
  } else {
    message += `*Vanity:* ❌ Disabled\n`;
  }

  message += `*Fees:* ${summary.fees.type}`;
  if (summary.fees.details) {
    message += ` (${summary.fees.details})`;
  }
  message += `\n`;

  if (summary.social) {
    message += `*Social Media:* ✅ Added\n`;
  } else {
    message += `*Social Media:* ❌ None\n`;
  }

  message += `\n*Estimated Gas:* ~0.01 ETH\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `Ready to deploy?`;

  const keyboard = createInlineKeyboard([
    [
      { text: '✅ Deploy', callback_data: 'deploy_confirm' },
      { text: '❌ Cancel', callback_data: 'deploy_cancel' },
    ],
    [{ text: '✏️ Edit', callback_data: 'deploy_edit' }],
  ]);

  await bot.sendMessage(chatId, message, {
    parse_mode: 'Markdown',
    reply_markup: keyboard,
  });
}

/**
 * Show progress indicator
 */
export function createProgressMessage(current: number, total: number): string {
  const percentage = Math.round((current / total) * 100);
  const filled = Math.round((current / total) * 20);
  const empty = 20 - filled;
  const bar = '█'.repeat(filled) + '░'.repeat(empty);
  return `Step ${current} of ${total}\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n[${bar}] ${percentage}%`;
}

/**
 * Show navigation buttons
 */
export function createNavigationKeyboard() {
  return createInlineKeyboard([
    [
      { text: '⬅️ Back', callback_data: 'nav_back' },
      { text: '❌ Cancel', callback_data: 'nav_cancel' },
    ],
    [{ text: '🏠 Main Menu', callback_data: 'nav_main' }],
  ]);
}

