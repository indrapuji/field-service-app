const router = require("express").Router();
const users = require("./users");
const vendors = require("./vendors");

router.use("/users", users);
router.use("/vendors", vendors);

module.exports = router;
