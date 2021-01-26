const { vendor, user } = require('../models');

class VendorController {
  static getAll = async (req, res, next) => {
    try {
      const { id } = req.UserData;
      const userData = await user.findOne({ where: { id } });
      let { page, pagination } = req.query;
      if (!page || page < 1) page = 1;
      const resPerPage = 15;
      const offset = resPerPage * page - resPerPage;
      let query = {};
      if (userData.tipe !== 'Super Admin') {
        query.include = [
          {
            model: user,
            required: true,
            where: { id },
          },
        ];
      }
      const numOfResult = await vendor.count(query);
      if (!pagination) {
        query.limit = resPerPage;
      } else {
        query.limit = numOfResult;
      }
      query.offset = offset;
      const result = await vendor.findAll(query);
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
  static createVendor = async (req, res, next) => {
    try {
      const { nama, alamat } = req.body;
      const result = await vendor.create({
        nama,
        alamat,
      });
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = VendorController;
