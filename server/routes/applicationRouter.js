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
    const { phone, clientName, status } = req.body;
    console.log(req.body, 'ОТПРАВИЛИ ЗАЯВКУ ------------');
    const applications = await Application.create({
      phone,
      clientName,
      status,
    });
    res.json(applications);
  } catch (err) {
    console.log(err, 'ошибка в создании ');
    return res.sendStatus(400);
  }
});

router
  .route('/:id')
  .delete(async (req, res) => {
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
  })
  .patch(async (req, res) => {
    try {
      const { id } = req.params;
      const application = await Application.findOne({
        where: {
          id,
        },
      });
      application.status = !application.status;
      await application.save();
      const result = await Application.findOne({
        where: {
          id,
        },
      });
      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });
module.exports = router;
