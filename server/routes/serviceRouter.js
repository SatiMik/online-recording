const router = require('express').Router();
const { Service } = require('../db/models');

router.route('/').post(async (req, res) => {
  try {
    const { name, price, time, categoryId } = req.body;
    const service = await Service.create({
      name,
      price,
      time,
      categoryId,
    });

    res.json(service);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router
  .route('/:serviceId')
  .delete(async (req, res) => {
    try {
      const { serviceId } = req.params;
      const result = await Service.destroy({ where: { id: serviceId } });
      if (result > 0) {
        res.status(200).json({ message: 'success' });
        return;
      }
      throw new Error();
    } catch ({ message }) {
      res.status(400).json({ message });
    }
  })
  .patch(async (req, res) => {
    try {
      const { serviceId } = req.params;
      const targetService = await Service.findOne({ where: { id: serviceId } });
      if (req.body.name) targetService.name = req.body.name;
      if (req.body.price) targetService.price = req.body.price;
      if (req.body.time) targetService.time = req.body.time;
      if (req.body.categoryId) targetService.categoryId = req.body.categoryId;

      await targetService.save();
      return res.json(targetService.dataValues);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  })
  .get(async (req, res) => {
    try {
      const { serviceId } = req.params;
      const result = await Service.findOne({ where: { id: serviceId } });
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

router.get('/services/:serviceId', async (req, res) => {
  try {
    const { serviceId } = req.params;

    const services = await Service.findAll({
      where: { categoryId: serviceId },
    });

    return res.json(services);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});
module.exports = router;
