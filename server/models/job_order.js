'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class job_order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      job_order.hasOne(models.job_order_kelengkapan, { foreignKey: 'job_order_id' });
      job_order.belongsTo(models.user, { foreignKey: 'teknisi_id' });
      job_order.belongsTo(models.vendor, { foreignKey: 'vendor_id' });
      job_order.hasMany(models.job_order_edc_bank, { foreignKey: 'job_order_id' });
      job_order.hasMany(models.job_order_kondisi_merchant, { foreignKey: 'job_order_id' });
    }
  }
  job_order.init(
    {
      nama_merchant: DataTypes.STRING,
      alamat_merchant: DataTypes.STRING,
      alamat_merchant_2: DataTypes.STRING,
      tipe_merchant: DataTypes.STRING,
      manual_book: DataTypes.STRING,
      sales_draft: DataTypes.STRING,
      sticker: DataTypes.STRING,
      kontak_person: DataTypes.STRING,
      no_telp: DataTypes.STRING,
      nama_bank: DataTypes.STRING,
      tipe_terminal: DataTypes.STRING,
      serial_number: DataTypes.STRING,
      serial_number_2: DataTypes.STRING,
      serial_number_3: DataTypes.STRING,
      tipe: DataTypes.STRING,
      status: DataTypes.STRING,
      tanda_tangan: DataTypes.STRING,
      tanggal_assign: DataTypes.DATE,
      tanggal_selesai: DataTypes.DATE,
      keterangan: DataTypes.STRING,
      mid: DataTypes.STRING,
      foto_1: DataTypes.STRING,
      foto_2: DataTypes.STRING,
      foto_3: DataTypes.STRING,
      foto_4: DataTypes.STRING,
      foto_5: DataTypes.STRING,
      vendor_id: DataTypes.INTEGER,
      teknisi_id: DataTypes.INTEGER,
      edukasi_merchant: DataTypes.STRING,
      jenis_mesin_edc: DataTypes.STRING,
      lokasi_mesin_edc: DataTypes.STRING,
      posisi_mesin_edc: DataTypes.STRING,
      keluhan: DataTypes.STRING,
      status_edc: DataTypes.STRING,
      kondisi_edc: DataTypes.STRING,
      status_kunjungan: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'job_order',
    }
  );
  return job_order;
};
