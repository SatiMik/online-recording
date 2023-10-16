/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Masters', [
      {
        name: 'Master 1',
        desc: 'Описание мастера 1',
        img: 'https://i.pinimg.com/564x/5f/7a/ad/5f7aadbce8aad7c01206090825b5bccc.jpg',
      },
      {
        name: 'Master 2',
        desc: 'Описание мастера 2',
        img: 'https://i.pinimg.com/564x/bc/ed/22/bced22635d8e204fad66e3e0d7da4e8f.jpg',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Masters', null, {});
  },
};
