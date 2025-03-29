const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');
const { isAuthenticated } = require('../middleware/authenticate');
const { validateProduct } = require('../middleware/validate');


router.get('/',  productsController.getAll);
router.get('/:id',productsController.getSingle);
router.post('/', isAuthenticated, validateProduct, productsController.createProduct);
router.put('/:id', isAuthenticated, validateProduct, productsController.updateProduct);
router.delete('/:id', isAuthenticated, validateProduct, productsController.deleteProduct);

module.exports = router;
