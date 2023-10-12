const express = require('express');
const Application = require('../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
  const application = await Application.findAll();
  res.json(application);
})
  .post('/', async (req, res) => {
    try {
      console.log(req.body);
      const application = await Application.create({
        phone: req.body.phone,
        clientName: req.body.clientName,
      });
      return res.json(application);
    } catch (err) {
      console.log(err, 'ошибка в создании ');
      return res.sendStatus(400);
    }
  });

module.exports = router;
