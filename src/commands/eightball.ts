import { Telegraf } from 'telegraf';

interface YesNoResponse {
  answer: string;
  forced: boolean;
  image: string;
}

export const setupEightBallCommand = (bot: Telegraf) => {
  bot.command('8ball', async (ctx) => {
    const text = ctx.message?.text || '';
    const cleaned = text.replace(/@JudgeMachineBot/, '');
    const question = cleaned.slice(6).trim();

    if (!question) {
      ctx.reply('Ты шар спросил, а вопрос забыл. Давай по новой, без хуйни.');
      return;
    }

    try {
      const response = await fetch('https://yesno.wtf/api');
      const data = await response.json() as YesNoResponse;

      await ctx.reply(`"${question}"?`);
      await ctx.replyWithAnimation(data.image);
    } catch (error) {
      ctx.reply('Шар сломался, попробуй позже.');
    }
  });
};
