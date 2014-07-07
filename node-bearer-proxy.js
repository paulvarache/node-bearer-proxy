var http = require('http');
var httpProxy = require('http-proxy');

var server = null;
var proxy = httpProxy.createProxyServer();

module.exports = {
    createProxy : function (options, match, logic) {
        server = http.createServer(function (req, res) {
            //Check the url path
            if (match.test(req.url)) {
                var auth = req.headers.authorization;
                //Check existing authorization header
                if (typeof auth === "undefined") {
                    console.log("No Token");
                    res.writeHead(403);
                    res.end("Unauthorized");
                    return;
                } else {
                    //Remove the "Bearer" at start
                    auth = auth.substring(7, auth.length);
                    //Execute the user check token logic
                    logic(auth, function (result) {
                        //Block or authorize access according to users result
                        if (result === false) {
                            res.writeHead(403);
                            console.log("Wrong Token");
                            res.end("Unauthorized");
                            return;
                        } else {
                            //forward
                            console.log("OK");
                            proxy.web(req, res, options);
                            return;
                        }
                    });
                }
            } else {
                console.log()
                proxy.web(req, res, options);
                return;
            }

        });
        return {
            listen: function (port) {
                server.listen(port);
            }
        }
    }

}
