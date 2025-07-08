import {dailyPidor, db} from '../db/client';
import {and, count, desc, eq} from 'drizzle-orm';
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


export async function getPidorStats(chatId: string) {
  return db
    .select({
      user_id: dailyPidor.pidor_id,
      count: count(dailyPidor.pidor_id),
    })
    .from(dailyPidor)
    .where(eq(dailyPidor.chat_id, chatId))
    .groupBy(dailyPidor.pidor_id)
    .orderBy(desc(count(dailyPidor.pidor_id)));
}