'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class job_order_kelengkapan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  job_order_kelengkapan.init({
    job_order_id: DataTypes.INTEGER,
    adaptor: DataTypes.STRING,
    dongle_prepaid: DataTypes.STRING,
    kabel_telpon: DataTypes.STRING,
    kabel_power: DataTypes.STRING,
    sim_card: DataTypes.STRING,
    sam_card: DataTypes.STRING,
    kertas_termal: DataTypes.STRING,
    keterangan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'job_order_kelengkapan',
  });
  return job_order_kelengkapan;
};