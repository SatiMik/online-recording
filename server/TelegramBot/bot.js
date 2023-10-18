const TelegramBot = require('node-telegram-bot-api');
const { text } = require('express');
const { User } = require('../db/models');

const token = process.env.BOT_TOKEN;

console.log(token);

const bot = new TelegramBot(token, { polling: true });

const phoneNumberReg =
  /^\+?(\d{1,3})?[- .]*(\(?(?:\d{2,3})\)?[- .]*\d\d\d[- .]?\d\d[- .]*\d\d$)/;

// Обработка команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const requestPhoneMessage =
    'Рад вас приветсвовать! Пожалуйста, введите свой номер телефона:';

  bot.sendMessage(chatId, requestPhoneMessage, {
    reply_markup: {
      keyboard: [[{ text: 'Отправить номер телефона', request_contact: true }]],
      one_time_keyboard: true,
    },
  });
});
// bot.onText(phoneNumberReg, (msg) => {
//   console.log('НОМЕР ==>', msg.text.replace(/\D/g, '').slice(-10));
//   console.log('НОМЕР ==>', msg.text);
// });

bot.on('message', async (msg) => {
  const textMsg = msg.text;

  if (textMsg.match(phoneNumberReg)) {
    console.log('НОМЕР ==> ', msg.text.replace(/\D/g, '').slice(-10));
    const phone = msg.text.replace(/\D/g, '').slice(-10);
    const chatId = msg.chat.id;
    try {
      const user = await User.findOne({ where: { phone: String(phone) } });
      console.log('ОПА', phone);
      if (user) {
        bot.sendMessage(
          chatId,
          `Здравствуйте, ${user.name}\nВот ваш код: ${user.code}`
        );
        console.log(chatId);
        const chat = await User.update(
          { chatId: Number(chatId) },
          {
            where: {
              id: user.id,
            },
          }
        );
        console.log(chat);
      } else {
        bot.sendMessage(
          chatId,
          'Извините, но вы не зарегистрированы на сайте.'
        );
      }
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, 'Произошла ошибка при поиске пользователя.');
    }
  } else {
    console.log('пошел ты нахуй');
  }
});

bot.on('contact', async (msg) => {
  const chatId = msg.chat.id;
  const phone = msg.contact.phone_number;
  console.log(phone);

  try {
    const user = await User.findOne({ where: { phone: String(phone) } });
    console.log(phone);
    if (user) {
      bot.sendMessage(
        chatId,
        `Здравствуйте, ${user.name}\nВот ваш код: ${user.code}`
      );
      console.log(chatId);
      const chat = await User.update(
        { chatId: Number(chatId) },
        {
          where: {
            id: user.id,
          },
        }
      );
      console.log(chat);
    } else {
      bot.sendMessage(chatId, 'Извините, но вы не зарегистрированы на сайте.');
    }
  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, 'Произошла ошибка при поиске пользователя.');
  }
});
