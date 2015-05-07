$(function () {
  var socket = io();
  socket.on('next-image', refresh);

  var $window = $(window);
  var sized = false;
  $window.resize(_.debounce(function () { sized = false; }, 250));

  var player = Snap.select('.player');
  function refresh(image) {
    if (!sized) {
      sized = setSize(image);
    }
    player.attr({'xlink:href': image.data.toString()});
    outlineObjects(image.faces);
  }

  var svg = Snap('.overlay');
  var $overlay = $('.overlay');
  function outlineObjects(rects) {
    $overlay.find('.rect').remove();
    for (var i = 0; i < rects.length; i++) {
      var r = rects[i];
      svg.rect(r.x, r.y, r.w, r.h).attr({
        "class": "rect face"
      });
    }
  }

  function setSize(image) {
    var imgRatio = image.width / image.height;
    var viewRatio = $(window).width() / $(window).height();
    if (imgRatio < viewRatio) {
      var scaledWidth = $window.height() * imgRatio;
      $overlay.css({
        width: scaledWidth,
        height: $window.height(),
        left: ($window.width() - scaledWidth) / 2,
        top: 0
      });
    }
    else {
      var scaledHeight = $window.width() / imgRatio;
      $overlay.css({
        width: $window.width(),
        height: scaledHeight,
        left: 0,
        top: ($window.height() - scaledHeight) / 2,
      });
    }
  }
});
