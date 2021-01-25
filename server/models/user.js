'use strict';
const { Model } = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.job_order, { foreignKey: 'teknisi_id' });
      user.belongsTo(models.vendor, { foreignKey: 'vendor_id' });
      user.belongsToMany(models.vendor, { through: 'vendor_client', foreignKey: 'client_id' });
    }
  }
  user.init(
    {
      nama_lengkap: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Nama Lengkap cannot be empty',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Email cannot be empty',
          },
          isEmail: {
            args: true,
            msg: 'Must enter a valid email',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Password cannot be empty',
          },
          len: {
            args: [5, 20],
            msg: 'Password need to be between 5 and 20 words',
          },
        },
      },
      gender: {
        type: DataTypes.STRING,
        validate: {
          isIn: {
            args: [['Male', 'Female', 'Others']],
            msg: 'Invalid Gender',
          },
        },
      },
      alamat: DataTypes.STRING,
      nama_bank: DataTypes.STRING,
      no_rekening: DataTypes.STRING,
      no_telp: DataTypes.STRING,
      tgl_lahir: DataTypes.STRING,
      no_ktp: DataTypes.STRING,
      foto_profil: DataTypes.STRING,
      tipe: {
        type: DataTypes.STRING,
      },
      vendor_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'user',
      hooks: {
        beforeSave: (instance) => {
          instance.password = hashPassword(instance.password);
        },
      },
    }
  );
  return user;
};
