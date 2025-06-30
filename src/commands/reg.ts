import { Telegraf } from 'telegraf';
import { addUser } from '../store/users';

export const setupRegCommand = (bot: Telegraf) => {
  bot.command('reg', (ctx) => {
    const user = ctx.message.from;

    if (user.is_bot) {
      return ctx.reply('Ботов мы не регаем. Иди в жопу.');
    }

    const added = addUser(user);

    if (added) {
      ctx.reply(`@${user.username || user.first_name} зарегистрирован. Ты в пуле, сучара.`);
    } else {
      ctx.reply(`@${user.username || user.first_name} уже был в пуле. Не выпендривайся.`);
    }
  });
};