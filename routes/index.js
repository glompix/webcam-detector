var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index');
});

var webcam = require('../models/webcam');
router.get('/image', function(req, res) {
  webcam.getImage(function(data) {
    res.send(data);
  })
});

module.exports = router;
