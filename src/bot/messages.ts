import TelegramBot from 'node-telegram-bot-api';

export async function sendWelcomeMessage(bot: TelegramBot, chatId: number) {
  const message = `🚀 *Welcome to Clanker Bot!*

Deploy your token on Base network easily through Telegram!

*Quick Commands:*
/deploy_quick - Quick deployment (recommended)
/deploy_manual - Full control deployment
/my_tokens - View your deployed tokens
/help - Get help

*Features:*
✅ Quick deployment in minutes
✅ Vanity address support
✅ Custom fee configuration
✅ Social media integration
✅ Auto-verification on clanker.world

Let's get started! 🎉`;

  await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
}

export async function sendHelpMessage(bot: TelegramBot, chatId: number) {
  const message = `📚 *Clanker Bot Help*

*Available Commands:*

/deploy_quick - Start quick deployment (minimal input)
/deploy_manual - Start manual deployment (full control)
/deploy_v3 - Deploy V3 token
/deploy_v4 - Deploy V4 token (recommended)

/my_tokens - View all your deployed tokens
/status - Check current deployment status
/cancel - Cancel current deployment session
/help - Show this help message

*Deployment Flow:*
1. Use /deploy_quick or /deploy_manual
2. Follow the interactive prompts
3. Confirm your configuration
4. Wait for deployment confirmation
5. Get your token address and links

*Need Help?*
Contact support or use /cancel to start over.

Happy deploying! 🚀`;

  await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
}

export function createInlineKeyboard(buttons: Array<Array<{ text: string; callback_data: string }>>) {
  return {
    inline_keyboard: buttons,
  };
}

export function createReplyKeyboard(buttons: Array<Array<string>>, options?: {
  resize_keyboard?: boolean;
  one_time_keyboard?: boolean;
}) {
  return {
    keyboard: buttons.map(row => row.map(text => ({ text }))),
    resize_keyboard: options?.resize_keyboard ?? true,
    one_time_keyboard: options?.one_time_keyboard ?? true,
  };
}

