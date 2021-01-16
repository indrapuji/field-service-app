'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'job_orders',
      [
        {
          nama_merchant: 'Merchant 1',
          alamat_merchant: 'Pondok Indah',
          nama_bank: 'Bukopin',
          tipe_terminal: 'ICT',
          serial_number: 'ICT12341',
          tipe: 'CM',
          status: 'Assign',
          tanggal_assign: new Date(),
          mid: '214135',
          vendor_id: 1,
          teknisi_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_merchant: 'Merchant 2',
          alamat_merchant: 'Lampung',
          nama_bank: 'Bukopin',
          tipe_terminal: 'ICT',
          serial_number: 'ICT12341',
          tipe: 'PM',
          status: 'Assign',
          tanggal_assign: new Date(),
          mid: '214135',
          vendor_id: 1,
          teknisi_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('vendors', null, {});
  },
};
