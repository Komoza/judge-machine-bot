import { Telegraf } from 'telegraf';

export const setupWhoCommand = (bot: Telegraf) => {
  bot.command('who', (ctx) => {
    ctx.reply('you');
  });
};