import { Telegraf } from 'telegraf';
import { getRandom } from '../utils/random';
import {ANSWERS} from "../utils/answers";
import {loadUsers} from "../store/users";

export const setupWhoCommand = (bot: Telegraf) => {
  bot.command('who', (ctx) => {
    const question = ctx.message.text.slice(4).trim();

    if (!question) {
      ctx.reply('Ты команду кинул, а вопрос где, дебил?');
      return;
    }

    const users = loadUsers().filter((u) => !u.is_bot);

    if (users.length === 0) {
      ctx.reply('Никто ещё не зареган');
      return;
    }

    const chosen = getRandom(users);
    const phrase = getRandom(ANSWERS);
    const displayName = chosen.username
      ? `@${chosen.username}`
      : `${chosen.first_name}${chosen.last_name ? ' ' + chosen.last_name : ''}`;
    const result = phrase.replace('{user}', displayName);

    ctx.reply(`${question}\n${result}`);
  });
};