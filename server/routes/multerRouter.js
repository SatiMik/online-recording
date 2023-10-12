// Подключаем необходимые модули и библиотеки
const sharp = require('sharp'); // Библиотека для обработки изображений
const fs = require('fs/promises'); // Модуль для работы с файловой системой (используется с промисами)
const express = require('express'); // Фреймворк Express.js для создания веб-приложений
const { Sale } = require('../db/models'); // Импортируем модель Sale из базы данных
const upload = require('../middlewares/multerMid'); // Импортируем middleware для обработки загрузки файлов

const multerRouter = express.Router(); // Создаем роутер Express

// Обработчик POST-запроса по маршруту '/upload' с использованием middleware 'upload.single'
multerRouter.post('/upload', upload.single('file'), async (req, res) => {
  try {
    // Проверяем наличие файла в запросе
    if (!req.file) {
      return res.status(400).json({ message: 'File not found' });
    }

    // Создаем имя файла с расширением 'webp' и уникальным именем, связанным с текущей датой
    const name = `${Date.now()}.webp`;

    // Создаем буфер изображения в формате 'webp' с использованием библиотеки 'sharp'
    const outputBuffer = await sharp(req.file.buffer).webp().toBuffer();

    // Записываем буфер в файл в директории './public/img/' с заданным именем
    await fs.writeFile(`./public/img/${name}`, outputBuffer);

    // Создаем запись о продаже (пост) в базе данных
    const sale = await Sale.create({
      description: req.body.description, // Описание, переданное в теле запроса
      img: name, // Имя файла изображения
    });

    // Получаем запись о продаже с информацией о пользователе (возможно, дополненную данными пользователя)

    const postWithUser = await Sale.findByPk(sale.id);

    // Отправляем созданный пост в ответе на запрос
    res.json(postWithUser);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Server error' });
  }
});

// Обработчик DELETE-запроса по динамическому маршруту '/:id'
multerRouter.delete('/:id', async (req, res) => {
  try {
    // Ищем запись о продаже по переданному идентификатору 'id'
    const sale = await Sale.findByPk(req.params.id);

    // Удаляем файл изображения из директории './public/img/' и ловим возможные ошибки
    fs.unlink(`./public/img/${sale.img}`).catch((e) => console.log(e));

    // Если запись не найдена, отправляем клиенту статус 404 и сообщение
    if (!sale) {
      res.status(404).json({ message: 'Sale not found' });
    }

    // Удаляем найденную запись о продаже из базы данных
    await sale.destroy();

    // Отправляем клиенту сообщение об успешном удалении
    res.json({ message: 'Sale deleted' });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Server error' });
  }
});

// Экспортируем созданный роутер для использования в других частях приложения
module.exports = multerRouter;
