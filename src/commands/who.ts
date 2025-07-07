// import { Telegraf } from 'telegraf';
// import {loadUsers, saveUsers} from '../store/users';
// import { saveQuestion } from '../store/questions';
// import { ANSWERS } from '../utils/answers';
// import { getRandom } from '../utils/random';
// import { TUser } from '../types/user';
//
// export const setupWhoCommand = (bot: Telegraf) => {
//   bot.command('who', (ctx) => {
//     const question = ctx.message.text.slice(4).trim();
//     const author = ctx.message.from as TUser;
//
//     if (!question) {
//       ctx.reply('Ты команду кинул, а вопрос где, дебил?');
//       return;
//     }
//
//     const users = loadUsers().filter((u) => !u.is_bot);
//
//     const alreadyRegistered = users.some((u) => u.id === author.id);
//
//     if (!alreadyRegistered) {
//       users.push(author);
//       saveUsers(users);
//
//       const displayName = author.username
//         ? `@${author.username}`
//         : `${author.first_name}${author.last_name ? ' ' + author.last_name : ''}`;
//
//       ctx.reply(`${displayName}, ага, задаёшь вопросы и не участвуешь? Хуй тебе, теперь участвуешь.`);
//       ctx.reply(`${displayName} зарегистрирован.`);
//
//       return;
//     }
//
//     const chosen = getRandom(users);
//     const phrase = getRandom(ANSWERS);
//     const displayName = chosen.username
//       ? `@${chosen.username}`
//       : `${chosen.first_name}${chosen.last_name ? ' ' + chosen.last_name : ''}`;
//
//     const answerText = phrase.replace('{user}', displayName);
//
//     ctx.reply(`"${question}"?\n${answerText}`).then(() => {
//       saveQuestion({
//         question,
//         author,
//         user: chosen,
//         timestamp: Date.now()
//       });
//     });
//   });
// };