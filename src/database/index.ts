import { Pool } from 'pg';
import { dbConfig } from '../config/database.js';
import { logger } from '../utils/logger.js';

let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    if (dbConfig.url) {
      pool = new Pool({ connectionString: dbConfig.url });
    } else {
      pool = new Pool({
        host: dbConfig.host,
        port: dbConfig.port,
        database: dbConfig.database,
        user: dbConfig.user,
        password: dbConfig.password,
      });
    }
  }
  return pool;
}

export async function initializeDatabase() {
  const pool = getPool();
  
  try {
    // Test connection
    await pool.query('SELECT NOW()');
    logger.info('✅ Database connection established');

    // Create tables if they don't exist
    await createTables();
  } catch (error) {
    logger.error('Failed to initialize database:', error);
    throw error;
  }
}

async function createTables() {
  const pool = getPool();

  // Users table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      telegram_id BIGINT UNIQUE NOT NULL,
      username VARCHAR(255),
      first_name VARCHAR(255),
      last_name VARCHAR(255),
      wallet_address VARCHAR(42),
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `);

  // Deployments table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS deployments (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      token_name VARCHAR(255) NOT NULL,
      token_symbol VARCHAR(50) NOT NULL,
      token_address VARCHAR(42) NOT NULL,
      tx_hash VARCHAR(66) NOT NULL,
      version VARCHAR(10) NOT NULL,
      preset VARCHAR(20) NOT NULL,
      config JSONB,
      status VARCHAR(20) NOT NULL,
      error_message TEXT,
      deployed_at TIMESTAMP DEFAULT NOW()
    );
  `);

  // Sessions table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS sessions (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      chat_id BIGINT NOT NULL,
      current_step VARCHAR(100),
      deployment_data JSONB,
      status VARCHAR(20) NOT NULL DEFAULT 'idle',
      deployment_tx_hash VARCHAR(66),
      deployment_address VARCHAR(42),
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      expires_at TIMESTAMP
    );
  `);

  // Create indexes
  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_users_telegram_id ON users(telegram_id);
    CREATE INDEX IF NOT EXISTS idx_deployments_user_id ON deployments(user_id);
    CREATE INDEX IF NOT EXISTS idx_deployments_token_address ON deployments(token_address);
    CREATE INDEX IF NOT EXISTS idx_sessions_user_chat ON sessions(user_id, chat_id);
  `);

  logger.info('✅ Database tables created/verified');
}

