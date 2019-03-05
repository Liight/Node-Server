const http = require('http'); // allows us to create a browser

const routes = require('./routes');

console.log(routes.someText);

// callback function to be called on each server request
const server = http.createServer(routes.handler);

// starts a process where nodeJS will keep this running for incoming requests
server.listen(3000);