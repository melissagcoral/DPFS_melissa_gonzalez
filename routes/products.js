const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const upload = require('../middlewares/multer');

router.get('/', productsController.index);
router.get('/new', productsController.create);
router.get('/search', productsController.search);
router.get('/results', productsController.search);
router.get('/:id/edit', productsController.edit);
router.get('/:id', productsController.detail);

router.post('/', upload.single('image_url'), productsController.store);

router.put('/:id', upload.single('image_url'), productsController.save);

router.delete('/:id', productsController.delete);

module.exports = router;