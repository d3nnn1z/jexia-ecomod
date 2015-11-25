/**
 * Ecomod
 *
 * Express middleware to automatically stop the server if it's not used
 * after a period of time
 *
 * @author Dionysis Pantazopoulos <d3nnn1z@gmail.com>
 * @copyright 2015 (c) Jexia www.jexia.com
 * @license MIT Licensed
 */
'use strict';

/**
* Module dependencies
*/
var pm2 = require('pm2');

/**
 * Initialization
 */
var timeouts = [],
    minInterval = 5000,
    app;

/**
* Automatically stop the server if not used
*
* @param {Object} options
* @return {Function} middleware
*/
function ecomod(options) {
    var opts = options || {};

    // Set interval
    if( !opts.interval ) {
        opts.interval = minInterval;
    }

    // Stop application server through PM2
    function stopPM2() {
        var app = opts.pm2.proc_name || opts.pm2.pid;

        pm2.connect(function(err) {
            if(err) throw new Error('Cannot connect to pm2');

            pm2.stop(app, function(error, res) {
                if(error) {
                    console.log(error.msg);
                }
            });
        });
    }

    // Stop application server
    function stop() {
        if( opts.onStop && typeof opts.onStop === 'function' ) {
            opts.onStop();
        }

        if(opts.pm2) {
            stopPM2();
            return;
        }

        if( app ) {
            //process.exit(0);
            app.close();
            return;
        }
    }

    // Start ecomod
    function start(id) {
        clearTimeout(timeouts[id]);
        timeouts[id] = setTimeout(stop, opts.interval);
        console.log('jexia-ecomod: is up with interval: ' + opts.interval);
    }

    // Automatically start ecomod
    start('ecomod');

    // Actual middelware
    return function ecomod(req, res, next) {
        app = req.app;
        if( opts.onStart && typeof opts.onStart === 'function' ) {
            opts.onStart(req, res, next);
        }
        start('ecomod');
        next();
    };
}

module.exports = ecomod;
