const router = require("express").Router();
const users = require("./users");
const vendors = require("./vendors");
const joborders = require("./job-orders");

router.use("/users", users);
router.use("/vendors", vendors);
router.use("/job-orders", joborders);

module.exports = router;
