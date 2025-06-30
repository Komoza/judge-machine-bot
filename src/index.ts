import { bot } from './bot';

async function startBot() {
  await bot.telegram.setMyCommands(
    [
      { command: 'who', description: 'Задать вопрос и узнать жертву' },
      { command: 'reg', description: 'Зарегистрироваться' },
      { command: 'help', description: 'Узнать о командах'}
    ],
    { scope: { type: 'default' } }
  );
  await bot.launch();
  console.log('🤖 JudgeMachineBot работает...');
}

startBot().catch((err) => {
  console.error('Ошибка запуска бота:', err);
});