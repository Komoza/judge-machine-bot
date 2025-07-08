import { Telegraf } from 'telegraf';

export const setupHelpCommand = (bot: Telegraf) => {
  bot.command('help', (ctx) => {
    ctx.reply(`
Список команд:

/who — Задать вопрос и выбрать жертву  
/reg — Зарегистрироваться в пул (если ты ещё не в говне)  
/pool — Посмотреть, кто уже залез в это болото  
/future — Узнать, как именно жизнь тебя выебет  
/pidor — Узнать кто сегодня пидор дня
/pidorstats — Узнать статистику пидоров
/help — Ну ты и нажал, поздравляю
    `.trim());
  });
};