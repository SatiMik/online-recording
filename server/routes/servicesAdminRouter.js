const express = require('express');
const { Service, Master } = require('../db/models');

const router = express.Router();

router.route('/:id/:status').get(async (req, res) => {
  try {
    const { status } = req.params;
    const id = Math.abs(req.params.id);
    const master = await Master.findOne({
      where: { id },
      include: {
        model: Service,
      },
    });
    let services;
    if (status !== '0') {
      services = master.Services.filter((service) => service.time <= status * 30);
    } else {
      services = master.Services;
    }
    res.json(services);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
