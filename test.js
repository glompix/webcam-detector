var http = require('http');

var url = 'http://watcher:t1NdTAkJq6Mq@192.168.1.169/image.jpg';
http.get(url, function (response) {
  // Continuously update stream with data
  var body = '';
  response.on('data', function(d) {
      body += d;
  });
  response.on('end', function() {
    var base64Image = 'data:image/jpg;base64,'
      + new Buffer(body, 'binary').toString('base64');
    console.log(body);
  });
});
