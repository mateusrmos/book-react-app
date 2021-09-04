const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    let proxyUrl = process.env.REACT_APP_BASEURL;
    app.use(
        '/api',
        createProxyMiddleware({
            target: proxyUrl,
            changeOrigin: true,
        })
    );
}