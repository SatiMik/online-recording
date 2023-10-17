const router = require('express').Router();
const { Op } = require('sequelize');
const { Master, MasterService, Service } = require('../db/models');

router.get('/masters', async (req, res) => {
  try {
    const masters = await Master.findAll();
    return res.json(masters);
  } catch (error) {
    console.log(error, 'ошибка в получении мастеров');
    return res.sendStatus(500);
  }
});

router.get('/masters/:masterId/services', async (req, res) => {
  try {
    const { masterId } = req.params;
    const services = await MasterService.findAll({ where: { masterId } });
    const serviceList = await Service.findAll({
      where: { id: { [Op.in]: services.map((s) => s.serviceId) } },
    });
    return res.json(serviceList);
  } catch (error) {
    console.log(error, 'ошибка в получении услуги мастера по id');
    return res.sendStatus(500);
  }
});

router.get('/services/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;
    const result = await Service.findAll({ where: { categoryId } });
    return req.sendStatus(200).json(result);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = router;
