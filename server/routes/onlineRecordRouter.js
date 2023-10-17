const router = require('express').Router();
// const { Op } = require('sequelize');
const {
  Master, MasterService, Service, Category,
  //  Record,
} = require('../db/models');

router.get('/masters', async (req, res) => {
  try {
    const { masterId } = req.params;
    const masters = await Master.findAll();
    const services = await MasterService.findAll({
      where: { masterId },
      include: { model: Service },
    });
    console.log(services, '-------------------- services');
    return res.json(masters, services);
  } catch (error) {
    console.log(error, 'ошибка в получении мастеров');
    return res.sendStatus(500);
  }
});

// router.get('/masters/:masterId/services', async (req, res) => {
//   try {
//     const { masterId } = req.params;
//     // console.log(masterId, '-------------------- id');
//     // console.log(services, '-------------------- services');
//     return res.json(serviceList);
//   } catch (error) {
//     console.log(error, 'ошибка в получении услуги мастера по id');
//     return res.sendStatus(500);
//   }
// });
// router.post('/masters/:masterId/services', async (req, res) => {
//   const { masterId } = req.params;
//   const { service } = req.body;
//   try {
//     console.log(req.body, '-------------------- body');
//     const onlineRecord = await Record.create({
//       masterId,
//       serviceId: service.Id,
//       userId: req.session?.user?.id,
//       time: req.body.time,
//       date: req.body.date,

//     });
//     console.log(onlineRecord, '-------------------- onlineRecord');

//     return res.json(onlineRecord);
//   } catch (error) {
//     console.log(error, 'ошибка в создании онлайн-записи');
//     return res.sendStatus(500);
//   }
// });

router.get('/services/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;
    // console.log(categoryId, '-------------------- id');
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
