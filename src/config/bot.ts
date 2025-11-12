import dotenv from 'dotenv';

dotenv.config();

export const config = {
  token: process.env.TELEGRAM_BOT_TOKEN || '',
  usePolling: process.env.NODE_ENV !== 'production',
  adminIds: (process.env.BOT_ADMIN_IDS || '').split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id)),
  maxDeploymentsPerHour: parseInt(process.env.MAX_DEPLOYMENTS_PER_HOUR || '5'),
  maxDeploymentsPerDay: parseInt(process.env.MAX_DEPLOYMENTS_PER_DAY || '20'),
  sessionTimeoutMinutes: parseInt(process.env.SESSION_TIMEOUT_MINUTES || '30'),
};

