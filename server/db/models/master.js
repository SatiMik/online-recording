const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.MasterService, {
        foreignKey: 'masterId',
      });
      this.hasMany(models.Record, {
        foreignKey: 'masterId',
      });
    }
  }
  Master.init({
    name: DataTypes.STRING,
    desc: DataTypes.STRING,
    img: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Master',
  });
  return Master;
};
