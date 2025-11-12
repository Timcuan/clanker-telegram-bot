import TelegramBot from 'node-telegram-bot-api';
import { getSession, clearSession } from '../utils/session.js';
import { sendWelcomeMessage, sendHelpMessage } from './messages.js';
import { showMainMenu } from './menu.js';
import { startQuickDeployment } from '../deployment/quick.js';
import { startManualDeployment } from '../deployment/manual.js';
import { getUserDeployments } from '../database/queries.js';
import { logger } from '../utils/logger.js';

export async function handleCommand(
  bot: TelegramBot,
  msg: TelegramBot.Message,
  command: string
) {
  const chatId = msg.chat.id;
  const userId = msg.from?.id;

  if (!userId) {
    return;
  }

  logger.info(`Command received: ${command} from user ${userId}`);

  try {
    switch (command) {
      case 'start':
      case 'menu':
        await showMainMenu(bot, chatId);
        break;

      case 'help':
        await sendHelpMessage(bot, chatId);
        break;

      case 'deploy':
      case 'deploy_quick':
        await startQuickDeployment(bot, chatId, userId);
        break;

      case 'deploy_manual':
        await startManualDeployment(bot, chatId, userId);
        break;

      case 'deploy_v3':
        await startQuickDeployment(bot, chatId, userId, 'v3');
        break;

      case 'deploy_v4':
        await startQuickDeployment(bot, chatId, userId, 'v4');
        break;

      case 'my_tokens':
        await handleMyTokens(bot, chatId, userId);
        break;

      case 'status':
        await handleStatus(bot, chatId, userId);
        break;

      case 'cancel':
        await handleCancel(bot, chatId, userId);
        break;

      default:
        await bot.sendMessage(chatId, '❌ Unknown command. Use /help to see available commands.');
    }
  } catch (error) {
    logger.error(`Error handling command ${command}:`, error);
    await bot.sendMessage(
      chatId,
      '❌ An error occurred. Please try again or contact support.'
    );
  }
}

async function handleMyTokens(bot: TelegramBot, chatId: number, userId: number) {
  try {
    const deployments = await getUserDeployments(userId);
    
    if (deployments.length === 0) {
      await bot.sendMessage(chatId, '📭 You haven\'t deployed any tokens yet.\n\nUse /deploy_quick to get started!');
      return;
    }

    let message = '📊 Your Deployed Tokens:\n\n';
    deployments.forEach((deployment, index) => {
      message += `${index + 1}. ${deployment.token_name} (${deployment.token_symbol})\n`;
      message += `   Address: \`${deployment.token_address}\`\n`;
      message += `   Version: ${deployment.version.toUpperCase()}\n`;
      message += `   Date: ${new Date(deployment.deployed_at).toLocaleDateString()}\n`;
      message += `   [View on Clanker](https://clanker.world/clanker/${deployment.token_address})\n\n`;
    });

    await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
  } catch (error) {
    logger.error('Error fetching user tokens:', error);
    await bot.sendMessage(chatId, '❌ Failed to fetch your tokens. Please try again.');
  }
}

async function handleStatus(bot: TelegramBot, chatId: number, userId: number) {
  try {
    const session = await getSession(userId, chatId);
    
    if (!session || session.status === 'idle') {
      await bot.sendMessage(chatId, 'ℹ️ No active deployment session.');
      return;
    }

    let message = '📊 Current Status:\n\n';
    message += `Status: ${session.status}\n`;
    message += `Step: ${session.currentStep || 'N/A'}\n`;

    if (session.deploymentData) {
      const data = session.deploymentData;
      if (data.name) message += `Token: ${data.name} (${data.symbol || 'N/A'})\n`;
    }

    if (session.deploymentTxHash) {
      message += `\nTransaction: \`${session.deploymentTxHash}\``;
    }

    await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
  } catch (error) {
    logger.error('Error fetching status:', error);
    await bot.sendMessage(chatId, '❌ Failed to fetch status. Please try again.');
  }
}

async function handleCancel(bot: TelegramBot, chatId: number, userId: number) {
  try {
    await clearSession(userId, chatId);
    await bot.sendMessage(chatId, '✅ Session cancelled. You can start a new deployment with /deploy_quick');
  } catch (error) {
    logger.error('Error cancelling session:', error);
    await bot.sendMessage(chatId, '❌ Failed to cancel session. Please try again.');
  }
}

