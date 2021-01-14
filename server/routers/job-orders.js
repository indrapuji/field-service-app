const router = require("express").Router();
const JobOrderController = require("../controllers/JobOrderController");

router.post("/", JobOrderController.createJobOrder);
router.put("/assign", JobOrderController.assignJobOrder);

module.exports = router;
