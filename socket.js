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
  
  var io = socket.listen(app, {
        store: new Store(storeOpts)
      });
  
  /**
 *    * Configure Socket.IO
 *       */
  
  io.configure(function() {
    io.set('transports', ['websocket']);
  });

  /**
 *    * Routes.
 *       */
  
  io.sockets.on('connection', function(client) {
    io.sockets.emit('stat', Object.keys(io.connected).length);
  });
  
  return io;
};
