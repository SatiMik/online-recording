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
        masterId: 1,
      },
      {
        serviceId: 4,
        masterId: 1,
      },
      {
        serviceId: 5,
        masterId: 1,
      },
      {
        serviceId: 6,
        masterId: 1,
      },
      {
        serviceId: 7,
        masterId: 1,
      },
      {
        serviceId: 8,
        masterId: 1,
      },
      {
        serviceId: 9,
        masterId: 1,
      },
      {
        serviceId: 10,
        masterId: 1,
      },
      {
        serviceId: 11,
        masterId: 2,
      },
      {
        serviceId: 12,
        masterId: 2,
      },
      {
        serviceId: 13,
        masterId: 2,
      },
      {
        serviceId: 14,
        masterId: 2,
      },
      {
        serviceId: 15,
        masterId: 2,
      },
      {
        serviceId: 16,
        masterId: 2,
      },
      {
        serviceId: 17,
        masterId: 2,
      },
      {
        serviceId: 18,
        masterId: 2,
      },
      {
        serviceId: 19,
        masterId: 2,
      },
      {
        serviceId: 20,
        masterId: 2,
      },

      {
        serviceId: 22,
        masterId: 3,
      },
      {
        serviceId: 30,
        masterId: 3,
      },
      {
        serviceId: 31,
        masterId: 3,
      },

      {
        serviceId: 23,
        masterId: 4,
      },
      {
        serviceId: 24,
        masterId: 4,
      },
      {
        serviceId: 25,
        masterId: 4,
      },
      {
        serviceId: 26,
        masterId: 4,
      },
      {
        serviceId: 27,
        masterId: 4,
      },
      {
        serviceId: 28,
        masterId: 4,
      },
      {
        serviceId: 29,
        masterId: 4,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('MasterServices', null, {});
  },
};
