const router = require('express').Router();
const VendorController = require('../controllers/VendorController');
const { superAuth } = require('../middlewares/authorization');
const authentication = require('../middlewares/authentication');

router.get('/', authentication, VendorController.getAll);
router.post('/create', authentication, superAuth, VendorController.createVendor);
router.put('/edit/:id', authentication, superAuth, VendorController.editVendor);

module.exports = router;
