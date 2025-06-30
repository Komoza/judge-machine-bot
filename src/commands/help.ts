import { Telegraf } from 'telegraf';

export const setupHelpCommand = (bot: Telegraf) => {
  bot.command('help', (ctx) => {
    ctx.replyWithMarkdownV2(`
*Список команд:*

/who — Задать вопрос и выбрать жертву  
/reg — Зарегистрироваться в пул  
/help — Ну ты и нажал, поздравляю  
    `.trim());
  });
};