import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv';
import { setupRegCommand } from "./commands/reg";
import {setupHelpCommand} from "./commands/help";
import {setupPingCommand} from "./commands/ping";
import {setupFutureCommand} from "./commands/future";
import {setupPoolCommand} from "./commands/pool";
import {setupWhoCommand} from "./commands/who";
import {setupPidorCommand} from "./commands/pidor";
import {setupPidorStatCommand} from "./commands/pidorstat";

dotenv.config();

export const bot = new Telegraf(process.env.BOT_TOKEN!);

setupWhoCommand(bot)
setupRegCommand(bot);
setupHelpCommand(bot);
setupPingCommand(bot);
setupFutureCommand(bot);
setupPidorCommand(bot);
setupPidorStatCommand(bot)
setupPoolCommand(bot);