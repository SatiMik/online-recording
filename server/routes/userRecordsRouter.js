const router = require('express').Router();
const { Record, Master, Service } = require('../db/models');

router.route('/').get(async (req, res) => {
  try {
    const userId = req.session.user.id;
    const records = await Record.findAll({
      where: { userId },
      include: [{ model: Master }, { model: Service }],
    });

    return res.json(records);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = router;
