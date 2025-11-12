import TelegramBot from 'node-telegram-bot-api';
import { uploadTelegramImage, normalizeIpfsUrl } from '../utils/pinata.js';
import { getSession, updateSession } from '../utils/session.js';
import { config } from '../config/bot.js';
import { logger } from '../utils/logger.js';

/**
 * Handle image upload from Telegram
 */
export async function handleImageUpload(
  bot: TelegramBot,
  msg: TelegramBot.Message
) {
  const chatId = msg.chat.id;
  const userId = msg.from?.id;

  if (!userId) {
    return;
  }

  try {
    // Check if user is in image upload step
    const session = await getSession(userId, chatId);
    if (!session || session.currentStep !== 'image') {
      return; // Not in image upload step, ignore
    }

    // Handle photo
    if (msg.photo && msg.photo.length > 0) {
      // Get largest photo
      const photo = msg.photo[msg.photo.length - 1];
      const fileId = photo.file_id;

      await bot.sendMessage(chatId, '⏳ Uploading image to IPFS...');

      try {
        // Upload to Pinata
        const ipfsUrl = await uploadTelegramImage(
          fileId,
          config.token,
          `token_${Date.now()}.jpg`
        );

        // Update session
        await updateSession(userId, chatId, {
          deploymentData: {
            ...session.deploymentData,
            image: ipfsUrl,
          },
        });

        await bot.sendMessage(
          chatId,
          `✅ *Image uploaded successfully!*\n\nIPFS: \`${ipfsUrl}\`\n\nContinuing to next step...`,
          { parse_mode: 'Markdown' }
        );

        // Continue to next step
        // This will be handled by the deployment flow
      } catch (error) {
        logger.error('Error uploading image:', error);
        await bot.sendMessage(
          chatId,
          '❌ Failed to upload image. Please try again or use a URL instead.\n\nYou can send an image URL or use /skip to continue without image.'
        );
      }
      return;
    }

    // Handle document (image file)
    if (msg.document && msg.document.mime_type?.startsWith('image/')) {
      const fileId = msg.document.file_id;

      await bot.sendMessage(chatId, '⏳ Uploading image to IPFS...');

      try {
        const ipfsUrl = await uploadTelegramImage(
          fileId,
          config.token,
          msg.document.file_name || `token_${Date.now()}.jpg`
        );

        await updateSession(userId, chatId, {
          deploymentData: {
            ...session.deploymentData,
            image: ipfsUrl,
          },
        });

        await bot.sendMessage(
          chatId,
          `✅ *Image uploaded successfully!*\n\nIPFS: \`${ipfsUrl}\`\n\nContinuing to next step...`,
          { parse_mode: 'Markdown' }
        );
      } catch (error) {
        logger.error('Error uploading image:', error);
        await bot.sendMessage(
          chatId,
          '❌ Failed to upload image. Please try again or use a URL instead.'
        );
      }
      return;
    }

    // Handle URL
    if (msg.text && (msg.text.startsWith('http://') || msg.text.startsWith('https://') || msg.text.startsWith('ipfs://'))) {
      const imageUrl = normalizeIpfsUrl(msg.text);

      await updateSession(userId, chatId, {
        deploymentData: {
          ...session.deploymentData,
          image: imageUrl,
        },
      });

      await bot.sendMessage(
        chatId,
        `✅ *Image URL saved!*\n\nURL: \`${imageUrl}\`\n\nContinuing to next step...`,
        { parse_mode: 'Markdown' }
      );
      return;
    }

    // Invalid input
    await bot.sendMessage(
      chatId,
      '❌ Please send an image (photo or file) or a valid image URL.\n\nYou can also use /skip to continue without image.'
    );
  } catch (error) {
    logger.error('Error handling image upload:', error);
    await bot.sendMessage(chatId, '❌ An error occurred. Please try again.');
  }
}

/**
 * Validate image URL
 */
export function isValidImageUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return (
      urlObj.protocol === 'http:' ||
      urlObj.protocol === 'https:' ||
      url.startsWith('ipfs://')
    );
  } catch {
    return false;
  }
}

