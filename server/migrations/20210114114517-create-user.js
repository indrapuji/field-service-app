'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_lengkap: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Nama Lengkap cannot be empty'
          }
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Email cannot be empty'
          },
          isEmail: {
            args: true,
            msg: 'Must enter a valid email'
          }
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Password cannot be empty'
          },
          len: {
            args: [5, 20],
            msg: 'Password need to be between 5 and 20 words'
          }
        }
      },
      gender: {
        type: Sequelize.STRING,
        validate: {
          isIn: {
            args: [
              ['Male', 'Female', 'Others']
            ],
            msg: 'Invalid Gender'
          }
        }
      },
      alamat: {
        type: Sequelize.STRING
      },
      nama_bank: {
        type: Sequelize.STRING
      },
      no_rekening: {
        type: Sequelize.STRING
      },
      no_telp: {
        type: Sequelize.STRING
      },
      tgl_lahir: {
        type: Sequelize.STRING
      },
      no_ktp: {
        type: Sequelize.STRING
      },
      foto_profil: {
        type: Sequelize.STRING
      },
      tipe: {
        type: Sequelize.STRING,
        validate: {
          isIn: {
            args: [
              ['Super Admin', 'Admin', 'Leader', 'Admin Bank', 'Teknisi']
            ],
            msg: 'Invalid Tipe'
          }
        }
      },
      vendor_id: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('users');
  }
};