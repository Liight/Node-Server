const path = require('path');

const express = require('express'); // imports expressJS
const bodyParser = require('body-parser'); // import body-parser

const app = express(); // express app (implements express framework)

const adminRoutes = require('./routes/admin'); // import custom code
const shopRoutes = require('./routes/shop'); // import custom code

app.use(bodyParser.urlencoded({extended: false})); // allows us to use req.body
app.use(express.static(path.join(__dirname, 'public'))); // serve static files like css for public read access

app.use('/admin', adminRoutes); // run imported code if executed with filter
app.use(shopRoutes); // run imported code if executed

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000); // listen for events on port localhost port 3000