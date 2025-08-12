import { Telegraf } from 'telegraf';
import { getRandom } from '../utils/random';
import { EIGHTBALL_ANSWERS } from '../utils/eightball-answers';

export const setupEightBallCommand = (bot: Telegraf) => {
  bot.command('8ball', async (ctx) => {
    const text = ctx.message?.text || '';
    const cleaned = text.replace(/@JudgeMachineBot/, '');
    const question = cleaned.slice(6).trim();

    if (!question) {
      ctx.reply('Ты шар спросил, а вопрос забыл. Давай по новой, без хуйни.');
      return;
    }

    const answer = getRandom(EIGHTBALL_ANSWERS);
    ctx.reply(`"${question}"?\n${answer}`);
  });
};
