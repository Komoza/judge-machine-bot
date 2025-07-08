import { eq } from 'drizzle-orm';
import {TUser} from "../types/user";
import {db, users} from "../db/client";

export function loadUsers(): Promise<TUser[]> {
  return db.select().from(users);
}

export async function saveUser(user: TUser): Promise<boolean> {
  const exists = await db.select().from(users).where(eq(users.id, user.id)).limit(1);

  if (exists.length > 0) return false;

  await db.insert(users).values({
    id: user.id,
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    is_bot: user.is_bot,
    language_code: user.language_code,
    is_premium: user.is_premium,
  });

  return true;
}

export async function getUserById(id: string): Promise<TUser | undefined> {
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result[0];
}