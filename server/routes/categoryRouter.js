const router = require('express').Router();
const { Category } = require('../db/models');

router.route('/').post(async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({
      name,
    });

    res.json(category);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router
  .route('/:categoryId')
  .delete(async (req, res) => {
    try {
      const { categoryId } = req.params;
      const result = await Category.destroy({ where: { id: categoryId } });
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
      const { categoryId } = req.params;
      const targetCategory = await Category.findOne({
        where: { id: categoryId },
      });
      if (req.body.name) targetCategory.name = req.body.name;

      await targetCategory.save();
      return res.json(targetCategory.dataValues);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  })
  .get(async (req, res) => {
    try {
      const { categoryId } = req.params;
      const result = await Category.findOne({ where: { id: categoryId } });
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.json(categories);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = router;
