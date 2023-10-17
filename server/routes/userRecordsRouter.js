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

router.route('/:userRecordId').delete(async (req, res) => {
  try {
    const { userRecordId } = req.params;
    const result = await Record.destroy({ where: { id: userRecordId } });
    if (result > 0) {
      res.status(200).json({ message: 'success' });
      return;
    }
    throw new Error();
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});
module.exports = router;
