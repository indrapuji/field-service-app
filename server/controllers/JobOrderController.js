const { job_order, vendor, user } = require('../models');
const createError = require('http-errors');

class JobOrderController {
  static createJobOrder = async (req, res, next) => {
    try {
      const {
        nama_merchant,
        alamat_merchant,
        tipe_merchant,
        kontak_person,
        no_telp,
        nama_bank,
        tipe_terminal,
        serial_number,
        tipe,
        status,
        tanda_tangan,
        tanggal_assign,
        tanggal_selesai,
        keterangan,
        mid,
        vendor_id,
      } = req.body;
      const vendorData = await vendor.findOne({ where: { id: vendor_id } });
      if (!vendorData) throw createError(404, 'Vendor Not Found');
      const result = await job_order.create({
        nama_merchant,
        alamat_merchant,
        tipe_merchant,
        kontak_person,
        no_telp,
        nama_bank,
        tipe_terminal,
        serial_number,
        tipe,
        status,
        tanda_tangan,
        tanggal_assign,
        tanggal_selesai,
        keterangan,
        mid,
        vendor_id,
      });
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  };
  static assignJobOrder = async (req, res, next) => {
    try {
      const { id } = req.UserData;
      const userData = await user.findOne({ where: { id } });
      const { teknisi_id, job_order_id } = req.body;
      if (!teknisi_id || !job_order_id) throw createError(400, 'Input all fields');
      const teknisiData = await user.findOne({ where: { id: teknisi_id } });
      if (!teknisiData) throw createError(404, 'User Not Found');
      const jobOrderData = await job_order.findOne({ where: { id: job_order_id } });
      if (!jobOrderData) throw createError(404, 'User Not Found');
      if (jobOrderData.vendor_id !== userData.vendor_id)
        throw createError(401, 'You are unauthorized');
      await job_order.update({ teknisi_id }, { where: { id: job_order_id } });
      res.status(200).json({ msg: 'Success' });
    } catch (err) {
      next(err);
    }
  };
  static changeStatus = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const user_id = req.UserData.id;
      const userData = await user.findOne({ where: { id: user_id } });
      const jobOrderData = await job_order.findOne({ where: { id } });
      if (jobOrderData.teknisi_id !== userData.id) throw createError(401, 'You are unauthorized');
      await job_order.update(
        {
          status,
        },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).json({ msg: 'Success' });
    } catch (err) {
      next(err);
    }
  };
  static getAllJobOrder = async (req, res, next) => {
    try {
      let { tipe, page } = req.query;
      if (!page || page < 1) page = 1;
      const resPerPage = 15;
      const offset = resPerPage * page - resPerPage;
      let query = {};
      if (tipe) query.where = { tipe };
      const numOfResult = await job_order.count(query);
      query.limit = resPerPage;
      query.offset = offset;
      const jobOrderData = await job_order.findAll(query);
      res.status(200).json({
        data: jobOrderData,
        pages: Math.ceil(numOfResult / resPerPage),
        currentPage: Number(page),
        numOfResult,
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = JobOrderController;
