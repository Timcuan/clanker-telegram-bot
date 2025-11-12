import TelegramBot from 'node-telegram-bot-api';
import { getSession } from '../utils/session.js';
import { continueQuickDeployment } from '../deployment/quick.js';
import { continueManualDeployment } from '../deployment/manual.js';
import { handleImageUpload } from './image-handler.js';
import { logger } from '../utils/logger.js';

export async function handleMessage(bot: TelegramBot, msg: TelegramBot.Message) {
  // Ignore commands (handled by command handlers)
  if (msg.text?.startsWith('/')) {
    return;
  }

  const chatId = msg.chat.id;
  const userId = msg.from?.id;

  if (!userId) {
    return;
  }

  try {
    const session = await getSession(userId, chatId);

    // Handle image upload if in image step
    if (session && session.currentStep === 'image') {
      if (msg.photo || msg.document || (msg.text && (msg.text.startsWith('http') || msg.text.startsWith('ipfs://')))) {
        await handleImageUpload(bot, msg);
        return;
      }
    }

    // Handle text messages
    if (!msg.text) {
      return;
    }

    if (!session || session.status === 'idle') {
      // No active session, ignore message
      return;
    }

    // Route to appropriate deployment handler based on preset
    if (session.deploymentData?.preset === 'quick') {
      await continueQuickDeployment(bot, chatId, userId, msg.text);
    } else if (session.deploymentData?.preset === 'manual') {
      await continueManualDeployment(bot, chatId, userId, msg.text);
    }
  } catch (error) {
    logger.error('Error handling message:', error);
    await bot.sendMessage(
      chatId,
      '❌ An error occurred processing your input. Please try again or use /cancel to start over.'
    );
  }
}

