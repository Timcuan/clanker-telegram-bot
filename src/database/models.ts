export interface User {
  id: number;
  telegramId: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  walletAddress?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Deployment {
  id: number;
  userId: number;
  tokenName: string;
  tokenSymbol: string;
  tokenAddress: string;
  txHash: string;
  version: 'v3' | 'v4';
  preset: 'quick' | 'manual';
  config: Record<string, unknown>;
  status: 'success' | 'failed';
  errorMessage?: string;
  deployedAt: Date;
}

export interface UserSession {
  id: number;
  userId: number;
  chatId: number;
  currentStep?: string;
  deploymentData?: Record<string, unknown>;
  deploymentStatus: 'idle' | 'configuring' | 'deploying' | 'completed' | 'failed';
  deploymentTxHash?: string;
  deploymentAddress?: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
}

