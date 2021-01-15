const router = require("express").Router();
const JobOrderController = require("../controllers/JobOrderController");
const authentication = require("../middlewares/authentication");
const { leaderAuth, teknisiAuth } = require("../middlewares/authorization");

router.post("/", JobOrderController.createJobOrder);
router.put("/assign", authentication, leaderAuth, JobOrderController.assignJobOrder);
router.put("/change-status/:id", authentication, teknisiAuth, JobOrderController.changeStatus);
router.get("/all", authentication, teknisiAuth, JobOrderController.getAllJobOrder);

module.exports = router;
