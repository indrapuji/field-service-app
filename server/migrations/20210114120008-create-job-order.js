'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('job_orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tanggal_assign: {
        type: Sequelize.STRING,
      },
      tanggal_done: {
        type: Sequelize.STRING,
      },
      merchant: {
        type: Sequelize.STRING,
      },
      mid: {
        type: Sequelize.STRING,
      },
      tid: {
        type: Sequelize.STRING,
      },
      tid_2: {
        type: Sequelize.STRING,
      },
      alamat: {
        type: Sequelize.STRING,
      },
      kota: {
        type: Sequelize.STRING,
      },
      no_telp: {
        type: Sequelize.STRING,
      },
      edc_connection: {
        type: Sequelize.STRING,
      },
      sn_edc: {
        type: Sequelize.STRING,
      },
      sn_edc_2: {
        type: Sequelize.STRING,
      },
      type_edc: {
        type: Sequelize.STRING,
      },
      regional: {
        type: Sequelize.STRING,
      },
      pic: {
        type: Sequelize.STRING,
      },
      nama_merchant: {
        type: Sequelize.STRING,
      },
      alamat_merchant: {
        type: Sequelize.STRING,
      },
      no_telp_merchant: {
        type: Sequelize.STRING,
      },
      pic_merchant: {
        type: Sequelize.STRING,
      },
      jam_mulai_kerja: {
        type: Sequelize.STRING,
      },
      jam_selesai_kerja: {
        type: Sequelize.STRING,
      },
      tipe: {
        type: Sequelize.STRING,
      },
      aktifitas: {
        type: Sequelize.STRING,
      },
      vendor_id: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
      },
      alasan_gagal: {
        type: Sequelize.STRING,
      },
      problem_merchant: {
        type: Sequelize.STRING,
      },
      lain_lain: {
        type: Sequelize.STRING,
      },
      edc_kompetitor: {
        type: Sequelize.STRING,
      },
      catatan: {
        type: Sequelize.STRING,
      },
      foto_toko_1: {
        type: Sequelize.STRING,
      },
      foto_toko_2: {
        type: Sequelize.STRING,
      },
      foto_edc_1: {
        type: Sequelize.STRING,
      },
      foto_edc_2: {
        type: Sequelize.STRING,
      },
      admin_id: {
        type: Sequelize.INTEGER,
      },
      teknisi_id: {
        type: Sequelize.INTEGER,
      },
      tanda_tangan: {
        type: Sequelize.STRING,
      },
      tanggal_close: {
        type: Sequelize.STRING,
      },
      di_close_oleh: {
        type: Sequelize.STRING,
      },
      adaptor: {
        type: Sequelize.STRING,
      },
      dongle_prepaid: {
        type: Sequelize.STRING,
      },
      kabel_telpon: {
        type: Sequelize.STRING,
      },
      kabel_power: {
        type: Sequelize.STRING,
      },
      sim_card: {
        type: Sequelize.STRING,
      },
      sam_card: {
        type: Sequelize.STRING,
      },
      kertas_termal: {
        type: Sequelize.STRING,
      },
      materi_promosi: {
        type: Sequelize.STRING,
      },
      status_kertas_termal: {
        type: Sequelize.STRING,
      },
      manual_book: {
        type: Sequelize.STRING,
      },
      sales_draft: {
        type: Sequelize.STRING,
      },
      sticker: {
        type: Sequelize.STRING,
      },
      edukasi_merchant: {
        type: Sequelize.STRING,
      },
      lokasi_edc: {
        type: Sequelize.STRING,
      },
      posisi_edc: {
        type: Sequelize.STRING,
      },
      status_edc: {
        type: Sequelize.STRING,
      },
      latitude: {
        type: Sequelize.STRING,
      },
      longitude: {
        type: Sequelize.STRING,
      },
      keluhan: {
        type: Sequelize.STRING,
      },
      merchant_open: {
        type: Sequelize.STRING,
      },
      edukasi_fraud: {
        type: Sequelize.STRING,
      },
      edukasi_gestun: {
        type: Sequelize.STRING,
      },
      edukasi_surcharge: {
        type: Sequelize.STRING,
      },
      edukasi_kartu_asing: {
        type: Sequelize.STRING,
      },
      edukasi_double_transaksi: {
        type: Sequelize.STRING,
      },
      no_aplikasi: {
        type: Sequelize.STRING,
      },
      nama_sumber: {
        type: Sequelize.STRING,
      },
      jenis_kelamin: {
        type: Sequelize.STRING,
      },
      hub_sumber_informasi: {
        type: Sequelize.STRING,
      },
      app_kerja: {
        type: Sequelize.STRING,
      },
      bidang_usaha: {
        type: Sequelize.STRING,
      },
      lama_usaha: {
        type: Sequelize.STRING,
      },
      lama_bekerja: {
        type: Sequelize.STRING,
      },
      jabatan_aplikan: {
        type: Sequelize.STRING,
      },
      status_aplikan: {
        type: Sequelize.STRING,
      },
      status_karyawan: {
        type: Sequelize.STRING,
      },
      jumlah_karyawan: {
        type: Sequelize.STRING,
      },
      penghasilan_aplikasi_perbulan: {
        type: Sequelize.STRING,
      },
      status_kepemilikan_kantor: {
        type: Sequelize.STRING,
      },
      kondisi_merchant: {
        type: Sequelize.STRING,
      },
      lokasi_lingkungan_merchant: {
        type: Sequelize.STRING,
      },
      kondisi_bangunan_merchant: {
        type: Sequelize.STRING,
      },
      peralatan_kantor_yang_terlihat: {
        type: Sequelize.STRING,
      },
      verify: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('job_orders');
  },
};
