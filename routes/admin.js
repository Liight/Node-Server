const path = require('path');

const express = require('express'); // import expressJS

const router = express.Router(); // set express.Router

const rootDir = require('../util/path'); // helper function to get path of app.js (root)

products = [];

// admin/add-product => GET
router.get('/add-product', (req, res, next) => { // use Router
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
    res.render('add-product', {
        pageTitle: 'Add Product', 
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
}); 

// admin/product => POST
router.post('/add-product', (req, res, next) => { // use Router
    products.push({title: req.body.title});
    // console.log('[admin]', req.body);
    res.redirect('/');
});

exports.routes = router;
exports.products = products;
