const { job_order, vendor, user } = require('../models');
const createError = require('http-errors');
const serverUrl = require('../helpers/serverUrl');
const setDate = require('../helpers/setDate');

class JobOrderController {
  static createJobOrder = async (req, res, next) => {
    const { id } = req.UserData;
    try {
      const {
        tanggal_impor,
        merchant,
        mid,
        tid,
        alamat,
        kota,
        no_telp,
        edc_connection,
        sn_edc,
        type_edc,
        regional,
        pic,
        tipe,
        aktifitas,
        vendor_id,
        status,
        teknisi_id,
      } = req.body;
      const vendorData = await vendor.findOne({ where: { id: vendor_id } });
      if (!vendorData) throw createError(404, 'Vendor Not Found');
      const result = await job_order.create({
        tanggal_impor,
        merchant,
        mid,
        tid,
        alamat,
        kota,
        no_telp,
        edc_connection,
        sn_edc,
        type_edc,
        regional,
        pic,
        tipe,
        aktifitas,
        vendor_id,
        status,
        admin_id: id,
        teknisi_id,
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
      if (jobOrderData.vendor_id !== userData.vendor_id && userData.tipe !== 'Super Admin') throw createError(401, 'You are unauthorized');
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
      const { id } = req.UserData;
      let { tipe, page, status, by, vendor_id } = req.query;
      if (!page || page < 1) page = 1;
      const resPerPage = 15;
      const offset = resPerPage * page - resPerPage;
      let query = {
        where: {},
      };
      const userData = await user.findOne({ where: { id } });
      if (userData.tipe !== 'Super Admin') {
        query.where.vendor_id = userData.vendor_id;
      }
      query.order = [['createdAt', 'DESC']];
      if (vendor_id) query.where.vendor_id = vendor_id;
      if (tipe) query.where.tipe = tipe;
      if (status) query.where.status = status;
      if (by === 'today')
        query.where.updated_at = {
          [Op.gte]: setDate(new Date(), 1),
        };
      else if (by === 'week')
        query.where.updated_at = {
          [Op.gte]: setDate(new Date(), 7),
        };
      else if (by === 'month')
        query.where.updated_at = {
          [Op.gte]: setDate(new Date(), 30),
        };
      else if (by === 'year')
        query.where.updated_at = {
          [Op.gte]: setDate(new Date(), 365),
        };
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
  static getSingleOrder = async (req, res, next) => {
    try {
      const { id } = req.params;
      const user_id = req.UserData.id;
      const result = await job_order.findOne({
        where: {
          id,
        },
      });
      if (!result) throw createError(404, 'Data not found');
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
  static jobOrderDone = async (req, res, next) => {
    try {
      const {
        job_order_id,
        tanggal_impor,
        tanggal_tugas,
        merchant,
        mid,
        tid,
        tid_2,
        alamat,
        kota,
        no_telp,
        edc_connection,
        sn_edc,
        sn_edc_2,
        type_edc,
        regional,
        pic,
        nama_merchant,
        alamat_merchant,
        no_telp_merchant,
        pic_merchant,
        jam_mulai_kerja,
        jam_selesai_kerja,
        tipe,
        aktifitas,
        vendor_id,
        status,
        alasan_gagal,
        problem_merchant,
        lain_lain,
        edc_kompetitor,
        catatan,
        // foto_toko_1,
        // foto_toko_2,
        // foto_edc_1,
        // foto_edc_2,
        admin_id,
        teknisi_id,
        tanda_tangan,
        tanggal_close,
        di_close_oleh,
        adaptor,
        dongle_prepaid,
        kabel_telpon,
        kabel_power,
        sim_card,
        sam_card,
        kertas_termal,
        materi_promosi,
        status_kertas_termal,
        manual_book,
        sales_draft,
        sticker,
        edukasi_merchant,
        lokasi_edc,
        posisi_edc,
        status_edc,
        latitude,
        longitude,
        keluhan,
      } = req.body;
      const { id } = req.UserData;
      if (!job_order_id) throw createError(400, 'Need Job Order Id');
      const jobOrderData = await job_order.findOne({
        where: { id: job_order_id },
      });
      if (!jobOrderData) throw createError(404, 'Job Order Not Found');
      if (jobOrderData.teknisi_id !== id) throw createError(401, 'You are not authorized');
      const jobOrderQuery = {
        tanggal_impor,
        tanggal_tugas,
        merchant,
        mid,
        tid,
        tid_2,
        alamat,
        kota,
        no_telp,
        edc_connection,
        sn_edc,
        sn_edc_2,
        type_edc,
        regional,
        pic,
        nama_merchant,
        alamat_merchant,
        no_telp_merchant,
        pic_merchant,
        jam_mulai_kerja,
        jam_selesai_kerja,
        tipe,
        aktifitas,
        vendor_id,
        status,
        alasan_gagal,
        problem_merchant,
        lain_lain,
        edc_kompetitor,
        catatan,
        admin_id,
        teknisi_id,
        tanggal_close,
        di_close_oleh,
        adaptor,
        dongle_prepaid,
        kabel_telpon,
        kabel_power,
        sim_card,
        sam_card,
        kertas_termal,
        materi_promosi,
        status_kertas_termal,
        manual_book,
        sales_draft,
        sticker,
        edukasi_merchant,
        lokasi_edc,
        posisi_edc,
        status_edc,
        latitude,
        longitude,
        keluhan,
        status: 'Done',
      };
      if (req.files) {
        if (req.files.foto_1) jobOrderQuery.foto_toko_1 = serverUrl + req.files.foto_toko_1[0].path;
        if (req.files.foto_2) jobOrderQuery.foto_toko_2 = serverUrl + req.files.foto_toko_2[0].path;
        if (req.files.foto_3) jobOrderQuery.foto_edc_1 = serverUrl + req.files.foto_edc_1[0].path;
        if (req.files.foto_4) jobOrderQuery.foto_edc_2 = serverUrl + req.files.foto_edc_2[0].path;
      }
      if (tanda_tangan) {
        var base64Data = tanda_tangan.replace(/^data:image\/png;base64,/, '');
        const path = `uploads/${Date.now()}.jpg`;
        require('fs').writeFileSync(path, base64Data, 'base64');
        jobOrderQuery.tanda_tangan = serverUrl + path;
      }
      await job_order.update(jobOrderQuery, {
        where: { id: job_order_id },
      });
      res.status(200).json({ msg: 'Success' });
    } catch (err) {
      next(err);
    }
  };
  static dashboard = async (req, res, next) => {
    try {
      const kunjungan_count = await job_order.count({ where: { tipe: 'Kunjungan' } });
      const pick_up_count = await job_order.count({ where: { tipe: 'Pickup' } });
      res.status(200).json({
        chartPie: {
          kunjungan_count,
          pick_up_count,
        },
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = JobOrderController;
