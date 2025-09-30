let lights;
let sounds = [];

  function preload() {
  sounds[0] = loadSound('1.mp3');
  sounds[1] = loadSound('2.mp3');
  sounds[2] = loadSound('3.mp3');
  sounds[3] = loadSound('4.mp3');
  sounds[4] = loadSound('5.mp3')
}

function setup() {
  createCanvas(700, 500);
  frameRate(4);
  sounds[0].play();
}

function draw() {
  background(0);

  // random lights
  for (let i = 0; i < 70; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(5, 15);
    let alpha = random(100, 255);

    fill(random(255), random(255), random(255), alpha);
    noStroke();
    ellipse(x, y, size);
    
    // console.log(mouseX, mouseY);
  }
}

function keyPressed(){
    if (key === '1'){
      sounds[1].play();
    } else if (key === '2'){
      sounds[2].play();
    } else if (key === '3'){
      sounds[3].play();
    } else if (key ==='4'){
      sounds[4].play();
    }  else if (key ==='l'){
      fill (random(255));
       quad(30, 0, 70, 0, 700, 500, 500, 700);
    } else if (key ==="k"){
      fill (random(255));
      quad(670, 0, 630, 0, 0, 500, 200, 700);
    }
  }

function mousePressed(){
  background(95, 75, 67, 200);
}
