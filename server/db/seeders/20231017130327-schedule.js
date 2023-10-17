/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Schedules', [
      {
        startTime: 10,
        endTime: 19,
        workDate: new Date().toISOString(),
        masterId: 1,
      },
      {
        startTime: 12,
        endTime: 18,
        workDate: new Date().toISOString(),
        masterId: 2,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Schedules', null, {});
  },
};
