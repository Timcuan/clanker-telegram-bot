import TelegramBot from 'node-telegram-bot-api';
import { getSession } from '../utils/session.js';
import { continueQuickDeployment } from '../deployment/quick.js';
import { continueManualDeployment } from '../deployment/manual.js';
import { logger } from '../utils/logger.js';

export async function handleCallbackQuery(
  bot: TelegramBot,
  query: TelegramBot.CallbackQuery
) {
  const chatId = query.message?.chat.id;
  const userId = query.from.id;
  const data = query.data;

  if (!chatId || !data) {
    return;
  }

  try {
    // Answer callback query to remove loading state
    await bot.answerCallbackQuery(query.id);

    const session = await getSession(userId, chatId);

    if (!session || session.status === 'idle') {
      await bot.sendMessage(chatId, '❌ No active session. Please start a new deployment with /deploy_quick');
      return;
    }

    // Route to appropriate deployment handler
    if (session.deploymentData?.preset === 'quick') {
      await continueQuickDeployment(bot, chatId, userId, data, true);
    } else if (session.deploymentData?.preset === 'manual') {
      await continueManualDeployment(bot, chatId, userId, data, true);
    }
  } catch (error) {
    logger.error('Error handling callback query:', error);
    await bot.sendMessage(
      chatId,
      '❌ An error occurred. Please try again or use /cancel to start over.'
    );
  }
}

