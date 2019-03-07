const express = require('express'); // import expressJS

const router = express.Router(); // set express.Router

const productsController = require('../controllers/products');

// admin/add-product => GET
router.get('/add-product', productsController.getAddProduct);

// admin/product => POST
router.post('/add-product', productsController.postAddProduct);

module.exports = router;