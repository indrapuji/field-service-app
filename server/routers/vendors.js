const router = require('express').Router();
const VendorController = require('../controllers/VendorController');
const { superAuth } = require('../middlewares/authorization');
const authentication = require('../middlewares/authentication');

router.get('/', VendorController.getAll);
router.post('/create', authentication, superAuth, VendorController.createVendor);

module.exports = router;
