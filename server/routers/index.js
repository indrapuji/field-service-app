const router = require("express").Router();
const users = require("./users");
const vendors = require("./vendors");
const joborders = require("./job-orders");
const dashboard = require("./dashboard");

router.use("/users", users);
router.use("/vendors", vendors);
router.use("/job-orders", joborders);
router.use("/dashboard", dashboard);

module.exports = router;
