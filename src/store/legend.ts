import {dailyLegend, db} from '../db/client';
import {and, count, desc, eq} from 'drizzle-orm';
import {format} from 'date-fns';

const today = () => format(new Date(), 'yyyy-MM-dd');

export async function getTodayLegend(chatId: number) {
  return db.query.dailyLegend.findFirst({
    where: and(
      eq(dailyLegend.chat_id, chatId.toString()),
      eq(dailyLegend.date, today())
    )
  });
}

export async function saveLegend(chatId: number, legendId: string, authorId: string) {
  await db.insert(dailyLegend).values({
    chat_id: chatId.toString(),
    legend_id: legendId,
    author_id: authorId,
    date: today()
  });
}


export async function getLegendStats(chatId: string) {
  return db
    .select({
      user_id: dailyLegend.legend_id,
      count: count(dailyLegend.legend_id),
    })
    .from(dailyLegend)
    .where(eq(dailyLegend.chat_id, chatId))
    .groupBy(dailyLegend.legend_id)
    .orderBy(desc(count(dailyLegend.legend_id)));
}