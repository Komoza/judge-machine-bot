import { Telegraf } from 'telegraf';
import { getTodayPidor, savePidor } from '../store/pidor';
import { getUsersByChat } from '../store/chat-user';
import { getRandom } from '../utils/random';
import {PIDOR_ANNOUNCEMENTS} from "../utils/pidor-announcements";
import {getDisplayName} from "../utils/get-display-name";
import {getUserById} from "../store/users";

export const setupPidorCommand = (bot: Telegraf) => {
  bot.command('pidor', async (ctx) => {
    const chatId = ctx.chat?.id;
    const authorId = ctx.from?.id;

    if (!chatId || !authorId) return ctx.reply('Где вообще ты команду вызвал, придурок?');

    const existing = await getTodayPidor(chatId);
    if (existing) {
      const existingUser = await getUserById(existing.pidor_id);
      if (!existingUser) return
        return ctx.reply(`Пидор дня уже выбран — ${getDisplayName(existingUser)}`);
    }

    const users = await getUsersByChat(chatId);
    if (!users.length) {
      return ctx.reply('В чате нет зарегистрированных, все чисты… пока.');
    }

    const random = getRandom(users);
    await savePidor(chatId, random.id, authorId.toString());

    const name = getDisplayName(random);
    const phrase = getRandom(PIDOR_ANNOUNCEMENTS).replace('{user}', name.trim());
    await ctx.reply(phrase);
  });
};