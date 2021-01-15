const { user } = require("../models");
const createError = require("http-errors");

module.exports = {
  leaderAuth: async (req, res, next) => {
    try {
      const { id } = req.UserData;
      const user_data = await user.findOne({ where: { id } });
      if (user_data.tipe !== "Leader" && user_data.tipe !== "Super Admin") throw createError(401, "You are unauthorized");
      next();
    } catch (err) {
      next(err);
    }
  },
  teknisiAuth: async (req, res, next) => {
    try {
      const { id } = req.UserData;
      const user_data = await user.findOne({ where: { id } });
      if (user_data.tipe !== "Teknisi" && user_data.tipe !== "Super Admin") throw createError(401, "You are unauthorized");
      next();
    } catch (err) {
      next(err);
    }
  },
  adminAuth: async (req, res, next) => {
    try {
      const { id } = req.UserData;
      const user_data = await user.findOne({ where: { id } });
      if (user_data.tipe !== "Admin" && user_data.tipe !== "Super Admin") throw createError(401, "You are unauthorized");
      next();
    } catch (err) {
      next(err);
    }
  },
  adminBankAuth: async (req, res, next) => {
    try {
      const { id } = req.UserData;
      const user_data = await user.findOne({ where: { id } });
      if (user_data.tipe !== "Admin Bank" && user_data.tipe !== "Super Admin") throw createError(401, "You are unauthorized");
      next();
    } catch (err) {
      next(err);
    }
  },
}