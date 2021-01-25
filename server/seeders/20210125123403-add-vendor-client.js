'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.bulkInsert(
    //   'vendor_clients',
    //   [
    //     {
    //       client_id: 3,
    //       vendor_id: 1,
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
