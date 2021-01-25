const createError = require('http-errors');
const { user, vendor, job_order } = require('../models');
const { generateToken } = require('../helpers/jwt');
const { comparePassword } = require('../helpers/bcrypt');
const serverUrl = require('../helpers/serverUrl');
const fs = require('fs');

class UserController {
  static login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw createError(400, 'Wrong Username/Password');
      const userData = await user.findOne({
        where: {
          email,
        },
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
      let { nama_lengkap, email, password, gender, alamat, nama_bank, no_rekening, no_telp, tgl_lahir, no_ktp, tipe, vendor_id } = req.body;
      if (!nama_lengkap || !email || !password || !tipe) throw createError(400, 'Input all required field');
      let foto_profil = null;
      if (req.file) foto_profil = serverUrl + req.file.path;
      const result = await user.create({
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
        vendor_id,
      });
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
      let { page } = req.query;
      if (!page || page < 1) page = 1;
      const resPerPage = 15;
      const offset = resPerPage * page - resPerPage;
      const result = await user.findAll({
        limit: resPerPage,
        offset,
      });
      const numOfResult = await user.count();
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
}

module.exports = UserController;
