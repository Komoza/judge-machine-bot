import { getRandom } from '../utils/random';
import { Telegraf } from 'telegraf';
import { PREDICTIONS } from '../utils/predictions';
import {getUsersByChat} from "../store/chat-user";

export const setupFutureCommand = (bot: Telegraf) => {
  bot.command('future', async (ctx) => {
    const chatId = ctx.chat.id;
    const authorId = ctx.from.id.toString();

    try {
      const users = await getUsersByChat(chatId);
      const others = users.filter((u) => u.id !== authorId && !u.is_bot);

      if (others.length === 0) {
        return ctx.reply('Ты тут один, сам себе и предскажи.');
      }

      const randomUser = getRandom(others);
      const displayName = randomUser.username
        ? `@${randomUser.username}`
        : `${randomUser.first_name}${randomUser.last_name ? ' ' + randomUser.last_name : ''}`;

      const prediction = getRandom(PREDICTIONS).replace('${user}', displayName);

      ctx.reply(prediction);
    } catch (err) {
      console.error('Ошибка в future:', err);
      ctx.reply('Что-то пошло по пизде с предсказаниями.');
    }
  });
};