var socketio = require('socket.io');
var webcam = require('../models/webcam');
var detector = require('../models/detector');

var refreshInterval;
var running = false;
var framesSent = 0;

module.exports.listen = function (server) {
  var io = socketio(server);
  io.on('connection', function (socket) {
  	console.log('CONNECTED :: ' + io.engine.clientsCount + ' users connected');
    function displayLoop(data) {
      framesSent++;
      webcam.getImage(function(data) {
        var base64Image = 'data:image/jpg;base64,' + data.buffer.toString('base64');
        detector.detectFaces(data.buffer, function(err, faces) {
          socket.emit('next-image', {
            width: data.width,
            height: data.height,
            data: base64Image,
            faces: faces
          });
          if (running) { displayLoop(); }
        });
      });
    }

    if (!running) {
      displayLoop();
      running = true;
    }

  	socket.on('disconnect', function() {
    	console.log('DISCONNECTED :: ' + io.engine.clientsCount + ' users connected');
  		if (io.engine.clientsCount === 0) {
        running = false;
  		}
  	});
  });
};

setInterval(function () {
  console.log((framesSent/10.0) + ' frames/sec');
  framesSent = 0;
}, 10000);
