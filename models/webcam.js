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
			var base64Image = 'data:image/jpg;base64,' + buffer.toString('base64');
			callback({
				'width': 640,
				'height': 480,
				'data': base64Image
			});
		});
	});
}

module.exports = {
  getImage: getImage
};
