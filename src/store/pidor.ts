import {dailyPidor, db} from '../db/client';
import {and, eq} from 'drizzle-orm';
import {format} from 'date-fns';

const today = () => format(new Date(), 'yyyy-MM-dd');

export async function getTodayPidor(chatId: number) {
  return db.query.dailyPidor.findFirst({
    where: and(
      eq(dailyPidor.chat_id, chatId.toString()),
      eq(dailyPidor.date, today())
    )
  });
}

export async function savePidor(chatId: number, pidorId: string, authorId: string) {
  await db.insert(dailyPidor).values({
    chat_id: chatId.toString(),
    pidor_id: pidorId,
    author_id: authorId,
    date: today()
  });
}