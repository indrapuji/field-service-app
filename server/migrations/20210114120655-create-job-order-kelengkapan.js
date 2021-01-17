'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('job_order_kelengkapans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      job_order_id: {
        type: Sequelize.INTEGER
      },
      adaptor: {
        type: Sequelize.STRING
      },
      dongle_prepaid: {
        type: Sequelize.STRING
      },
      kabel_telpon: {
        type: Sequelize.STRING
      },
      kabel_power: {
        type: Sequelize.STRING
      },
      sim_card: {
        type: Sequelize.STRING
      },
      sam_card: {
        type: Sequelize.STRING
      },
      kertas_termal: {
        type: Sequelize.STRING
      },
      keterangan: {
        type: Sequelize.STRING
      },
      materi_promosi: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('job_order_kelengkapans');
  }
};