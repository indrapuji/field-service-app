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
          nama_lengkap: 'Admin',
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
          nama_lengkap: 'Leader',
          email: 'leader@leader.com',
          password: hashPassword('testing'),
          gender: 'Male',
          alamat: 'Jakarta',
          tipe: 'Leader',
          vendor_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_lengkap: 'Teknisi',
          email: 'teknisi@teknisi.com',
          password: hashPassword('testing'),
          gender: 'Male',
          alamat: 'Jakarta',
          tipe: 'Teknisi',
          vendor_id: 1,
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
