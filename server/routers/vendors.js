const router = require("express").Router();
const VendorController = require("../controllers/VendorController");

router.get("/", VendorController.getAll);
router.post("/create", VendorController.createVendor);

module.exports = router;
