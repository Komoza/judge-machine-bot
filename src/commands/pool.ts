import { Telegraf } from 'telegraf';
import { db } from '../db/client';
import { chatUsers } from '../db/schema';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

export const setupPoolCommand = (bot: Telegraf) => {
  bot.command('pool', async (ctx) => {
    const chatId = ctx.chat.id;

    try {
      const result = await db
        .select()
        .from(chatUsers)
        .innerJoin(users, eq(chatUsers.user_id, users.id))
        .where(eq(chatUsers.chat_id, chatId));

      if (!result.length) {
        return ctx.reply('Никто не зареган. Пусто, как твоя жизнь.');
      }

      const list = result
        .map((row, i) => {
          const u = row.users;
          return `${i + 1}. ${u.username || `${u.first_name} ${u.last_name ? u.last_name : ''}`}`;
        })
        .join('\n');

      ctx.reply(`В пуле:\n${list}`);
    } catch (err) {
      console.error('Ошибка в /pool:', err);
      ctx.reply('Что-то пошло по пизде. Я ничего не нашёл.');
    }
  });
};