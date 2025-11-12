import TelegramBot from 'node-telegram-bot-api';
import { config } from '../config/bot.js';
import { handleCommand } from './commands.js';
import { handleMessage } from './handlers.js';
import { handleCallbackQuery } from './callbacks.js';
import { logger } from '../utils/logger.js';

export class TelegramBot {
  private bot: TelegramBot;

  constructor() {
    const token = config.token;
    if (!token) {
      throw new Error('TELEGRAM_BOT_TOKEN is required');
    }

    // Use polling for development, webhook for production
    this.bot = new TelegramBot(token, {
      polling: config.usePolling,
    });

    this.setupHandlers();
  }

  private setupHandlers() {
    // Command handlers
    this.bot.onText(/\/start/, (msg) => handleCommand(this.bot, msg, 'start'));
    this.bot.onText(/\/help/, (msg) => handleCommand(this.bot, msg, 'help'));
    this.bot.onText(/\/deploy/, (msg) => handleCommand(this.bot, msg, 'deploy'));
    this.bot.onText(/\/deploy_quick/, (msg) => handleCommand(this.bot, msg, 'deploy_quick'));
    this.bot.onText(/\/deploy_manual/, (msg) => handleCommand(this.bot, msg, 'deploy_manual'));
    this.bot.onText(/\/deploy_v3/, (msg) => handleCommand(this.bot, msg, 'deploy_v3'));
    this.bot.onText(/\/deploy_v4/, (msg) => handleCommand(this.bot, msg, 'deploy_v4'));
    this.bot.onText(/\/my_tokens/, (msg) => handleCommand(this.bot, msg, 'my_tokens'));
    this.bot.onText(/\/status/, (msg) => handleCommand(this.bot, msg, 'status'));
    this.bot.onText(/\/cancel/, (msg) => handleCommand(this.bot, msg, 'cancel'));

    // Callback query handlers (for inline keyboards)
    this.bot.on('callback_query', (query) => handleCallbackQuery(this.bot, query));

    // Message handlers (for text input)
    this.bot.on('message', (msg) => handleMessage(this.bot, msg));

    // Error handler
    this.bot.on('error', (error) => {
      logger.error('Bot error:', error);
    });

    // Polling error handler
    this.bot.on('polling_error', (error) => {
      logger.error('Polling error:', error);
    });
  }

  async start() {
    const botInfo = await this.bot.getMe();
    logger.info(`✅ Bot started: @${botInfo.username}`);
    return botInfo;
  }

  async stop() {
    await this.bot.stopPolling();
    logger.info('✅ Bot stopped');
  }

  getBot(): TelegramBot {
    return this.bot;
  }
}

