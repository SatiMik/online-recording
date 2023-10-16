const router = require('express').Router();
const { Master, MasterService } = require('../db/models');

router.get('/masters', async (req, res) => {
  try {
    const masters = await Master.findAll();
    return res.json(masters);
  } catch (error) {
    console.log(error, 'ошибка в получении мастеров');
    return res.sendStatus(500);
  }
});

router.get('/masters/:masterId', async (req, res) => {
  try {
    const { masterId } = req.params;
    const masters = await Master.findAll({ where: { id: masterId } });
    return res.json(masters);
  } catch (error) {
    console.log(error, 'ошибка в получении мастера по id');
    return res.sendStatus(500);
  }
});

router.get('/masters/:masterId/services', async (req, res) => {
  try {
    const { masterId } = req.params;
    const services = await MasterService.findAll({ where: { masterId } });
    return res.json(services);
  } catch (error) {
    console.log(error, 'ошибка в получении мастера по id');
    return res.sendStatus(500);
  }
});

module.exports = router;
