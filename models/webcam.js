var http = require('http');
var config = require('../config.json');

function getImage(callback) {
	http.get(config.webcamUrl, function(response) {
    response.setEncoding('binary');
		// Continuously update stream with data
		var buffer = new Buffer(65536);
    var pos = 0;
		response.on('data', function(d) {
			pos += buffer.write(d, pos, 'binary');
		});
		response.on('end', function() {
			callback({
				width: 640,
				height: 480,
				buffer: buffer
			});
		});
	});
}

module.exports = {
  getImage: getImage
};
