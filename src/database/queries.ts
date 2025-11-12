import { getPool } from './index.js';
import type { User, Deployment, UserSession } from './models.js';

export async function getUser(telegramId: number): Promise<User | null> {
  const pool = getPool();
  const result = await pool.query('SELECT * FROM users WHERE telegram_id = $1', [telegramId]);
  return result.rows[0] || null;
}

export async function createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
  const pool = getPool();
  const result = await pool.query(
    `INSERT INTO users (telegram_id, username, first_name, last_name, wallet_address)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [user.telegramId, user.username, user.firstName, user.lastName, user.walletAddress]
  );
  return result.rows[0];
}

export async function getSession(userId: number, chatId: number): Promise<UserSession | null> {
  const pool = getPool();
  const result = await pool.query(
    'SELECT * FROM sessions WHERE user_id = $1 AND chat_id = $2',
    [userId, chatId]
  );
  return result.rows[0] || null;
}

export async function createSession(session: Omit<UserSession, 'id'>): Promise<UserSession> {
  const pool = getPool();
  const result = await pool.query(
    `INSERT INTO sessions (user_id, chat_id, current_step, deployment_data, status, deployment_tx_hash, deployment_address, expires_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [
      session.userId,
      session.chatId,
      session.currentStep,
      JSON.stringify(session.deploymentData),
      session.deploymentStatus,
      session.deploymentTxHash,
      session.deploymentAddress,
      session.expiresAt,
    ]
  );
  return result.rows[0];
}

export async function saveSession(session: UserSession): Promise<UserSession> {
  const pool = getPool();
  const result = await pool.query(
    `UPDATE sessions
     SET current_step = $1, deployment_data = $2, status = $3, deployment_tx_hash = $4, 
         deployment_address = $5, updated_at = NOW(), expires_at = $6
     WHERE user_id = $7 AND chat_id = $8
     RETURNING *`,
    [
      session.currentStep,
      JSON.stringify(session.deploymentData),
      session.deploymentStatus,
      session.deploymentTxHash,
      session.deploymentAddress,
      session.expiresAt,
      session.userId,
      session.chatId,
    ]
  );
  return result.rows[0];
}

export async function deleteSession(userId: number, chatId: number): Promise<void> {
  const pool = getPool();
  await pool.query('DELETE FROM sessions WHERE user_id = $1 AND chat_id = $2', [userId, chatId]);
}

export async function createDeployment(deployment: Omit<Deployment, 'id' | 'deployedAt'>): Promise<Deployment> {
  const pool = getPool();
  const result = await pool.query(
    `INSERT INTO deployments (user_id, token_name, token_symbol, token_address, tx_hash, version, preset, config, status, error_message)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     RETURNING *`,
    [
      deployment.userId,
      deployment.tokenName,
      deployment.tokenSymbol,
      deployment.tokenAddress,
      deployment.txHash,
      deployment.version,
      deployment.preset,
      JSON.stringify(deployment.config),
      deployment.status,
      deployment.errorMessage,
    ]
  );
  return result.rows[0];
}

export async function getUserDeployments(userId: number): Promise<Deployment[]> {
  const pool = getPool();
  const result = await pool.query(
    'SELECT * FROM deployments WHERE user_id = $1 ORDER BY deployed_at DESC',
    [userId]
  );
  return result.rows;
}

