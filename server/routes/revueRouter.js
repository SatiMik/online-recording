const router = require('express').Router();
const { Revue, User } = require('../db/models');

router
  .route('/')
  .get(async (req, res) => {
    try {
      const revues = await Revue.findAll({ include: User });

      return res.json(revues);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  })
  .post(async (req, res) => {
    try {
      const { text, status, userId } = req.body;

      const revue = await Revue.create({
        text,
        status,
        userId,
      });
      res.json(revue);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

router
  .route('/:revueId')
  .delete(async (req, res) => {
    try {
      const { revueId } = req.params;
      const result = await Revue.destroy({ where: { id: revueId } });
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
      const { revueId } = req.params;
      const targetRevue = await Revue.findOne({ where: { id: revueId } });
      if (req.body.text) targetRevue.text = req.body.text;
      if (req.body.status) targetRevue.status = req.body.status;
      await targetRevue.save();
      return res.json(targetRevue.dataValues);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  })
  .get(async (req, res) => {
    try {
      const { revueId } = req.params;
      const result = await Revue.findOne({ where: { id: revueId } });
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

module.exports = router;
