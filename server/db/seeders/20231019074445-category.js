/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          id: 1,
          name: 'Косметология',
        },
        {
          id: 2,
          name: 'Ногтевой сервис',
        },
        {
          id: 3,
          name: 'Парикмахерские услуги',
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
