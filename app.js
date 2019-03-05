const http = require('http'); // allows us to create a browser

const express = require('express'); // imports expressJS

const app = express(); // express app (implements express framework)

app.use((req, res, next) => {
    console.log("In the middleware!");
    next(); // next is a function that is passed to the use method for the next function to execute with app.use(), chaining middleware
}); 

app.use((req, res, next) => {
    console.log("In another middleware!");
    // ... no next here because middleware ends
    res.send('<h1>Hello from express</h1>'); // allows us to send a response, sets a html content-type automatically
}); 

const server = http.createServer(app); // callback function to be called on each server request

server.listen(3000); // starts a process where nodeJS will keep this running for incoming requests