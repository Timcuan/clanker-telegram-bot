#!/usr/bin/env node

import dotenv from 'dotenv';
import http from 'http';
import { TelegramBot } from './bot/index.js';
import { initializeDatabase } from './database/index.js';
import { logger } from './utils/logger.js';
import { checkHealth } from './utils/health.js';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

/**
 * Create simple HTTP server for health checks
 */
function createHealthServer() {
  const server = http.createServer(async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    if (req.url === '/health' && req.method === 'GET') {
      try {
        const health = await checkHealth();
        const statusCode = health.status === 'healthy' ? 200 : 503;
        res.writeHead(statusCode);
        res.end(JSON.stringify(health, null, 2));
      } catch (error) {
        logger.error('Health check error:', error);
        res.writeHead(503);
        res.end(JSON.stringify({ status: 'unhealthy', error: 'Health check failed' }));
      }
    } else if (req.url === '/' && req.method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify({ 
        service: 'Clanker Telegram Bot',
        status: 'running',
        uptime: process.uptime()
      }));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Not found' }));
    }
  });

  return server;
}

async function main() {
  try {
    logger.info('🚀 Starting Clanker Telegram Bot...');

    // Initialize database
    logger.info('📊 Initializing database...');
    await initializeDatabase();
    logger.info('✅ Database initialized');

    // Start health check server (for cloud monitoring)
    const healthServer = createHealthServer();
    healthServer.listen(PORT, () => {
      logger.info(`🏥 Health check server running on port ${PORT}`);
      logger.info(`   Health endpoint: http://localhost:${PORT}/health`);
    });

    // Initialize and start bot
    logger.info('🤖 Initializing Telegram bot...');
    const bot = new TelegramBot();
    await bot.start();
    logger.info('✅ Bot started successfully');

    // Graceful shutdown
    const shutdown = async (signal: string) => {
      logger.info(`🛑 Received ${signal}, shutting down gracefully...`);
      await bot.stop();
      healthServer.close(() => {
        logger.info('✅ Health server closed');
        process.exit(0);
      });
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
  } catch (error) {
    logger.error('❌ Failed to start bot:', error);
    process.exit(1);
  }
}

main();

