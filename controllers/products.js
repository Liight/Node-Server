const Product = require ('../models/product'); // import the model class Product

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {
    // products.push({ title: req.body.title });
    const product = new Product(req.body.title); // Use the class to construct a new product
    product.save(); // save the product to the model dataArray
    res.redirect('/'); // redirect to the shop
};

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll(); // gets all the products from the model dataArray
    res.render('shop', {
        pageTitle: 'Shop',
        prods: products,
        docTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    });
};