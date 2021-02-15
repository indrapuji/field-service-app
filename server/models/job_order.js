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
      job_order.belongsTo(models.user, { foreignKey: 'teknisi_id', as: "Teknisi" });
      job_order.belongsTo(models.vendor, { foreignKey: 'vendor_id' });
      job_order.belongsTo(models.user, { foreignKey: 'admin_id', as: "Admin" });
    }
  }
  job_order.init(
    {
      tanggal_impor: {
        type: DataTypes.STRING,
      },
      tanggal_tugas: {
        type: DataTypes.STRING,
      },
      merchant: {
        type: DataTypes.STRING,
      },
      mid: {
        type: DataTypes.STRING,
      },
      tid: {
        type: DataTypes.STRING,
      },
      tid_2: {
        type: DataTypes.STRING,
      },
      alamat: {
        type: DataTypes.STRING,
      },
      kota: {
        type: DataTypes.STRING,
      },
      no_telp: {
        type: DataTypes.STRING,
      },
      edc_connection: {
        type: DataTypes.STRING,
      },
      sn_edc: {
        type: DataTypes.STRING,
      },
      sn_edc_2: {
        type: DataTypes.STRING,
      },
      type_edc: {
        type: DataTypes.STRING,
      },
      regional: {
        type: DataTypes.STRING,
      },
      pic: {
        type: DataTypes.STRING,
      },
      nama_merchant: {
        type: DataTypes.STRING,
      },
      alamat_merchant: {
        type: DataTypes.STRING,
      },
      no_telp_merchant: {
        type: DataTypes.STRING,
      },
      pic_merchant: {
        type: DataTypes.STRING,
      },
      jam_mulai_kerja: {
        type: DataTypes.STRING,
      },
      jam_selesai_kerja: {
        type: DataTypes.STRING,
      },
      tipe: {
        type: DataTypes.STRING,
      },
      aktifitas: {
        type: DataTypes.STRING,
      },
      vendor_id: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.STRING,
      },
      alasan_gagal: {
        type: DataTypes.STRING,
      },
      problem_merchant: {
        type: DataTypes.STRING,
      },
      lain_lain: {
        type: DataTypes.STRING,
      },
      edc_kompetitor: {
        type: DataTypes.STRING,
      },
      catatan: {
        type: DataTypes.STRING,
      },
      foto_toko_1: {
        type: DataTypes.STRING,
      },
      foto_toko_2: {
        type: DataTypes.STRING,
      },
      foto_edc_1: {
        type: DataTypes.STRING,
      },
      foto_edc_2: {
        type: DataTypes.STRING,
      },
      admin_id: {
        type: DataTypes.INTEGER,
      },
      teknisi_id: {
        type: DataTypes.INTEGER,
      },
      tanda_tangan: {
        type: DataTypes.STRING,
      },
      tanggal_close: {
        type: DataTypes.STRING,
      },
      di_close_oleh: {
        type: DataTypes.STRING,
      },
      adaptor: {
        type: DataTypes.STRING,
      },
      dongle_prepaid: {
        type: DataTypes.STRING,
      },
      kabel_telpon: {
        type: DataTypes.STRING,
      },
      kabel_power: {
        type: DataTypes.STRING,
      },
      sim_card: {
        type: DataTypes.STRING,
      },
      sam_card: {
        type: DataTypes.STRING,
      },
      kertas_termal: {
        type: DataTypes.STRING,
      },
      materi_promosi: {
        type: DataTypes.STRING,
      },
      status_kertas_termal: {
        type: DataTypes.STRING,
      },
      manual_book: {
        type: DataTypes.STRING,
      },
      sales_draft: {
        type: DataTypes.STRING,
      },
      sticker: {
        type: DataTypes.STRING,
      },
      edukasi_merchant: {
        type: DataTypes.STRING,
      },
      lokasi_edc: {
        type: DataTypes.STRING,
      },
      posisi_edc: {
        type: DataTypes.STRING,
      },
      status_edc: {
        type: DataTypes.STRING,
      },
      latitude: {
        type: DataTypes.STRING,
      },
      longitude: {
        type: DataTypes.STRING,
      },
      keluhan: {
        type: DataTypes.STRING,
      },
      merchant_open: {
        type: DataTypes.STRING,
      },
      edukasi_fraud: {
        type: DataTypes.STRING,
      },
      edukasi_gestun: {
        type: DataTypes.STRING,
      },
      edukasi_surcharge: {
        type: DataTypes.STRING,
      },
      edukasi_kartu_asing: {
        type: DataTypes.STRING,
      },
      edukasi_double_transaksi: {
        type: DataTypes.STRING,
      },
      no_aplikasi: {
        type: DataTypes.STRING,
      },
      nama_sumber: {
        type: DataTypes.STRING,
      },
      jenis_kelamin: {
        type: DataTypes.STRING,
      },
      hub_sumber_informasi: {
        type: DataTypes.STRING,
      },
      app_kerja: {
        type: DataTypes.STRING,
      },
      bidang_usaha: {
        type: DataTypes.STRING,
      },
      lama_usaha: {
        type: DataTypes.STRING,
      },
      lama_bekerja: {
        type: DataTypes.STRING,
      },
      jabatan_aplikan: {
        type: DataTypes.STRING,
      },
      status_aplikan: {
        type: DataTypes.STRING,
      },
      status_karyawan: {
        type: DataTypes.STRING,
      },
      jumlah_karyawan: {
        type: DataTypes.STRING,
      },
      penghasilan_aplikasi_perbulan: {
        type: DataTypes.STRING,
      },
      status_kepemilikan_kantor: {
        type: DataTypes.STRING,
      },
      kondisi_merchant: {
        type: DataTypes.STRING,
      },
      lokasi_lingkungan_merchant: {
        type: DataTypes.STRING,
      },
      kondisi_bangunan_merchant: {
        type: DataTypes.STRING,
      },
      peralatan_kantor_yang_terlihat: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'job_order',
    }
  );
  return job_order;
};
