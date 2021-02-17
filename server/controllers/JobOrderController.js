const { job_order, vendor, user, user_privilege } = require('../models');
const createError = require('http-errors');
const serverUrl = require('../helpers/serverUrl');
const setDate = require('../helpers/setDate');
const { Op } = require("sequelize");
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');

class JobOrderController {
  static createJobOrder = async (req, res, next) => {
    try {
      let {
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
        teknisi_id,
        tanda_tangan,
        type,
      } = req.body;
      const { id } = req.UserData;
      if (!teknisi_id) teknisi_id = id;
      const userData = await user.findOne({ where: { id } });
      let query = {
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
        vendor_id: userData.vendor_id,
        status: "Unassign",
        admin_id: teknisi_id === id ? null : id,
        teknisi_id,
        type
      }
      if (req.files) {
        if (req.files.foto_toko_1) query.foto_toko_1 = serverUrl + req.files.foto_toko_1[0].path;
        if (req.files.foto_toko_2) query.foto_toko_2 = serverUrl + req.files.foto_toko_2[0].path;
      }
      if (tanda_tangan) {
        var base64Data = tanda_tangan.replace(/^data:image\/png;base64,/, '');
        const path = `uploads/${Date.now()}.jpg`;
        require('fs').writeFileSync(path, base64Data, 'base64');
        query.tanda_tangan = serverUrl + path;
      }
      const result = await job_order.create(query);
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
      await job_order.update({ teknisi_id, admin_id: id }, { where: { id: job_order_id } });
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
      const userData = await user.findOne({
        where: { id },
        include: [{
          model: user_privilege,
          required: false
        }]
      });
      const privileges = userData.user_privileges.map(data => data.name);
      let query = {
        where: {
          tipe: {
            [Op.or]: privileges
          }
        },
      };
      if (userData.tipe !== 'Super Admin') {
        query.where.vendor_id = userData.vendor_id;
      }
      if (userData.tipe === "Teknisi") {
        query.include = [{
          model: user,
          required: true,
          as: "Teknisi",
          where: { id }
        }]
      }
      query.order = [['createdAt', 'DESC']];
      if (vendor_id) query.where.vendor_id = vendor_id;
      if (tipe) {
        const validation = privileges.find(data => data === tipe);
        if (!validation && userData.tipe !== "Teknisi") throw createError(401, "Not authorized");
        query.where.tipe = tipe;
      }
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
        if (req.files.foto_toko_1) jobOrderQuery.foto_toko_1 = serverUrl + req.files.foto_toko_1[0].path;
        if (req.files.foto_toko_2) jobOrderQuery.foto_toko_2 = serverUrl + req.files.foto_toko_2[0].path;
        if (req.files.foto_edc_1) jobOrderQuery.foto_edc_1 = serverUrl + req.files.foto_edc_1[0].path;
        if (req.files.foto_edc_2) jobOrderQuery.foto_edc_2 = serverUrl + req.files.foto_edc_2[0].path;
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
  static assignJobOrderMany = async (req, res, next) => {
    try {
      let { arrData } = req.body;
      const teknisi_id = req.params.id;
      const admin_id = req.UserData.id;
      if (!arrData) throw createError(400, "Array data required");
      arrData = JSON.parse(arrData);
      await Promise.all(arrData.map(async data => {
        const jobOrderData = await job_order.findOne({ where: { id: data } });
        if (!jobOrderData) return;
        await job_order.update({
          teknisi_id,
          admin_id
        }, {
          where: {
            id: data
          }
        })
      }));
      res.status(200).json({ msg: "Success" });
    } catch (err) {
      next(err);
    }
  }
  static checkSeedingJobOrder = async (req, res, next) => {
    try {
      if (!req.file) throw createError(400, 'Data Excel Required');

      let seedingData = excelToJson({
        source: fs.readFileSync(req.file.path),
        sheets: ['Sheet1'],
        columnToKey: {
          '*': '{{columnHeader}}',
        },
      });

      seedingData = seedingData['Sheet1'].filter((data) => {
        if (data['MERCHANT'] && data['MID'] && data['TID']) {
          return data;
        }
      });
      seedingData.shift();

      let status_valid = true;

      const result = await Promise.all(
        seedingData.map(async (data) => {
          return {
            no: data['NO'],
            merchant: data['MERCHANT'],
            mid: data['EMPLOYEE ID'],
            tid: data['KODE PERUSAHAAN'],
            alamat: data['GENDER'],
            kota: data['AYAH'],
            no_telp: data['ALAMAT 1'],
            edc_connection: data['ALAMAT 2'],
            sn_edc: data['KOTA'],
            type_edc: data['KELURAHAN'],
            regional: data['KECAMATAN'],
            pic: data['PROVINSI'],
            tipe: data['KODE POS'],
            problem_merchant: data['TEMPAT LAHIR'],
            catatan: data['TANGGAL LAHIR'],
            status,
          };
        })
      );

      fs.unlinkSync(req.file.path);
      res.status(200).json({
        status_valid,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };
  static seedingJobOrder = async (req, res, next) => {
    try {
      const { data } = req.body;
      const bulkQuery = data.map((data) => {
        const {
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
          problem_merchant,
          catatan,
        } = data;
        return {
          tanggal_impor: new Date(),
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
          problem_merchant,
          catatan,
          status: "Unassign",
        };
      });
      await job_order.bulkCreate(bulkQuery);
      res.status(200).json({ msg: 'Success' });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = JobOrderController;
