import { Telegraf } from 'telegraf';
import { saveUser } from '../store/users';
import {isUserInChat, saveChatUser} from "../store/chat-user";
import {getDisplayName} from "../utils/get-display-name";

export const setupRegCommand = (bot: Telegraf) => {
  bot.command('reg', async (ctx) => {
    const user = ctx.message.from;
    const chatId = ctx.chat.id;

    if (user.is_bot) {
      return ctx.reply('Ботов мы не регаем. Иди в нахуй.');
    }

    try {
      const userId = user.id.toString();

      await saveUser({
        id: userId,
        username: user.username ?? '',
        first_name: user.first_name ?? '',
        last_name: user.last_name ?? null,
        is_bot: user.is_bot,
        language_code: user.language_code ?? null,
        is_premium: user.is_premium ?? false,
      });

      const alreadyRegistered = await isUserInChat(userId, chatId);

      if (alreadyRegistered) {
        return ctx.reply(`${getDisplayName(user)} уже зареган. Не выпендривайся`);
      }

      await saveChatUser(userId, chatId);
      await ctx.reply(`${user.username || user.first_name} зарегистрирован.`);

    } catch (err) {
      await ctx.reply('Чёт пошло по пизде. Попробуй позже.');
    }
  });
};