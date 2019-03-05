const path = require('path');

const express = require('express'); // import expressJS

const router = express.Router(); // set express.Router

const rootDir = require('../util/path');

// admin/add-product
router.get('/add-product', (req, res, next) => { // use Router
    console.log("In the middleware!");
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
}); 

// admin/product
router.post('/product', (req, res, next) => { // use Router
    console.log(req.body);
    res.redirect('/');
});

module.exports = router; // export 