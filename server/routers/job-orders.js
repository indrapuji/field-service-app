const router = require("express").Router();
const JobOrderController = require("../controllers/JobOrderController");
const authentication = require("../middlewares/authentication");
const { leaderAuth, teknisiAuth } = require("../middlewares/authorization");
const storage = require("../helpers/multer");
const multer = require("multer");

const upload = multer({ storage })

router.post("/", JobOrderController.createJobOrder);
router.put("/assign", authentication, leaderAuth, JobOrderController.assignJobOrder);
router.put("/change-status/:id", authentication, teknisiAuth, JobOrderController.changeStatus);
router.get("/all", authentication, teknisiAuth, JobOrderController.getAllJobOrder);
router.put("/done",
  authentication,
  teknisiAuth,
  upload.fields([
    { name: 'foto_1' },
    { name: 'foto_2' },
    { name: 'foto_3' },
    { name: 'foto_4' },
    { name: 'foto_5' },
    { name: 'tanda_tangan' },
  ]),
  JobOrderController.jobOrderDone);

module.exports = router;
