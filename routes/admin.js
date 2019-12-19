const express = require('express'); // import expressJS

const router = express.Router(); // set express.Router

const adminController = require('../controllers/admin');

// admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// admin/products => GET
router.get('/products', adminController.getProducts);

// admin/product => POST
router.post('/add-product', adminController.postAddProduct);

module.exports = router;