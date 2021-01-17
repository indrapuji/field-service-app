const createError = require('http-errors');
const { user, vendor, job_order } = require('../models');
const { generateToken } = require('../helpers/jwt');
const { comparePassword } = require('../helpers/bcrypt');
const serverUrl = require('../helpers/serverUrl');

class UserController {
  static login = async (req, res, next) => {
    try {
      const { email, password, tipe } = req.body;
      console.log(email, password, tipe);
      if (!email || !password || !tipe) throw createError(400, 'Wrong Username/Password');
      const userData = await user.findOne({
        where: {
          email,
          tipe,
        },
      });
      if (!userData) throw createError(400, 'Wrong Username/Password');
      const passwordVerification = comparePassword(password, userData.password);
      if (!passwordVerification) throw createError(400, 'Wrong Username/Password');
      const access_token = generateToken({ id: userData.id });
      res.status(200).json({
        userData,
        access_token,
      });
    } catch (err) {
      next(err);
    }
  };
  static register = async (req, res, next) => {
    try {
      let {
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
        tipe,
        nama_vendor,
        alamat_vendor,
        vendor_id,
      } = req.body;
      if (!nama_lengkap || !email || !password || !tipe)
        throw createError(400, 'Input all required field');
      if (tipe === 'Admin') {
        if (vendor_id) {
          const vendorData = await vendor.findOne({ where: { id: vendor_id } });
          if (!vendorData) throw createError(404, 'Vendor Not Found');
        } else {
          if (!nama_vendor || !alamat_vendor) throw createError(400, 'Input all required field');
          const vendorData = await vendor.create({ nama: nama_vendor, alamat: alamat_vendor });
          vendor_id = vendorData.id;
        }
      }
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
        foto_profil: serverUrl + req.file.path,
        tipe,
        vendor_id,
      });
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  };
  static getUserProfile = async (req, res, next) => {
    try {
      const { id } = req.UserData;
      const userData = await user.findOne({
        where: { id }
      });
      const jobOrderCount = await job_order.count({ where: { teknisi_id: id } });
      const jobOrderDone = await job_order.count({ where: { teknisi_id: id, status: "Done" } });
      res.status(200).json({
        userData,
        jobOrderCount,
        jobOrderDone
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
