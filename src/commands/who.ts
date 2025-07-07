import { Telegraf } from 'telegraf';
import { getRandom } from '../utils/random';
import { ANSWERS } from '../utils/answers';
import {getUsersByChat} from "../store/chat-user";

export const setupWhoCommand = (bot: Telegraf) => {
  bot.command('who', async (ctx) => {
    const question = ctx.message.text.slice(4).trim();
    const chatId = ctx.chat?.id;

    if (!question) {
      ctx.reply('Ты команду кинул, а вопрос где, дебил?');
      return;
    }

    if (!chatId) {
      ctx.reply('Ты из подвала пишешь? Чат не найден.');
      return;
    }

    const users = await getUsersByChat(chatId);

    if (!users.length) {
      ctx.reply('Тут вообще никто не зареган, только ты и твои голоса в голове.');
      return;
    }

    const chosen = getRandom(users);
    const phrase = getRandom(ANSWERS);

    const displayName = chosen.username
      ? `@${chosen.username}`
      : `${chosen.first_name}${chosen.last_name ? ' ' + chosen.last_name : ''}`;

    const answerText = phrase.replace('{user}', displayName);

    ctx.reply(`"${question}"?\n${answerText}`);
  });
};