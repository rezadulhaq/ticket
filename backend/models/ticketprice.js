'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TicketPrice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TicketPrice.init({
    CategoryId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    TicketId: DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN,
    color: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TicketPrice',
  });
  return TicketPrice;
};