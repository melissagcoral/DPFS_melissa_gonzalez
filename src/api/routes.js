const express = require('express');
const router = express.Router();
const usersRoutes = require('./users/route');
const productsRoutes = require('./products/route');

router.use('/users', usersRoutes);
router.use('/products', productsRoutes);

module.exports = router;