// A sample application server
var express = require('express');
var app = express();
var ecomod = require('../../index.js');

app.get('/', function (req, res) {
  res.status(200).send('Hello World!');
});

var eco = ecomod({
    interval: 1000, // Time interval after the last request
    pm2: { // Set your pm2 info
        proc_name: 'server-beta',
        proc_id: 1
    },
    onBeforeExit: function() { // Callback triggered when the server needs to stop
        console.log('Stopping server');
    }
});

app.use(eco);

var server = app.listen(4000, function () {
var host = server.address().address;
var port = server.address().port;
    console.log('Sample test ecomod server listening at http://%s:%s', host, port);
});

module.exports = server;
