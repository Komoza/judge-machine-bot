import { Telegraf } from 'telegraf';
import { getPidorStats } from '../store/pidor';
import { getUserById } from '../store/users';

const escapeHTML = (text: string) =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

export const setupPidorStatCommand = (bot: Telegraf) => {
  bot.command('pidorstat', async (ctx) => {
    const chatId = ctx.chat?.id.toString();
    if (!chatId) return;

    const stats = await getPidorStats(chatId);

    if (!stats.length) {
      return ctx.reply('В этом чате ещё не выбрали ни одного пидора. Все чистенькие пока.');
    }

    const lines = await Promise.all(
      stats.map(async ({ user_id, count }, index) => {
        const user = await getUserById(user_id);
        if (!user) return 'Ошибка';
        const name = escapeHTML(
          user.username || `${user.first_name} ${user.last_name ? user.last_name : ''}`
        );
        return `${index + 1}. ${name} — ${count}`;
      })
    );

    await ctx.reply(`<b>Пидорская статистика:</b>\n\n${lines.join('\n')}`, {
      parse_mode: 'HTML',
    });
  });
};