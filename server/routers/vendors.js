const router = require("express").Router();
const VendorController = require("../controllers/VendorController");

router.get("/", VendorController.getAll);

module.exports = router;
