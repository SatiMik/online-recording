const router = require('express').Router();
const { Revue, User } = require('../db/models');

router
  .route('/')
  .get(async (req, res) => {
    try {
      console.log('');
      const revues = await Revue.findAll({ include: User });

      return res.json(revues);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  })
  .post(async (req, res) => {
    try {
      const { text, status, userId, rating, date } = req.body;

      const revue = await Revue.create({
        text,
        status,
        userId,
        rating,
        date,
      });
      const result = await Revue.findOne({
        where: { id: revue.id },
        include: User,
      });
      res.json(result);
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
      if (req.body.rating) targetRevue.rating = req.body.rating;

      targetRevue.status = !targetRevue.status;
      await targetRevue.save();
      const result = await Revue.findOne({
        where: { id: revueId },
        include: User,
      });
      return res.json(result);
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
