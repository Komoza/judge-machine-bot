import {getRandom} from "../utils/random";
import {Telegraf} from "telegraf";
import {PREDICTIONS} from "../utils/predictions";

export const setupFutureCommand = (bot: Telegraf) => {
  bot.command('future', (ctx) => {
    ctx.reply(`${getRandom(PREDICTIONS)}`);
  });
};