var constraints = { video: { facingMode: "user" }, audio: false };

// Define constants
const cameraView = document.querySelector("#camera--view"),
      cameraOutput = document.querySelector("#camera--output"),
      cameraSensor = document.querySelector("#camera--sensor"),
      cameraTrigger = document.querySelector("#camera--trigger")

	 
/* The "cameraStart" function will access the camera and stream the video
 to the camera--view element we created.	 
/*
 This code uses the "getUserMedia" method 
 to access the camera using the constraints we defined.
 We’ll make cameraView the source for the stream.
 We’ll also add a ".catch" to make sure an error 
 is reported if the camera doesn’t work.
*/
// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}
function camera2Start() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[1];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}

/*
 Once we have a video stream to work with, 
 we can program the button to grab a frame
 from the stream that we’ll use as our image 
 output.
*/

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
};

/*
Last, we’ll need to initiate the "cameraStart function"
when the window is finished loading. That’ll look like this…
*/
// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);