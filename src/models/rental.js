'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rental extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rental.belongsTo(models.Car, {
        foreignKey: {
          name: 'carId',
        },
      });

      Rental.belongsTo(models.User, {
        foreignKey: {
          name: 'userId',
        },
      });
    }
  }
  Rental.init(
    {
      price: DataTypes.INTEGER,
      carId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Rental',
    }
  );
  return Rental;
};
