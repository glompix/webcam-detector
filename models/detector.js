var cv = require('opencv');
var classifierXml = './node_modules/opencv/data/haarcascade_frontalface_alt2.xml';

module.exports.detectFaces = function(imageBuffer, callback) {
	cv.readImage(imageBuffer, function(err, im) {

		// Assuming 640x480 image, good tester for client.
		// callback(null, [{x: 5, y: 5, w: 630, h: 470}]); return;

		if (err) { callback(err); }
		im.detectObject(classifierXml, {}, function(err, faces) {
			if (err) { callback(err); }

      var rects = [];
			for (var i = 0; i < faces.length; i++) {
				var f = faces[i];
				rects.push({ x: f.x, y: f.y, w: f.width, h: f.height });
			}
			callback(null, rects);
		});
	});
};
