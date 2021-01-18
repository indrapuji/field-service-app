'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class job_order_kondisi_merchant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      job_order_kondisi_merchant.belongsTo(models.job_order, { foreignKey: 'job_order_id' });
    }
  }
  job_order_kondisi_merchant.init(
    {
      keterangan: DataTypes.STRING,
      job_order_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'job_order_kondisi_merchant',
    }
  );
  return job_order_kondisi_merchant;
};
