import { bot } from "./bot";

async function startBot() {
  await bot.telegram.setMyCommands(
    [
      { command: 'who', description: 'Задать вопрос и узнать жертву' },
      { command: 'reg', description: 'Зарегистрироваться' },
      { command: 'future', description: 'Узнать будущее' },
      { command: 'pool', description: 'Получить список игроков'},
      { command: 'pidor', description: 'Узнать пидора дня' },
      { command: 'help', description: 'Узнать о командах'}
    ],
    { scope: { type: 'default' } }
  );
  await bot.launch();
}

startBot().catch((err) => {
  console.error('Ошибка запуска бота:', err);
});