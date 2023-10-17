// Подключение библиотеки 'node-telegram-bot-api'
const TelegramBot = require('node-telegram-bot-api');
const { User } = require('../db/models');

require('dotenv').config();

const token = process.env.BOT_TOKEN; 
console.log(token);
const bot = new TelegramBot(token, { polling: true });

// Обработка команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const welcomeMessage = 'Добро пожаловать! Я ваш бот и готов вам помочь.';
  const requestPhoneMessage = 'Пожалуйста, введите свой номер телефона:';

  bot.sendMessage(chatId, welcomeMessage);

  bot.sendMessage(chatId, requestPhoneMessage, {
    reply_markup: {
      keyboard: [[{ text: 'Отправить номер телефона', request_contact: true }]],
      one_time_keyboard: true,
    },
  });
});

bot.on('contact', async (msg) => {
  const chatId = msg.chat.id;
  const phone = msg.contact.phone_number;
  console.log(phone);

  try {
    const user = await User.findOne({ where: { phone: String(phone) } });
    console.log(phone);
    if (user) {
      bot.sendMessage(chatId, `Имя пользователя: ${user.name}`);
    } else {
      bot.sendMessage(chatId, 'Извините, номер не найден в базе данных.');
    }
  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, 'Произошла ошибка при поиске пользователя.');
  }
});
