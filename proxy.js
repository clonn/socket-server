/**
 *  * Module dependencies.
 *   */

var bouncy = require('bouncy')
  , params = require('./config/params');

/**
 *  * Proxy server. 
 *   */

var proxies = params.backend;

bouncy(function(req, bounce) {
  var proxy = proxies[Math.floor(Math.random() * proxies.length)];
  bounce(proxy[0], proxy[1]);
  console.log('\t - proxy: %s:%s', proxy[0], proxy[1]);
}).listen(8000);

process.on('uncaughtException', function(e) {
  console.log(e);
});

console.log('Proxy server listening on port %s', 8000);
