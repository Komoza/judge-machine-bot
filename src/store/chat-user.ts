import { eq, and } from 'drizzle-orm';
import { db } from '../db/client';
import { chatUsers } from '../db/schema';

export async function isUserInChat(userId: string, chatId: number): Promise<boolean> {
  const exists = await db
    .select()
    .from(chatUsers)
    .where(and(eq(chatUsers.user_id, userId), eq(chatUsers.chat_id, chatId)))
    .limit(1);

  return exists.length > 0;
}

export async function saveChatUser(userId: string, chatId: number): Promise<void> {
  await db.insert(chatUsers).values({
    user_id: userId,
    chat_id: chatId,
  });
}