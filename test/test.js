var bearerProxy = require('../node-bearer-proxy');

proxy = bearerProxy.createProxy({
    target: "http://localhost:3000"
}, /^\/protected\/.+/, function (token, callback) {
    if (token === "token") {
        callback(true);
    } else {
        callback(false);
    }
});

proxy.listen(8080);
