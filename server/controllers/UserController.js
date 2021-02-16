const createError = require('http-errors');
const { user, vendor, job_order, vendor_client, user_fcm_token, user_privilege } = require('../models');
const { generateToken } = require('../helpers/jwt');
const { comparePassword } = require('../helpers/bcrypt');
const serverUrl = require('../helpers/serverUrl');
const fs = require('fs');
const { Op } = require('sequelize');

class UserController {
  static login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw createError(400, 'Wrong Username/Password');
      const userData = await user.findOne({
        where: {
          email,
        },
        include: [{
          model: user_privilege,
          required: false
        }]
      });
      if (!userData) throw createError(400, 'Wrong Username/Password');
      const passwordVerification = comparePassword(password, userData.password);
      if (!passwordVerification) throw createError(400, 'Wrong Username/Password');
      const access_token = generateToken({ id: userData.id });
      res.status(200).json({
        userData,
        access_token,
        tipe: userData.tipe,
      });
    } catch (err) {
      next(err);
    }
  };
  static register = async (req, res, next) => {
    try {
      const { id } = req.UserData;
      const userData = await user.findOne({ where: { id } });
      console.log(userData.tipe);
      if (userData.tipe !== 'Super Admin' && userData.tipe !== 'Admin') throw createError(401, 'Unauthorized');
      let { nama_lengkap, email, password, gender, alamat, nama_bank, no_rekening, no_telp, tgl_lahir, no_ktp, tipe, vendor_id, privilege } = req.body;
      if (!privilege) throw createError(400, "Privilege harus ada");
      privilege = JSON.parse(privilege);
      if (!nama_lengkap || !email || !password || !tipe) throw createError(400, 'Input all required field');
      if (tipe !== 'Teknisi' && userData.tipe === 'Admin') throw createError(401, 'Unauthorized');
      let foto_profil = null;
      if (req.file) foto_profil = serverUrl + req.file.path;
      let query = {
        nama_lengkap,
        email,
        password,
        gender,
        alamat,
        nama_bank,
        no_rekening,
        no_telp,
        tgl_lahir,
        no_ktp,
        foto_profil,
        tipe,
      };
      if (userData.tipe === 'Admin') {
        query.vendor_id = userData.vendor_id;
      } else {
        if (!vendor_id) throw createError(400, 'Need Vendor Id');
        const vendorData = await vendor.findOne({ where: { id: vendor_id } });
        if (!vendorData) throw createError(404, 'Vendor Not Found');
        query.vendor_id = vendor_id;
      }
      const result = await user.create(query);
      if (tipe === 'Client') {
        await vendor_client.create({
          client_id: result.id,
          vendor_id,
        });
      }
      await Promise.all(privilege.map(async data => {
        await user_privilege.create({
          user_id: result.id,
          name: data
        });
      }));
      res.status(201).json(result);
    } catch (err) {
      next(err);
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
    }
  };
  static getUserProfile = async (req, res, next) => {
    try {
      const { id } = req.UserData;
      const userData = await user.findOne({
        where: { id },
      });
      const jobOrderCount = await job_order.count({ where: { teknisi_id: id } });
      const jobOrderDone = await job_order.count({ where: { teknisi_id: id, status: 'Done' } });
      const jobOrderProgres = await job_order.count({
        where: { teknisi_id: id, status: 'Progres' },
      });
      res.status(200).json({
        userData,
        jobOrderCount,
        jobOrderDone,
        jobOrderProgres,
      });
    } catch (err) {
      next(err);
    }
  };
  static getAllUser = async (req, res, next) => {
    try {
      const { id } = req.UserData;
      let { page, tipe, pagination } = req.query;
      if (!page || page < 1) page = 1;
      const resPerPage = 15;
      const offset = resPerPage * page - resPerPage;
      let query = {
        where: {},
      };
      const numOfResult = await user.count(query);
      if (!pagination) {
        query.limit = resPerPage;
      } else {
        query.limit = numOfResult;
      }
      query.offset = offset;
      const userData = await user.findOne({ where: { id } });
      if (userData.tipe === 'Admin') {
        if (tipe === 'Super Admin') throw createError(401, 'Not Authorized');
        query.where.vendor_id = userData.vendor_id;
        if (tipe) {
          query.where.tipe = tipe;
        } else {
          query.where.tipe = {
            [Op.ne]: 'Super Admin',
          };
        }
      }
      const result = await user.findAll(query);
      res.status(200).json({
        data: result,
        pages: Math.ceil(numOfResult / resPerPage),
        currentPage: Number(page),
        numOfResult,
      });
    } catch (err) {
      next(err);
    }
  };
  static addFirebaseToken = async (req, res, next) => {
    try {
      const { token } = req.body;
      const { id } = req.UserData;
      await user_fcm_token.destroy({ where: { user_id: id } });
      const result = await user_fcm_token.create({
        token,
        user_id: id
      });
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
  static editUser = async (req, res, next) => {
    try {
      const { id } = req.UserData;
      const { nama_lengkap, gender, alamat, nama_bank, no_rekening, no_telp, tgl_lahir, no_ktp } = req.body;
      const query = {};
      if (nama_lengkap) query.nama_lengkap = nama_lengkap;
      if (gender) query.gender = gender;
      if (alamat) query.alamat = alamat;
      if (nama_bank) query.nama_bank = nama_bank;
      if (no_rekening) query.no_rekening = no_rekening;
      if (no_telp) query.no_telp = no_telp;
      if (tgl_lahir) query.tgl_lahir = tgl_lahir;
      if (no_ktp) query.no_ktp = no_ktp;
      await user.update(query, {
        where: {
          id
        }
      });
      res.status(200).json({ msg: "Success" });
    } catch (err) {
      next(err);
    }
  }
  static singleUser = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await user.findOne({ where: { id } });
      if (!result) throw createError(404, "Data not found");
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
