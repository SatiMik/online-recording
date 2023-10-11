const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Revue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  Revue.init({
    text: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Revue',
  });
  return Revue;
};
