import { getSession as getSessionFromDB, saveSession, deleteSession } from '../database/queries.js';
import type { UserSession } from '../database/models.js';

export async function getSession(userId: number, chatId: number): Promise<UserSession | null> {
  return await getSessionFromDB(userId, chatId);
}

export async function updateSession(
  userId: number,
  chatId: number,
  updates: Partial<UserSession>
): Promise<void> {
  const session = await getSession(userId, chatId);
  if (session) {
    await saveSession({
      ...session,
      ...updates,
      updatedAt: new Date(),
    });
  }
}

export async function clearSession(userId: number, chatId: number): Promise<void> {
  await deleteSession(userId, chatId);
}

