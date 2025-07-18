const express = require('express');
const router = express.Router();
const controller = require("./controller");

router.get('/', controller.getAllProducts);
router.get('/:id', controller.getProductById);

module.exports = router;