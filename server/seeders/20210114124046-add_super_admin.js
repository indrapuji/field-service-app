'use strict';

const { hashPassword } = require("../helpers/bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      nama_lengkap: 'Super Admin',
      email: 'super@super.com',
      password: hashPassword("testing"),
      gender: 'Male',
      alamat: "Jakarta",
      tipe: "Super Admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
