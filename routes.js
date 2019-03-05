const fs = require('fs'); // allows us to work with the file system

const requestHandler = (req, res) => {
    // console.log(req.url, req.method, req.headers);
    // process.exit();
    const url = req.url;
    const method = req.method;
    if (url === '/'){
        res.write('<html>'); // writing some data to the response object
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</head>');
        return res.end(); // no changes to the response object can be made after res.end(), return will quit the function
    }
    if (url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', (chunk)=>{
            console.log(chunk);
            body.push(chunk);
        }); // allows us to listen to certain events, data event will be fired whenever a data event is read
        return req.on('end', ()=>{
            const parsedBody = Buffer.concat(body).toString(); // concat the body and add all chunks to it
            console.log(parsedBody);
            const message = parsedBody.split('=')[1]; // get the value on the right hand side of the equals sign (message=string)
            fs.writeFile('message.txt', message, (err)=> {
                res.statusCode = 302; // http status code
                res.setHeader('Location', '/'); // Location is a default header accepted by the browser
                return res.end();
            }); // create a file and write value to it
        });
    };
    res.setHeader('Content-Type', 'text/html'); // attached a header to the response where we pass header info
    res.write('<html>'); // writing some data to the response object
    res.write('<head><title>First Page</title></head>');
    res.write('<body><h1>Hello from Node.js Server</h1></body>');
    res.write('</head>');
    res.end(); // no changes to the response object can be made after res.end();
};

// module.exports = requestHandler;

// module.exports = {
//     handler: requestHandler,
//     someText: 'Some hard coded text'
// }

// module.exports.handler = requestHandler;
// module.exports.someText = "Some hard coded text";

exports.handler = requestHandler;
exports.someText = "Some hard coded text";

