/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('MasterServices', [
      {
        serviceId: 1,
        masterId: 1,
      },
      {
        serviceId: 2,
        masterId: 1,
      },
      {
        serviceId: 3,
        masterId: 2,
      },
      {
        serviceId: 4,
        masterId: 2,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('MasterServices', null, {});
  },
};
