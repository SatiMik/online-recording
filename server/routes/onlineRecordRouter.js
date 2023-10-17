const router = require('express').Router();
const { Op } = require('sequelize');
const {
  Master, MasterService, Service, Category,
} = require('../db/models');

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
    // console.log(masterId, '-------------------- id');
    const services = await MasterService.findAll({ where: { masterId } });
    const serviceList = await Service.findAll(
      { where: { id: { [Op.in]: services.map((s) => s.serviceId) } } },
    );
    console.log(services, '-------------------- services');
    return res.json(serviceList);
  } catch (error) {
    console.log(error, 'ошибка в получении услуги мастера по id');
    return res.sendStatus(500);
  }
});

router.get('/services/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;
    console.log(categoryId, '-------------------- id');
    const categories = await Category.findAll();
    const serviceList = await Service.findAll({
      where: {
        categoryId,
      },
    },
    //   { where: { id: { [Op.in]: categories.map((s) => s.service) } }
    // },
    );
    return res.json(serviceList);
  } catch (error) {
    console.log(error, 'ошибка в получении категорий ++++++++++++++++++++++++++');
    return res.sendStatus(500);
  }
});

module.exports = router;
