const router = require("express").Router();
const UserController = require("../controllers/UserController");
const multer = require("multer");
const storage = require("../helpers/multer");

const upload = multer({ storage })

router.post("/login", UserController.login);
router.post("/register", upload.single("foto_profil"), UserController.register);

module.exports = router;
