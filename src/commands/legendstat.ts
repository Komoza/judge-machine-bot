import { Telegraf } from 'telegraf';
import { getUserById } from '../store/users';
import {getLegendStats} from "../store/legend";

const escapeHTML = (text: string) =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

export const setupLegendStatCommand = (bot: Telegraf) => {
  bot.command('legendstat', async (ctx) => {
    const chatId = ctx.chat?.id.toString();
    if (!chatId) return;

    const stats = await getLegendStats(chatId);

    if (!stats.length) {
      return ctx.reply('В этом чате нет легенд.. Впрочем, ничего удивительного');
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

    await ctx.reply(`<b>Легендарная статистика:</b>\n\n${lines.join('\n')}`, {
      parse_mode: 'HTML',
    });
  });
};