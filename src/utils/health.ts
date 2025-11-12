import { getPool } from '../database/index.js';
import { logger } from './logger.js';

export interface HealthStatus {
  status: 'healthy' | 'unhealthy';
  uptime: number;
  database: 'connected' | 'disconnected';
  timestamp: string;
  memory?: {
    used: number;
    total: number;
    percentage: number;
  };
}

/**
 * Check bot health status
 */
export async function checkHealth(): Promise<HealthStatus> {
  const startTime = Date.now();
  const status: HealthStatus = {
    status: 'healthy',
    uptime: process.uptime(),
    database: 'disconnected',
    timestamp: new Date().toISOString(),
  };

  // Check memory usage
  const memUsage = process.memoryUsage();
  status.memory = {
    used: Math.round(memUsage.heapUsed / 1024 / 1024), // MB
    total: Math.round(memUsage.heapTotal / 1024 / 1024), // MB
    percentage: Math.round((memUsage.heapUsed / memUsage.heapTotal) * 100),
  };

  // Check database connection
  try {
    const pool = getPool();
    await pool.query('SELECT 1');
    status.database = 'connected';
  } catch (error) {
    logger.error('Database health check failed:', error);
    status.database = 'disconnected';
    status.status = 'unhealthy';
  }

  const duration = Date.now() - startTime;
  logger.debug(`Health check completed in ${duration}ms`);

  return status;
}

/**
 * Create HTTP health check endpoint (if needed)
 */
export function createHealthCheckHandler() {
  return async (req: any, res: any) => {
    try {
      const health = await checkHealth();
      const statusCode = health.status === 'healthy' ? 200 : 503;
      res.status(statusCode).json(health);
    } catch (error) {
      logger.error('Health check error:', error);
      res.status(503).json({
        status: 'unhealthy',
        error: 'Health check failed',
      });
    }
  };
}

