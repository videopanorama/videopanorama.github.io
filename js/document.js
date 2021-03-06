/*jshint multistr: true */



var xtilesWindow = parseInt(urlParams.xtiles || 4);
var ytilesWindow = parseInt(urlParams.ytiles || 3);

var xtilesView;
var ytilesView;

var tileSize;

var defaultTileSize;

var videos;




$(document).ready(function() {
    defaultTileSize = Math.round($(window).width() / (xtilesWindow-1));
   // defaultTileSize = 600;
    tileSize = defaultTileSize;
    xtilesView = $(window).width()/tileSize;
    ytilesView = $(window).height()/tileSize;
    tiles();
    $("#videoContainer").css("height", tileSize * ytilesView).css("width", tileSize * xtilesView);
    $("#videos td").css("width", tileSize).css("height", tileSize);
    $(".video-js").on('contextmenu', function(e) {
    e.preventDefault();

});
    $(document).trigger("startMaster");
});

function tiles() {
    var content = "";
    for (var ytile = 0; ytile < ytilesWindow; ytile++) {
        content += "<tr>";
        for (var xtile = 0; xtile < xtilesWindow; xtile++) {
            id = ytile + "_" + xtile;
            content += '<td> <video id="' + id + '" class="video-js"></video></td>';
        }
        content += "</tr>";
    }
    $("#videos").append(content);

    //$("#videoContainer").css("left", -tileSize/2).css("top", -tileSize/2);

}



window.onload = function start() {
  // videoInfo();
};

function videoInfo() {
    var content;
    for (var ytile = 0; ytile < ytilesWindow; ytile++) {
        content += "<tr>";
        for (var xtile = 0; xtile < xtilesWindow; xtile++) {
            id = ytile + "_" + xtile;
            content += '<td id="' + id + "_info" + '"></td>';
        }
        content += "</tr>";
    }

    $("#videoInfo").append(content);
    window.setInterval(function() {
        //$(document).trigger('sjs:play');
        for (var ytile = 0; ytile < ytilesWindow; ytile++) {
            for (var xtile = 0; xtile < xtilesWindow; xtile++) {
                var id = ytile + "_" + xtile;
                var v = videojs(id);
                var bufferedPercent = Math.round(v.bufferedPercent() * 100) + "%";
                var currentTime = Math.round(v.currentTime() * 100) / 100 + "s";
                var playbackRate = Math.round(v.playbackRate() * 100) / 100 ;
                $("#" + id + "_info").text((ytile + yposTile) + "_" + (xtile + xposTile) + ": " + bufferedPercent + ", " + currentTime + "," + playbackRate);
                //times.push(v.currentTime());
            }
        }





    }, 500); 
}

$(window).on('beforeunload', function() { $(".video-js").hide(); });