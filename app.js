const path = require('path');

const express = require('express'); // imports expressJS
const bodyParser = require('body-parser'); // import body-parser

const errorController = require('./controllers/error');
const sequelize = require('./util/database'); 
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

const app = express(); // express app (implements express framework)

// EJS TEMPLATE ENGINE (NPM package)
app.set('view engine', 'ejs'); // Let express know we want to compile templates with this engine
app.set('views', 'views'); // let express know where to find the views to be used for the template engine

const adminRoutes = require('./routes/admin'); // import custom route rendering code
const shopRoutes = require('./routes/shop'); // import custom route rendering code

app.use(bodyParser.urlencoded({extended: false})); // allows us to use req.body
app.use(express.static(path.join(__dirname, 'public'))); // serve static files like css for public read access

app.use((req, res, next) => { // Register middleware for incoming requests
    User
        .findByPk(1)
        .then(user => {
            req.user = user; // Store user Sequelize object retrieved from database
            next();
        })
        .catch(err => {console.log(err)});
}); 

app.use('/admin', adminRoutes); // run imported code if executed with filter
app.use(shopRoutes); // open shop as the default behaviour

app.use(errorController.get404);

// Set associations
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'}); 
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem});
Product.belongsToMany(Cart, { through: CartItem });

// Sync database and launch app
sequelize
    .sync() // Has a look at the model definitions and creates tables for them, also defines relations
    .then(result => {
        return User.findByPk(1);
    })
    .then(user => {
        if(!user){
            return User.create({name: 'Todd', email: 'todd@todd.com'});
        }
        return user;
    })
    .then(user => {
        console.log(user);
        return user.createCart(); // creates an empty cart for the user
    })
    .then(cart => {
        app.listen(3000); // listen for events on port localhost port 3000
    })
    .catch(err => {
        console.log(err);
    }); 

