'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class job_order_edc_bank extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      job_order_edc_bank.belongsTo(models.job_order, { foreignKey: 'job_order_id' });
    }
  }
  job_order_edc_bank.init(
    {
      nama_bank: DataTypes.STRING,
      job_order_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'job_order_edc_bank',
    }
  );
  return job_order_edc_bank;
};
