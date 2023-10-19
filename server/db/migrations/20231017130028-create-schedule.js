/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.sequelize.query('ALTER DATABASE finalOne SET timezone TO "GMT";');
    await queryInterface.createTable('Schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      startTime: {
        type: Sequelize.INTEGER,
      },
      endTime: {
        type: Sequelize.INTEGER,
      },
      workDate: {
        type: Sequelize.DATE,
      },
      masterId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Masters',
          key: 'id',
        },
        onDelete: 'CASCADE',

      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Schedules');
  },
};
