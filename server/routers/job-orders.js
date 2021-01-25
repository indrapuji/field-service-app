const router = require('express').Router();
const JobOrderController = require('../controllers/JobOrderController');
const authentication = require('../middlewares/authentication');
const { adminVendorAuth, teknisiAuth } = require('../middlewares/authorization');
const storage = require('../helpers/multer');
const multer = require('multer');

const upload = multer({ storage });

router.post('/', JobOrderController.createJobOrder);
router.put('/assign', authentication, adminVendorAuth, JobOrderController.assignJobOrder);
router.put('/change-status/:id', authentication, teknisiAuth, JobOrderController.changeStatus);
router.get('/all', authentication, teknisiAuth, JobOrderController.getAllJobOrder);
router.get('/all-test', authentication, teknisiAuth, JobOrderController.getAllJobOrderTest);
router.get('/single/:id', authentication, teknisiAuth, JobOrderController.getSingleOrder);
router.put(
  '/done',
  authentication,
  teknisiAuth,
  upload.fields([{ name: 'foto_1' }, { name: 'foto_2' }, { name: 'foto_3' }, { name: 'foto_4' }, { name: 'foto_5' }]),
  JobOrderController.jobOrderDone
);
router.get('/dashboard', authentication, JobOrderController.dashboard);

module.exports = router;
