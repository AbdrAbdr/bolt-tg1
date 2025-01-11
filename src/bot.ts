import TelegramBot from 'node-telegram-bot-api';

const token = '7702519649:AAF1Gd7PpeAvNn_mP77ZIXdEcFCS2J2H0C8';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Open Web App", web_app: { url: "https://bolt-tg1.stackblitz.io" } }]
      ]
    }
  };

  bot.sendMessage(chatId, "Welcome to the Friendship History App!", keyboard);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  if (msg.web_app_data) {
    console.log('Web App data:', msg.web_app_data);
    bot.sendMessage(chatId, 'Web App data received!');
  }
});

console.log('Bot is running...');
