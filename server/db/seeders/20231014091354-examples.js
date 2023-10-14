/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Examples',
      [
        {
          image: 'https://screenshots.codesandbox.io/8e8dw/6.png',
          masterId: 1,
        },
        {
          image:
            'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/234b2896510375.5eb03a443f9f2.png',
          masterId: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
