var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index');
});

var webcam = require('../models/webcam');
var detector = require('../models/detector');
router.get('/image', function(req, res) {
  webcam.getImage(function(data) {
    var base64Image = 'data:image/jpg;base64,' + data.buffer.toString('base64');
    detector.detectFaces(data.buffer, function(err, faces) {
      res.json({
        width: data.width,
        height: data.height,
        data: base64Image,
        faces: faces
      });
    });
  });
});

module.exports = router;
