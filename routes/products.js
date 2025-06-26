var express = require('express');
const productsController = require('../controllers/productsController');
var router = express.Router();

router.get('/', productsController.index);
router.get('/new', productsController.create);
//router.get('/search', productsController.search);
router.get('/results', productsController.search);
router.get('/:id/edit', productsController.edit);
router.get('/:id', productsController.detail);

router.post('/', productsController.store);

router.put('/:id', productsController.save);

router.delete('/:id', productsController.delete);

module.exports = router;