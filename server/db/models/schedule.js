const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Master, {
        foreignKey: 'masterId',
      });
    }
  }
  Schedule.init({
    startTime: DataTypes.INTEGER,
    endTime: DataTypes.INTEGER,
    workDate: DataTypes.DATE,
    masterId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};
