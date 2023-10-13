const sharp = require('sharp');
const fs = require('fs/promises');
const express = require('express');
const { Sale } = require('../db/models');
const upload = require('../middlewares/multerMid');

const multerRouter = express.Router();

// Обработчик POST-запроса по маршруту '/upload' с использованием middleware 'upload.single'
multerRouter.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'File not found' });
    }

    const name = `${Date.now()}.webp`;

    const outputBuffer = await sharp(req.file.buffer).webp().toBuffer();

    await fs.writeFile(`./public/img/${name}`, outputBuffer);

    const sale = await Sale.create({
      description: req.body.description,
      img: name,
    });

    const postWithUser = await Sale.findByPk(sale.id);

    res.json(postWithUser);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Server error' });
  }
});

// Обработчик DELETE-запроса по динамическому маршруту '/:id'
multerRouter.delete('/:id', async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.id);

    fs.unlink(`./public/img/${sale.img}`).catch((e) => console.log(e));

    if (!sale) {
      res.status(404).json({ message: 'Sale not found' });
    }

    await sale.destroy();

    res.json({ message: 'Sale deleted' });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Server error' });
  }
});

// Обработчик запроса на добавление

multerRouter.route('/').get(async (req, res) => {
  const sales = await Sale.findAll();
  setTimeout(() => res.json(sales), 2000);
});

module.exports = multerRouter;
