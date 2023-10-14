const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Master extends Model {
    static associate(models) {
      this.hasMany(models.MasterService, {
        foreignKey: 'masterId',
      });
      this.hasMany(models.Record, {
        foreignKey: 'masterId',
      });
      this.hasMany(models.Example, { foreignKey: 'masterId' });
    }
  }
  Master.init(
    {
      name: DataTypes.STRING,
      desc: DataTypes.STRING,
      img: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Master',
    }
  );
  return Master;
};
