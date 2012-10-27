/**
 *  * Module dependencies.
 *   */

var socket = require('socket.io')
  , redis = require('redis')
  , os = require('os')
  , params = require('./config/params')
  , Store = socket[params.io.store];

module.exports = function(app) {

  /**
 *    * Listening Socket.IO
 *       */

  var storeOpts = {};

  if (Store instanceof socket.RedisStore) {
    storeOpts = {
      redisPub: redis.createClient(params.io.redis.port, params.io.redis.host)
    , redisSub: redis.createClient(params.io.redis.port, params.io.redis.host)
    , redisClient: redis.createClient(params.io.redis.port, params.io.redis.host)
    }
  }

  /*
  var io = socket.listen(app, {
    store: new Store(storeOpts)
  });
  */
  var io = socket.listen(app);

  /**
 *    * Configure Socket.IO
 *       */

  /*
  io.configure(function() {
    io.set('transports', ['websocket']);
  });
  */

  io.configure(function() {
    io.set('close timeout', 5);
      /*
    io.set('close' :{
              'timeout' :2
            },
            'heartbeat' : {
              'timeout' :2
            }
    );
    */
  });
  /**
 *    * Routes.
 *       */

  var total = 0;

  var checkFn = function (number) {
    if (total !== number) {
      total = number;
      io.sockets.emit('user', number);
    }
  };

  io.sockets.on('connection', function(client) {

    var number = Object.keys(io.connected).length;

    io.sockets.emit('stat', number);


    client.on('disconnect', function (data) {
      number = Object.keys(io.connected).length;
      checkFn(number);
    });
  });

  return io;
};
