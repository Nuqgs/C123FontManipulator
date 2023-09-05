let noseX = 0;
let noseY = 0;
let difference = 0;
let rightWristX = 0;
let leftWristX = 0;
let img; // Declare an image variable

function preload() {
  // Load the image
  img = loadImage('Ramanujatext.png');
}

function setup() {
  video = createCapture(VIDEO);
  video.size(450, 450);

  canvas = createCanvas(450, 450);
  canvas.position(560, 150);

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized!');
}

function gotPoses(results) {
  if (results.length > 0) {
    console.log(results);
    noseX = results[0].pose.nose.x;
    noseY = results[0].pose.nose.y;
    console.log("noseX = " + noseX + " noseY = " + noseY);

    leftWristX = results[0].pose.leftWrist.x;
    rightWristX = results[0].pose.rightWrist.x;
    difference = floor(leftWristX - rightWristX);

    console.log("leftWristX  = " + leftWristX + " rightWristX = " + rightWristX + " difference = " + difference);
  }
}

function draw() {
  background('#969A97');

  document.getElementById("square_side").innerHTML = "Width And Height of an Image will be = " + difference + "px";
  
  // Display the image at the nose position
  image(img, noseX - difference / 2, noseY - difference / 2, difference, difference);
}
