'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Auth, {
        foreignKey: {
          name: 'userId',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      });

      User.hasMany(models.Rental, {
        foreignKey: {
          name: 'rentalId',
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        },
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      noTelepon: DataTypes.STRING,
      address: DataTypes.STRING,
      role: {
        allowNull: false,
        type: DataTypes.ENUM(
          'super admin',
          'admin',
          'member'
        ),
        defaultValue: 'member',
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
