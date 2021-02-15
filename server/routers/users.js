const router = require('express').Router();
const UserController = require('../controllers/UserController');
const multer = require('multer');
const storage = require('../helpers/multer');
const authentication = require('../middlewares/authentication');

const upload = multer({ storage });

router.post('/login', UserController.login);
router.post('/register', authentication, upload.single('foto_profil'), UserController.register);
router.get('/profile', authentication, UserController.getUserProfile);
router.get('/all-users', authentication, UserController.getAllUser);
router.post('/add-firebase-token', authentication, UserController.addFirebaseToken);
router.put('/edit', authentication, UserController.editUser);

module.exports = router;
