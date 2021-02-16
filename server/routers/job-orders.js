const router = require('express').Router();
const JobOrderController = require('../controllers/JobOrderController');
const authentication = require('../middlewares/authentication');
const { adminVendorAuth, teknisiAuth } = require('../middlewares/authorization');
const storage = require('../helpers/multer');
const multer = require('multer');

const upload = multer({ storage });

router.post('/',
  authentication,
  upload.fields([{ name: 'foto_toko_1' }, { name: 'foto_toko_2' }]),
  JobOrderController.createJobOrder);
router.put('/assign', authentication, adminVendorAuth, JobOrderController.assignJobOrder);
router.put('/change-status/:id', authentication, teknisiAuth, JobOrderController.changeStatus);
router.get('/all', authentication, JobOrderController.getAllJobOrder);
router.get('/single/:id', authentication, teknisiAuth, JobOrderController.getSingleOrder);
router.put(
  '/done',
  authentication,
  teknisiAuth,
  upload.fields([{ name: 'foto_toko_1' }, { name: 'foto_toko_2' }, { name: 'foto_edc_1' }, { name: 'foto_edc_2' }]),
  JobOrderController.jobOrderDone
);
router.get('/dashboard', authentication, JobOrderController.dashboard);
router.post('/assign-many/:id', authentication, JobOrderController.assignJobOrderMany);
router.post("/check-seed",
	upload.single("data"),
	JobOrderController.checkSeedingJobOrder);
router.post("/create-seed", JobOrderController.seedingJobOrder);

module.exports = router;
