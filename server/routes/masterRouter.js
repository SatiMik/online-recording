const router = require('express').Router();
const { Master, Example } = require('../db/models');

router
  .route('/')
  .get(async (req, res) => {
    try {
      console.log('ЗАШЕЛ ---');
      const masters = await Master.findAll();

      return res.json(masters);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  })
  .post(async (req, res) => {
    try {
      const { name, desc, img } = req.body;
      const master = await Master.create({
        name,
        desc,
        img,
      });
      res.json(master);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

router
  .route('/:masterId')
  .delete(async (req, res) => {
    try {
      const { masterId } = req.params;
      console.log(masterId, '-------------------- id');
      const result = await Master.destroy({ where: { id: masterId } });
      console.log(result);
      if (result > 0) {
        res.status(200).json({ message: 'success' });
        return;
      }
      throw new Error();
    } catch ({ message }) {
      console.log(message);
      res.status(400).json({ message });
    }
  })
  .patch(async (req, res) => {
    try {
      const { masterId } = req.params;
      const targetMaster = await Master.findOne({ where: { id: masterId } });
      if (req.body.name) targetMaster.name = req.body.name;
      if (req.body.desc) targetMaster.desc = req.body.desc;
      if (req.body.img) targetMaster.img = req.body.img;

      await targetMaster.save();
      return res.json(targetMaster.dataValues);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  })
  .get(async (req, res) => {
    try {
      const { masterId } = req.params;
      const result = await Master.findOne({ where: { id: masterId } });
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

router.get('/works/:masterId', async (req, res) => {
  try {
    const { masterId } = req.params;
    const works = await Example.findAll({ where: { masterId } });
    res.status(200).json(works);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});
module.exports = router;
