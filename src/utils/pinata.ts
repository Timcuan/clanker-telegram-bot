import FormData from 'form-data';
import { logger } from './logger.js';

const PINATA_API_KEY = process.env.PINATA_API_KEY || '';
const PINATA_SECRET_KEY = process.env.PINATA_SECRET_KEY || '';
const PINATA_GATEWAY = process.env.PINATA_GATEWAY || 'https://gateway.pinata.cloud';

interface PinataResponse {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
}

/**
 * Upload file to Pinata IPFS
 */
export async function uploadToPinata(
  fileBuffer: Buffer,
  fileName: string,
  contentType?: string
): Promise<string> {
  if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
    throw new Error('Pinata API keys are not configured');
  }

  try {
    const formData = new FormData();
    formData.append('file', fileBuffer, {
      filename: fileName,
      contentType: contentType || 'image/jpeg',
    });

    // Optional: Add metadata
    const metadata = JSON.stringify({
      name: fileName,
      keyvalues: {
        uploadedBy: 'clanker-telegram-bot',
        uploadedAt: new Date().toISOString(),
      },
    });
    formData.append('pinataMetadata', metadata);

    // Optional: Add options
    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append('pinataOptions', options);

    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_KEY,
        ...formData.getHeaders(),
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      logger.error('Pinata upload failed:', errorText);
      throw new Error(`Pinata upload failed: ${response.status} ${errorText}`);
    }

    const data = (await response.json()) as PinataResponse;
    const ipfsHash = data.IpfsHash;
    const ipfsUrl = `ipfs://${ipfsHash}`;
    const gatewayUrl = `${PINATA_GATEWAY}/ipfs/${ipfsHash}`;

    logger.info(`✅ File uploaded to Pinata: ${ipfsUrl}`);
    return ipfsUrl;
  } catch (error) {
    logger.error('Error uploading to Pinata:', error);
    throw error;
  }
}

/**
 * Upload image from Telegram file to Pinata
 */
export async function uploadTelegramImage(
  fileId: string,
  botToken: string,
  fileName?: string
): Promise<string> {
  try {
    // Get file info from Telegram
    const fileInfoResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`
    );
    const fileInfo = await fileInfoResponse.json();

    if (!fileInfo.ok) {
      throw new Error('Failed to get file info from Telegram');
    }

    const filePath = fileInfo.result.file_path;
    const fileUrl = `https://api.telegram.org/file/bot${botToken}/${filePath}`;

    // Download file from Telegram
    const fileResponse = await fetch(fileUrl);
    if (!fileResponse.ok) {
      throw new Error('Failed to download file from Telegram');
    }

    const fileBuffer = Buffer.from(await fileResponse.arrayBuffer());
    const contentType = fileResponse.headers.get('content-type') || 'image/jpeg';
    const finalFileName = fileName || filePath.split('/').pop() || 'image.jpg';

    // Upload to Pinata
    const ipfsUrl = await uploadToPinata(fileBuffer, finalFileName, contentType);
    return ipfsUrl;
  } catch (error) {
    logger.error('Error uploading Telegram image to Pinata:', error);
    throw error;
  }
}

/**
 * Validate IPFS URL or convert gateway URL to IPFS URL
 */
export function normalizeIpfsUrl(url: string): string {
  // If already IPFS URL, return as is
  if (url.startsWith('ipfs://')) {
    return url;
  }

  // If gateway URL, extract hash and convert
  const gatewayPattern = /\/ipfs\/([a-zA-Z0-9]+)/;
  const match = url.match(gatewayPattern);
  if (match) {
    return `ipfs://${match[1]}`;
  }

  // If regular URL, return as is (will be used directly)
  return url;
}

