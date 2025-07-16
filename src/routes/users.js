const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const multer = require('multer');
const path = require('path');

const redirectIfAutenticated = require("../middlewares/redirectIfAutenticated");
const authMiddleware = require("../middlewares/authMiddleware");
const userValidationsLogin = require("../middlewares/userValidationsLogin");
const userValidationsRegister = require("../middlewares/userValidationsRegister");

// CONFIGURAR MULTER EN EL ROUTER
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/images/users'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Solo se permiten imágenes (JPEG, JPG, PNG, GIF)'));
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // hasta 5MB
    },
});

router.get("/login", redirectIfAutenticated, usersController.showLogin);
router.get("/register", redirectIfAutenticated, usersController.showRegister);
router.get("/profile", authMiddleware, usersController.profile);
router.get("/edit", authMiddleware, usersController.edit);

router.post('/login', userValidationsLogin, usersController.login);
router.post("/logout", usersController.logout);

router.post("/register", upload.single('avatar'), userValidationsRegister, usersController.register);
router.put("/edit/:id", authMiddleware, upload.single('avatar'), usersController.save);



module.exports = router;
