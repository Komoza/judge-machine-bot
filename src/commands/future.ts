import { getRandom } from '../utils/random';
import { Telegraf } from 'telegraf';
import { PREDICTIONS } from '../utils/predictions';
import {getUsersByChat} from "../store/chat-user";
import {getDisplayName} from "../utils/get-display-name";
import {BLOCKED_CHATS} from "../utils/blocked-chats";

export const setupFutureCommand = (bot: Telegraf) => {
  bot.command('future', async (ctx) => {
    const chatId = ctx.chat.id;
    const authorId = ctx.from.id.toString();

    if (BLOCKED_CHATS.includes(chatId)) {
      return ctx.reply('В этой группе запрещено пользоваться этой командой');
    }

    try {
      const users = await getUsersByChat(chatId);
      const others = users.filter((u) => u.id !== authorId && !u.is_bot);

      if (others.length === 0) {
        return ctx.reply('Ты тут один, сам себе и предскажи.');
      }

      const randomUser = getRandom(others);

      const prediction = getRandom(PREDICTIONS).replace('${user}', getDisplayName(randomUser));

      ctx.reply(prediction);
    } catch (err) {
      console.error('Ошибка в future:', err);
      ctx.reply('Что-то пошло по пизде с предсказаниями.');
    }
  });
};