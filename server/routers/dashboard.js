const router = require("express").Router();
const DashboardController = require("../controllers/DashboardController");

router.get("/home", DashboardController.home);

module.exports = router;
