document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Navigators for Chrome, Edge, FireFox, and Safari
    navigator.getUserMedia = navigator.getUserMedia
        || navigator.webkitGetUserMedia
        || navigator.mozGetUserMedia
        || navigator.msGetUserMedia;

    var videoStream;
    var video = document.getElementById('vid');
    var canvasInput = document.getElementById('compare');
    var canvasOverlay = document.getElementById('overlay');
    var debugOverlay = document.getElementById('debug');
    var overlayContext = canvasOverlay.getContext('2d');

    navigator.getUserMedia({video: true}, function (stream) {
        videoStream = stream; // know we got the video
        video.src = window.URL.createObjectURL(stream);

        // if user does not give permission or the device doesn't have a camera
    }, function (err) {
        console.error(err);
    });

    // builds and starts new the face tracker
    var htracker = new headtrackr.Tracker();
    htracker.init(video, canvasInput);
    htracker.start();

    document.addEventListener("facetrackingEvent", function(event) {
        // clears canvas
        overlayContext.clearRect(0,0, 320, 240);
        // once stable tracking is offered, draw rectangle
        if (event.detection == "CS") {
            overlayContext.translate(event.x, event.y);
            overlayContext.rotate(event.angle-(Math.PI/2));
            overlayContext.strokeStyle = "#00CC00";
            overlayContext.strokeRect((-(event.width/2)) >> 0, (-(event.height/2)) >> 0, event.width, event.height);
            overlayContext.rotate((Math.PI/2) - event.angle);
            overlayContext.translate(-event.x, -event.y);
        }
    });
});