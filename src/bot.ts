import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv';
import { setupWhoCommand } from './commands/who_is';

dotenv.config();

export const bot = new Telegraf(process.env.BOT_TOKEN!);

setupWhoCommand(bot);