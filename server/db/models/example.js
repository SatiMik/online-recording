const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Example extends Model {
    static associate({ Master }) {
      this.belongsTo(Master, { foreignKey: 'masterId' });
    }
  }
  Example.init(
    {
      image: DataTypes.STRING,
      masterId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Example',
    }
  );
  return Example;
};
