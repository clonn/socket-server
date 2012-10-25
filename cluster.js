/**
 *  * Module dependencies.
 *   */

var cluster = require('cluster')
  , app = require('./app');

/**
 *  * Set number of worker process.
 *   * Default is number of CPUs.
 *    */

var workers = process.env.WORKERS || require('os').cpus().length;

/**
 *  * Start cluster.
 *   */

if (cluster.isMaster) {

  /**
 *    * Fork process.
 *       */
  
  console.log('start cluster with %s workers', workers);
  
  for (var i = 0; i < workers; ++i) {
    var worker = cluster.fork();
    console.log('worker %s started.', worker.pid);
  }
  
  /**
 *    * Restart process.
 *       */
  
  cluster.on('death', function(worker) {
    console.log('worker %s died. restart...', worker.pid);
    cluster.fork();
  });
} else {
  
  /**
 *    * Start worker.
 *       */
  
  app.listen(process.env.PORT || 3000);
}
