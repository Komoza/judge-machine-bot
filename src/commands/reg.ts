import { Telegraf } from 'telegraf';
import { saveUser } from '../store/users';

export const setupRegCommand = (bot: Telegraf) => {
  bot.command('reg', async (ctx) => {
    const user = ctx.message.from;

    if (user.is_bot) {
      return ctx.reply('Ботов мы не регаем. Иди в нахуй.');
    }

    try {
      const added = await saveUser({
        id: user.id.toString(), // вот тут фикс
        username: user.username ?? '',
        first_name: user.first_name ?? '',
        last_name: user.last_name ?? null,
        is_bot: user.is_bot,
        language_code: user.language_code ?? null,
        is_premium: user.is_premium ?? false,
      });

      if (added) {
        ctx.reply(`@${user.username || user.first_name} зарегистрирован.`);
      } else {
        ctx.reply(`@${user.username || user.first_name} уже был в пуле. Не выпендривайся.`);
      }
    } catch (err) {
      console.error('Ошибка при регистрации:', err);
      ctx.reply('Чёт пошло по пизде. Попробуй позже.');
    }
  });
};