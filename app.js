
/**
 * Module dependencies.
 */

var express = require('express')
  , RedisStore = require('connect-redis')(express)
  , cluster = require('cluster')
  , routes = require('./routes');


var app = module.exports = express.createServer()
  , io = require('./socket')(app);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
        app.set('basepath', '/');
  app.use(express.bodyParser());
        app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
        app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
        app.use(express.logger('dev'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(process.env.PORT || 80);
