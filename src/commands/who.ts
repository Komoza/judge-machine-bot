import { Telegraf } from 'telegraf';
import { getRandom } from '../utils/random';
import { ANSWERS } from '../utils/answers';
import {getUsersByChat} from "../store/chat-user";
import {getDisplayName} from "../utils/get-display-name";

export const setupWhoCommand = (bot: Telegraf) => {
  bot.command('who', async (ctx) => {

    const cleaned = ctx.message.text.replace(/@JudgeMachineBot/, '');
    const question = cleaned.slice(4).trim();
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

    const answerText = phrase.replace('{user}', getDisplayName(chosen));

    ctx.reply(`"${question}"?\n${answerText}`);
  });
};