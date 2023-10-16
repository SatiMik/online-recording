/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Categories',
      [
        {

          name: 'Косметология',
        },
        {
          name: 'Ногтевой сервис',
        },
        {
          name: 'Парикмахерские услуги',

        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      'Masters',
      [
        {
          name: 'Дарья',
          desc: 'бубылда',
          img: 'https://mdbcdn.b-cdn.net/wp-content/uploads/2018/01/full-carousel.jpg',

        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
