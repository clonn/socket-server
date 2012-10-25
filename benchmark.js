var io = require('socket.io-client')
  , connected = 0
  , host = process.argv[2];

process.nextTick(function() {
  var socket = io.connect(host, { 'force new connection': true });
  socket.on('connect', function() {
    console.log('\t - connected: %s connections', ++connected);
  });
  process.nextTick(arguments.callee);
});

process.on('uncaughtException', function(e) {
  console.log(e);
});
