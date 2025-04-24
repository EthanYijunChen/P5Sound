let sound;
let amplitude;
let personImg;
let volHistory = [];
let isPlaying = false;

function preload() {
  personImg = loadImage('Astronaut.png');
}

function setup() {
  let canvas = createCanvas(800, 400);
  canvas.parent('canvas-container');
  createFileInput(handleFile).position(10, 410);
  createButton('Play/Pause').position(150, 410).mousePressed(togglePlay);
  amplitude = new p5.Amplitude();
  background(0);
}

function handleFile(file) {
  if (file.type === 'audio') {
    sound = loadSound(file);
  }
}

function togglePlay() {
  if (sound && !isPlaying) {
    sound.play();
    isPlaying = true;
  } else if (sound && isPlaying) {
    sound.pause();
    isPlaying = false;
  }
}

function draw() {
  background(0);
  let vol = amplitude.getLevel();
  volHistory.push(vol);
  if (volHistory.length > width / 2) {
    volHistory.splice(0, 1);
  }
  stroke(255);
  noFill();
  beginShape();
  for (let i = 0; i < volHistory.length; i++) {
    let y = map(volHistory[i], 0, 0.5, height / 2, 0);
    vertex(i, y);
  }
  endShape();
  stroke(100);
  line(width / 2, 0, width / 2, height);
  let personHeight = map(vol, 0, 0.5, height - 50, 50);
  image(personImg, width / 2 + 50, personHeight - 50, 50, 50);
}

function windowResized() {
  resizeCanvas(800, 400);
}