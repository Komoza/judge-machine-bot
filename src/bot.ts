import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv';
import { setupRegCommand } from "./commands/reg";
import {setupHelpCommand} from "./commands/help";
import {setupPingCommand} from "./commands/ping";

dotenv.config();

export const bot = new Telegraf(process.env.BOT_TOKEN!);

setupRegCommand(bot);
setupHelpCommand(bot);
setupPingCommand(bot);