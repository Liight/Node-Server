const path = require('path');

const express = require('express'); // imports expressJS
const bodyParser = require('body-parser'); // import body-parser

const errorController = require('./controllers/error');
const sequelize = require('./util/database'); 

const app = express(); // express app (implements express framework)

// EJS TEMPLATE ENGINE (NPM package)
app.set('view engine', 'ejs'); // Let express know we want to compile templates with this engine
app.set('views', 'views'); // let express know where to find the views to be used for the template engine

const adminRoutes = require('./routes/admin'); // import custom route rendering code
const shopRoutes = require('./routes/shop'); // import custom route rendering code

app.use(bodyParser.urlencoded({extended: false})); // allows us to use req.body
app.use(express.static(path.join(__dirname, 'public'))); // serve static files like css for public read access

app.use('/admin', adminRoutes); // run imported code if executed with filter
app.use(shopRoutes); // open shop as the default behaviour

app.use(errorController.get404);

sequelize
    .sync() // Has a look at the model definitions and creates tables for them.
    .then(result => {
        // console.log(result);
        app.listen(3000); // listen for events on port localhost port 3000
    })
    .catch(err => {
        console.log(err);
    }); 

