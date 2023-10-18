const express = require('express');
const { Service, Master } = require('../db/models');

const router = express.Router();

router.route('/:id/:status').get(async (req, res) => {
  try {
    const { id, status } = req.params;
    const master = await Master.findOne({
      where: { id },
      include: {
        model: Service,
      },
    });
    const services = master.Services.filter((service) => service.time <= status * 30);
    console.log(services);
    res.json(services);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
