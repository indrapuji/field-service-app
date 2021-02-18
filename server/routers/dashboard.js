const router = require("express").Router();
const DashboardController = require("../controllers/DashboardController");
const authentication = require("../middlewares/authentication");

router.get("/home", authentication, DashboardController.home);

module.exports = router;
