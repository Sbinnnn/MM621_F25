let head;

let topImgs = [];
let bottomImgs = [];


let selectedTop;
let selectedBottom;


let spinningTop = true;
let spinningBottom = true;

function preload() {
  
  topImgs[0] = loadImage("t1.png");
  topImgs[1] = loadImage("t2.png");
  topImgs[2] = loadImage("t3.png");
  topImgs[3] = loadImage("t4.png");

 
  bottomImgs[0] = loadImage("b1.png");
  bottomImgs[1] = loadImage("b2.png");
  bottomImgs[2] = loadImage("b3.png");
  

  head = loadImage("head.png");
}

function setup() {
  createCanvas(600, 1000);
  imageMode(CENTER);

 
  currentTop = random(topImgs);
  currentBottom = random(bottomImgs);
  
}

function draw() {
  
      background(220);
    image(head, 300, 600);

 
  if (spinningTop) {
    selectedTop = random(topImgs);
  }
  image(selectedTop, 300, 600);


  if (spinningBottom) {
    selectedBottom = random(bottomImgs);
  }
  image(selectedBottom, 300, 600);

  
  fill(0);
  textAlign(CENTER);
  textSize(24);
  text("↑ Up Arrow: Stop the top random/Reply", width / 2, 50);
  text("↓ Down Arrow: Stop the bottom random/Reply", width / 2, 90);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    spinningTop = !spinningTop;  
  } else if (keyCode === DOWN_ARROW) {
    spinningBottom = !spinningBottom; 
  }
}
