/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          name: 'Стрижки',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'Masters',
      [
        {
          name: 'Боб',
          desc: 'Да он просто БОГ',
          img: 'image is here',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Натали',
          desc: 'Так себе мастер, если честно',
          img: 'image is here',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Брат Боба',
          desc: 'Да он просто БОГ',
          img: 'image is here',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'Services',
      [
        {
          name: 'Так себе стрижка',
          price: 100,
          time: 60,
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Мегастрижка',
          price: 1000,
          time: 90,
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Нафиг надо',
          price: 1000,
          time: 120,
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Огнище',
          price: 1000,
          time: 30,
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Дядя Вася',
          phone: '89167778899',
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'Records',
      [
        {
          date: 11,
          time: 930,
          serviceId: 1,
          masterId: 2,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'Revues',
      [
        {
          text: 'Bla-bla-bla',
          status: false,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'MasterServices',
      [
        {
          masterId: 1,
          serviceId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          masterId: 1,
          serviceId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          masterId: 2,
          serviceId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          masterId: 2,
          serviceId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          masterId: 3,
          serviceId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {},
};
