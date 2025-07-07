import { Telegraf } from 'telegraf';

export const setupHelpCommand = (bot: Telegraf) => {
  bot.command('help', (ctx) => {
    ctx.replyWithMarkdownV2(`
*🧠 Список команд:*

/who — Задать вопрос и выбрать жертву  
/reg — Зарегистрироваться в пул (если ты ещё не в говне)  
/whosreg — Посмотреть, кто уже залез в это болото  
/future — Узнать, как именно жизнь тебя выебет  
/help — Ну ты и нажал, поздравляю  
    `.trim());
  });
};