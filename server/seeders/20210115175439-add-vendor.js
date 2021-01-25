'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.bulkInsert(
    //   'vendors',
    //   [
    //     {
    //       nama: 'Trendcom',
    //       alamat: 'Jakarta',
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //   ],
    //   {}
    // );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('vendors', null, {});
  },
};
