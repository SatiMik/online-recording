const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Category, {
        foreignKey: 'categoryId',
      });
      this.hasMany(models.MasterService, {
        foreignKey: 'serviceId',
      });
      this.hasMany(models.Record, {
        foreignKey: 'serviceId',
      });
      this.belongsToMany(models.Master, {
        foreignKey: 'serviceId',
        through: models.MasterService,
      });
    }
  }
  Service.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    time: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Service',
  });
  return Service;
};
