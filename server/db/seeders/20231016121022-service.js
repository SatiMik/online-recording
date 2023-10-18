/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Services',
      [
        {
          name: 'Маникюр',
          price: '1000',
          time: 60,
          categoryId: 2,
        },
        {
          name: 'Педикюр',
          price: '1500',
          time: 60,
          categoryId: 2,
        },
        {
          name: 'Наращивание ресниц',
          price: '1800',
          time: 30,
          categoryId: 1,
        },
        {
          name: 'Чистка лица',
          price: '3000',
          time: 60,
          categoryId: 1,
        },
        {
          name: 'Стрижка',
          price: '800',
          time: 30,
          categoryId: 3,
        },
        {
          name: 'Мелирование волос',
          price: '2000',
          time: 60,
          categoryId: 3,
        },

      ],

      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Services', null, {});
  },
};
