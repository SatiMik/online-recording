const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

const token = '6653330494:AAGgYCOOjrdCWYlcKtZ16bfB79ESvO7ppIw';
// const user = require('../db/models/user');
// const { Code } = require('../db/models')

const router = express.Router();

const codeGenerate = () => {
  const randomNumber = parseInt(
    Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join(''),
  );
  return randomNumber;
};

const phoneNumberReg = /^\+?(\d{1,3})?[- .]*(\(?(?:\d{2,3})\)?[- .]*\d\d\d[- .]?\d\d[- .]*\d\d$)/;

router.post('/signup', async (req, res) => {
  const { name, phone, password } = req.body;
  const savePhone = phone.replace(/\D/g, '').slice(-10);
  if (name && phone && password && !(phone.length < 10) && phone.match(phoneNumberReg)) {
    try {
      const [user, created] = await User.findOrCreate({
        where: { phone: savePhone },
        defaults: {
          name,
          password: await bcrypt.hash(password, 10),
          code: codeGenerate(),
        },
      });
      if (!created) return res.status(400).json({ message: 'Не правильно заполнены поля!' });
      // const sessionUser = JSON.parse(JSON.stringify(user));
      // delete sessionUser.password;
      // req.session.user = sessionUser;
      return res.sendStatus(200);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }

  return res.status(401).json({ message: 'Невалидный номер' });
});

router.post('/code', async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      where: {
        code,
      },
    });
    const sessionUser = JSON.parse(JSON.stringify(user));
    // console.log(sessionUser);
    // console.log(code);

    if (sessionUser.code === Number(code)) {
      await User.update(
        { valid: true, code: 999999 },
        {
          where: {
            id: sessionUser.id,
          },
        },
      );
    } else {
      return res.status(402).json({ message: 'Неверный код!' });
    }
    const { chatId } = user;
    const textMessage = encodeURIComponent('Вы успешно зарегистрировались на сайте');
    try {
      const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${textMessage}`;
      fetch(url);
    } catch (e) {
      console.log('Fetch Error', e);
    }

    delete sessionUser.password;
    delete sessionUser.data.code;
    delete sessionUser.valid;
    req.session.user = sessionUser;
    return res.status(200).json(sessionUser);
  } catch (e) {
    console.log('11111111111111111111111111111', e);
    return res.status(403).json({ message: 'Неверно введен код!' });
  }
});

router.post('/login', async (req, res) => {
  const { phone, password } = req.body;
  const userLoginPhone = phone.replace(/\D/g, '').slice(-10);
  if (userLoginPhone && password) {
    try {
      const user = await User.findOne({
        where: { phone: userLoginPhone },
      });
      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(404).json({ message: 'Пользователь не найден!' });
      }

      const sessionUser = JSON.parse(JSON.stringify(user));
      delete sessionUser.password;
      req.session.user = sessionUser;

      const { chatId } = req.session.user;
      const textMessage = encodeURIComponent(
        'Вы успешно вошли на сайт, если это были не Вы поменяйте пароль',
      );
      try {
        const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${textMessage}`;
        fetch(url);
      } catch (e) {
        console.log('Fecth Error', e);
      }

      return res.json(sessionUser);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(500);
});

router.get('/check', (req, res) => {
  const chatId = '1039741975';
  const textMessage = encodeURIComponent('Кто то зашел -_-');
  try {
    const messege = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${textMessage}`;
    fetch(messege);
  } catch (e) {
    console.log('Fetch Error', e);
  }

  if (req.session.user) {
    return res.json(req.session.user);
  }
  return res.sendStatus(401);
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('sid').sendStatus(200);
});

module.exports = router;
