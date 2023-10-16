const { Router } = require('express');
const { Master } = require('../db/models');

const mainMasterRouter = Router();

mainMasterRouter.get('/main', async (req, res) => {
  const allMaster = await Master.findAll();
  res.json(allMaster);
});

module.exports = mainMasterRouter;
