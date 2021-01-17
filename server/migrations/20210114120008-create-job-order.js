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
      nama_merchant: {
        type: Sequelize.STRING,
      },
      alamat_merchant: {
        type: Sequelize.STRING,
      },
      alamat_merchant_2: {
        type: Sequelize.STRING,
      },
      tipe_merchant: {
        type: Sequelize.STRING,
      },
      kondisi_merchant: {
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
      kontak_person: {
        type: Sequelize.STRING,
      },
      no_telp: {
        type: Sequelize.STRING,
      },
      nama_bank: {
        type: Sequelize.STRING,
      },
      tipe_terminal: {
        type: Sequelize.STRING,
      },
      serial_number: {
        type: Sequelize.STRING,
      },
      serial_number_2: {
        type: Sequelize.STRING,
      },
      serial_number_3: {
        type: Sequelize.STRING,
      },
      tipe: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      tanda_tangan: {
        type: Sequelize.STRING,
      },
      tanggal_assign: {
        type: Sequelize.DATE,
      },
      tanggal_selesai: {
        type: Sequelize.DATE,
      },
      keterangan: {
        type: Sequelize.STRING,
      },
      mid: {
        type: Sequelize.STRING,
      },
      foto_1: {
        type: Sequelize.STRING,
      },
      foto_2: {
        type: Sequelize.STRING,
      },
      foto_3: {
        type: Sequelize.STRING,
      },
      foto_4: {
        type: Sequelize.STRING,
      },
      foto_5: {
        type: Sequelize.STRING,
      },
      vendor_id: {
        type: Sequelize.INTEGER,
      },
      teknisi_id: {
        type: Sequelize.INTEGER,
      },
      edukasi_merchant: {
        type: Sequelize.STRING,
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
