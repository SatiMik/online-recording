const express = require('express');
const { Master } = require('../db/models');

const router = express.Router();

router.route('/').get(async (req, res) => {
  const masters = await Master.findAll();
  res.json(masters);
});

module.exports = router;
