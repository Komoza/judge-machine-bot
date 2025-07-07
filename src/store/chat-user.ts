import {eq, and, inArray} from 'drizzle-orm';
import {db, users} from '../db/client';
import { chatUsers } from '../db/schema';
import {TUser} from "../types/user";

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

export async function getUsersByChat(chatId: number): Promise<TUser[]> {
  const chatUserLinks = await db
    .select({ userId: chatUsers.user_id })
    .from(chatUsers)
    .where(eq(chatUsers.chat_id, chatId));

  if (!chatUserLinks.length) return [];

  const userIds = chatUserLinks.map(link => link.userId);

  return db
    .select()
    .from(users)
    .where(inArray(users.id, userIds));
}