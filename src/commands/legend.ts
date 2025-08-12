import { Telegraf } from 'telegraf';
import { getUsersByChat } from '../store/chat-user';
import { getRandom } from '../utils/random';
import {getDisplayName} from "../utils/get-display-name";
import {getUserById} from "../store/users";
import {getTodayLegend, saveLegend} from "../store/legend";
import {LEGEND_ANNOUNCEMENTS} from "../utils/legend-announcements";

export const setupLegendCommand = (bot: Telegraf) => {
  bot.command('legend', async (ctx) => {
    const chatId = ctx.chat?.id;
    const authorId = ctx.from?.id;

    if (!chatId || !authorId) return ctx.reply('Где вообще ты команду вызвал, придурок?');

    const existing = await getTodayLegend(chatId);
    if (existing) {
      const existingUser = await getUserById(existing.legend_id);
      if (!existingUser) return
      return ctx.reply(`Легенда дня уже выбрана — ${getDisplayName(existingUser)}`);
    }

    const users = await getUsersByChat(chatId);
    if (!users.length) {
      return ctx.reply('В чате нет зарегистрированных, все чисты… пока.');
    }

    const random = getRandom(users);
    await saveLegend(chatId, random.id, authorId.toString());

    const name = getDisplayName(random);
    const phrase = getRandom(LEGEND_ANNOUNCEMENTS).replace('{user}', name.trim());
    await ctx.reply(phrase);
  });
};