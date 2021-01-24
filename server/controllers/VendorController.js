const {
  vendor
} = require("../models");

class VendorController {
  static getAll = async (req, res, next) => {
    try {
      let { page } = req.query;
      if (!page || page < 1) page = 1;
      const resPerPage = 15;
      const offset = (resPerPage * page) - resPerPage;
      const result = await vendor.findAll({
        limit: resPerPage,
        offset
      });
      const numOfResult = await vendor.count();
      res.status(200).json({
        data: result,
        pages: Math.ceil(numOfResult / resPerPage),
        currentPage: Number(page),
        numOfResult
      });
    } catch (err) {
      next(err);
    }
  }
  static createVendor = async (req, res, next) => {
    try {
      const { nama, alamat } = req.body;
      const result = await vendor.create({
        nama,
        alamat
      });
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
};

module.exports = VendorController;
