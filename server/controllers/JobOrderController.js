const { job_order, job_order_kelengkapan, vendor, user, job_order_edc_bank } = require('../models');
const createError = require('http-errors');
const serverUrl = require('../helpers/serverUrl');

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
        jenis_mesin_edc,
        lokasi_mesin_edc,
        posisi_mesin_edc,
        keluhan,
        status_edc,
        kondisi_edc,
        status_kunjungan,
        kondisi_merchant,
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
        jenis_mesin_edc,
        lokasi_mesin_edc,
        posisi_mesin_edc,
        keluhan,
        status_edc,
        kondisi_edc,
        status_kunjungan,
        kondisi_merchant,
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
      if (jobOrderData.vendor_id !== userData.vendor_id) throw createError(401, 'You are unauthorized');
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
      let { tipe, page, status } = req.query;
      if (!page || page < 1) page = 1;
      const resPerPage = 15;
      const offset = resPerPage * page - resPerPage;
      let query = {
        where: {},
        include: [
          {
            model: job_order_kelengkapan,
            required: false,
          },
          {
            model: job_order_edc_bank,
            required: false,
          },
        ],
      };
      if (tipe) query.where.tipe = tipe;
      if (status) query.where.status = status;
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
  static getAllJobOrderTest = async (req, res, next) => {
    try {
      let { tipe, page, status } = req.query;
      if (!page || page < 1) page = 1;
      const resPerPage = 200;
      const offset = resPerPage * page - resPerPage;
      let query = {
        where: {},
        include: [
          {
            model: job_order_kelengkapan,
            required: false,
          },
          {
            model: job_order_edc_bank,
            required: false,
          },
        ],
      };
      if (tipe) query.where.tipe = tipe;
      if (status) query.where.status = status;
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
        include: [
          {
            model: job_order_kelengkapan,
            required: false,
          },
          {
            model: job_order_edc_bank,
            required: false,
          },
        ],
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
        kontak_person,
        no_telp,
        serial_number_2,
        sim_card,
        kondisi_merchant,
        alamat_merchant_2,
        manual_book,
        sales_draft,
        sticker,
        kertas_termal,
        edukasi_merchant,
        adaptor,
        dongle_prepaid,
        kabel_power,
        kabel_telpon,
        materi_promosi,
        keterangan,
        job_order_id,
        jenis_mesin_edc,
        lokasi_mesin_edc,
        posisi_mesin_edc,
        keluhan,
        status_kertas_termal,
        edc_bank,
        status_edc,
        kondisi_edc,
        status_kunjungan,
        latitude,
        longitude,
        tanda_tangan,
      } = req.body;
      const { id } = req.UserData;
      if (!job_order_id) throw createError(400, 'Need Job Order Id');
      const jobOrderData = await job_order.findOne({
        where: { id: job_order_id },
        include: [
          {
            model: job_order_kelengkapan,
            required: false,
          },
        ],
      });
      if (!jobOrderData) throw createError(404, 'Job Order Not Found');
      if (jobOrderData.teknisi_id !== id) throw createError(401, 'You are not authorized');
      const jobOrderQuery = {
        kontak_person,
        no_telp,
        serial_number_2,
        alamat_merchant_2,
        manual_book,
        sales_draft,
        sticker,
        edukasi_merchant,
        keterangan,
        tanggal_selesai: new Date(),
        status: 'Done',
        jenis_mesin_edc,
        lokasi_mesin_edc,
        posisi_mesin_edc,
        status_edc,
        kondisi_edc,
        keluhan,
        status_kunjungan,
        kondisi_merchant,
        latitude,
        longitude,
      };
      if (req.files) {
        if (req.files.foto_1) jobOrderQuery.foto_1 = serverUrl + req.files.foto_1[0].path;
        if (req.files.foto_2) jobOrderQuery.foto_2 = serverUrl + req.files.foto_2[0].path;
        if (req.files.foto_3) jobOrderQuery.foto_3 = serverUrl + req.files.foto_3[0].path;
        if (req.files.foto_4) jobOrderQuery.foto_4 = serverUrl + req.files.foto_4[0].path;
        if (req.files.foto_5) jobOrderQuery.foto_5 = serverUrl + req.files.foto_5[0].path;
      }
      if (tanda_tangan) {
        var base64Data = tanda_tangan.replace(/^data:image\/png;base64,/, '');
        const path = `uploads/${Date.now()}.jpg`;
        require('fs').writeFileSync(path, base64Data, 'base64');
        jobOrderQuery.tanda_tangan = serverUrl + path;
      }
      await job_order.update(jobOrderQuery, { where: { id: job_order_id } });
      if (jobOrderData.job_order_kelengkapan) {
        await job_order_kelengkapan.update(
          {
            adaptor,
            dongle_prepaid,
            kabel_power,
            kabel_telpon,
            materi_promosi,
            kertas_termal,
            sim_card,
            status_kertas_termal,
          },
          { where: { job_order_id } }
        );
      } else {
        await job_order_kelengkapan.create({
          adaptor,
          dongle_prepaid,
          kabel_power,
          kabel_telpon,
          materi_promosi,
          kertas_termal,
          sim_card,
          status_kertas_termal,
          job_order_id,
        });
      }
      if (edc_bank) {
        const edcBankData = JSON.parse(edc_bank);
        await Promise.all(
          edcBankData.map(async (data) => {
            const validation = await job_order_edc_bank.findOne({ where: { nama_bank: data } });
            if (validation) return;
            await job_order_edc_bank.create({ nama_bank: data, job_order_id });
          })
        );
      }
      res.status(200).json({ msg: 'Success' });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = JobOrderController;
