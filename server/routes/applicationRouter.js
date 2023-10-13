const express = require('express');
const { Application } = require('../db/models');

const router = express.Router();

router
  // .route('/')
  .get('/', async (req, res) => {
    console.log('ЗАШЕЛ ---');
    try {
      const applications = await Application.findAll();
      res.json(applications);
    } catch (err) {
      console.log(err, 'ошибка в получении');
      res.sendStatus(500);
    }
  });
router.post('/', async (req, res) => {
  try {
    const { phone, clientName } = req.body;
    console.log(req.body, 'ОТПРАВИЛИ ЗАЯВКУ ------------');
    const applications = await Application.create({
      phone,
      clientName,
    });
    res.json(applications);
  } catch (err) {
    console.log(err, 'ошибка в создании ');
    return res.sendStatus(400);
  }
});

router
  .delete('/:id', async (req, res) => {
    try {
      const application = await Application.destroy({
        where: {
          id: req.params.id,
        },
      });
      return res.sendStatus(200);
    } catch (err) {
      console.error(err, 'ошибка в удалении, ----------------');
      res.sendStatus(500);
    }
  });
module.exports = router;
