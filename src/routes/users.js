const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

const redirectIfAutenticated = require("../middlewares/redirectIfAutenticated");
const authMiddleware = require("../middlewares/authMiddleware");
const userValidationsLogin = require("../middlewares/userValidationsLogin");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get("/login", redirectIfAutenticated, usersController.showLogin);
router.get("/register", redirectIfAutenticated, usersController.showRegister);
router.get("/profile", authMiddleware, usersController.profile);

router.post('/login', (req, res, next) => {
    console.log('📨 POST /login recibido');
    next();
}, usersController.login);

router.post('/register', (req, res, next) => {
    console.log('📨 POST /register recibido');
    console.log('📝 Body:', req.body);
    next();
}, /*userValidationsLogin,*/ usersController.register);

//router.post("/register", userValidationsLogin, usersController.register);

router.post("/logout", usersController.logout);


module.exports = router;
