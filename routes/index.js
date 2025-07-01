var express = require('express');
const indexController = require('../controllers/indexController');
var router = express.Router();

router.get('/', indexController.index);
router.get('/about', indexController.about);
router.get('/terms', indexController.terms);
router.get('/faq', indexController.faq);
router.get('/cart', indexController.cart);
router.get('/error', indexController.error);

module.exports = router;
