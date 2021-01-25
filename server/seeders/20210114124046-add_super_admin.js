'use strict';

const { hashPassword } = require('../helpers/bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          nama_lengkap: 'Super Admin',
          email: 'super@super.com',
          password: hashPassword('testing'),
          gender: 'Male',
          alamat: 'Jakarta',
          tipe: 'Super Admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_lengkap: 'Admin Vendor',
          email: 'admin@admin.com',
          password: hashPassword('testing'),
          gender: 'Male',
          alamat: 'Jakarta',
          tipe: 'Admin',
          vendor_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_lengkap: 'Admin Bank',
          email: 'client@client.com',
          password: hashPassword('testing'),
          gender: 'Male',
          alamat: 'Jakarta',
          tipe: 'Client',
          vendor_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_lengkap: 'Rahmat Hardian',
          email: 'teknisi@teknisi.com',
          password: hashPassword('testing'),
          gender: 'Male',
          alamat: 'Jln Kampung Rawa Selatan',
          tipe: 'Teknisi',
          vendor_id: 1,
          nama_bank: 'BCA',
          no_rekening: '8415093230',
          no_telp: '08123456789',
          tgl_lahir: '10/11/1985',
          no_ktp: '123456789',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
