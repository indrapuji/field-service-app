'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vendor_client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  vendor_client.init({
    client_id: DataTypes.INTEGER,
    vendor_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'vendor_client',
  });
  return vendor_client;
};