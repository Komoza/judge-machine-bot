import { Telegraf } from 'telegraf';

export const setupPingCommand = (bot: Telegraf) => {
  bot.command('ping', (ctx) => {
    ctx.reply('pong');
  });
};