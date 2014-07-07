var http = require('http');

http.createServer(function (req, res) {
    console.log("REQUEST !");
    res.end("Success through proxy !");
}).listen(3000);
