const express = require('express');
const { Record, User, Master, Service } = require('../db/models');

const router = express.Router();
const getAllRecords = async () => {
  const recordsFromDatabase = await Record.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'serviceId', 'userId', 'masterId'],
    },
    include: [
      {
        model: User,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'isAdmin'],
        },
      },
      {
        model: Master,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'desc', 'img'],
        },
      },
      {
        model: Service,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'categoryId'],
        },
      },
    ],
  });
  const records = [];
  let masters = await Master.findAll();
  masters = masters.map((master) => ({ id: master.id, name: master.name }));
  // eslint-disable-next-line no-return-assign
  masters.forEach((master) => {
    const recordsArray = recordsFromDatabase.filter((record) => record.Master.id === master.id);
    const recordsObj = {};
    for (let i = 800; i < 2000; i += 50) {
      recordsObj[i] = {
        status: -1,
        statusFree: -1,
        record: null,
        time: i,
        master: {
          id: master.id,
          name: master.name,
        },
      };
    }
    recordsArray.forEach((record) => {
      let newTime = record.time;
      if (record.time % 100 === 30) newTime += 20; //
      recordsObj[newTime] = {
        status: record.Service.time / 30,
        statusFree: 0,
        record,
        time: newTime,
        master: {
          id: master.id,
          name: master.name,
        },
      };
    });
    const recordsAgainArray = [];
    for (let i = 800; i < 2000; i += 50) {
      if (recordsObj[i].status > 1) {
        const { status } = recordsObj[i];
        for (let j = 1; j < status; j += 1) {
          i += 50;
          recordsObj[i].status = 0;
          recordsObj[i].statusFree = 0;
        }
        i -= 50 * (status - 1);
      }
    }
    let countFree = 1;
    for (let i = 1950; i >= 800; i -= 50) {
      if (recordsObj[i].statusFree === -1) {
        recordsObj[i].statusFree = countFree;
        countFree += 1;
      } else countFree = 1;
    }
    for (let i = 800; i < 2000; i += 50) {
      recordsAgainArray.push(recordsObj[i]);
    }
    records.push({
      master: {
        id: master.id,
        name: master.name,
      },
      records: recordsAgainArray,
    });
  });
  return records;
};

router
  .route('/')
  .get(async (req, res) => {
    try {
      const records = await getAllRecords();
      res.json(records);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  })
  .post(async (req, res) => {
    try {
      const [user, createdUser] = await User.findOrCreate({
        where: { phone: req.body.phone },
        defaults: {
          name: req.body.user,
          isAdmin: false,
        },
      });
      const service = await Service.findOne({
        where: {
          name: req.body.service,
        },
      });
      const master = await Master.findOne({
        where: {
          name: req.body.master,
        },
      });
      await Record.create({
        date: req.body.date,
        time: req.body.time,
        serviceId: service.id,
        masterId: master.id,
        userId: user.id,
      });

      const records = await getAllRecords();
      res.json(records);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

router.delete('/:id', async (req, res) => {
  try {
    await Record.destroy({ where: { id: req.params.id } });
    const records = await getAllRecords();
    res.json(records);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
