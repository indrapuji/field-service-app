'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vendor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      vendor.hasMany(models.user, { foreignKey: 'vendor_id' });
      vendor.hasMany(models.job_order, { foreignKey: 'vendor_id' });
      // vendor.belongsToMany(models.user, { through: 'vendor_client', foreignKey: 'vendor_id' });
    }
  }
  vendor.init(
    {
      nama: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Nama cannot be empty',
          },
        },
      },
      alamat: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'vendor',
    }
  );
  return vendor;
};
