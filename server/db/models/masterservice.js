const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MasterService extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Master, {
        foreignKey: 'masterId',
      });
      this.belongsTo(models.Service, {
        foreignKey: 'serviceId',
      });
    }
  }
  MasterService.init({
    serviceId: DataTypes.INTEGER,
    masterId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'MasterService',
  });
  return MasterService;
};
