import { Telegraf } from 'telegraf';
import { getTodayPidor, savePidor } from '../store/pidor';
import { getUsersByChat } from '../store/chat-user';
import { getRandom } from '../utils/random';
import {PIDOR_ANNOUNCEMENTS} from "../utils/pidor-announcements";

export const setupPidorCommand = (bot: Telegraf) => {
  bot.command('pidor', async (ctx) => {
    const chatId = ctx.chat?.id;
    const authorId = ctx.from?.id;

    if (!chatId || !authorId) return ctx.reply('Где вообще ты команду вызвал, придурок?');

    const existing = await getTodayPidor(chatId);
    if (existing) {
      return ctx.reply(`Пидор дня уже выбран — <a href="tg://user?id=${existing.pidor_id}">вот он</a>.`, { parse_mode: 'HTML' });
    }

    const users = await getUsersByChat(chatId);
    if (!users.length) {
      return ctx.reply('В чате нет зарегистрированных, все чисты… пока.');
    }

    const random = getRandom(users);
    await savePidor(chatId, random.id, authorId.toString());

    const name = random.username ? `@${random.username}` : `${random.first_name} ${random.last_name ?? ''}`;
    const phrase = getRandom(PIDOR_ANNOUNCEMENTS).replace('{user}', name.trim());
    await ctx.reply(phrase);
  });
};