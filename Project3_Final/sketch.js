let bgImg;

// Matter.js setup
let Engine = Matter.Engine;
let World = Matter.World;
let Bodies = Matter.Bodies;
let Events = Matter.Events;

let engine, world;

let bowlImages = [];
let sounds = [];
let bowls = [];


function preload() {
  sounds.push(loadSound("sound/sound1.mp3"));
  sounds.push(loadSound("sound/sound2.mp3"));
  sounds.push(loadSound("sound/sound3.mp3"));
  sounds.push(loadSound("sound/sound4.mp3"));
  sounds.push(loadSound("sound/sound5.mp3"));
  sounds.push(loadSound("sound/sound6.mp3"));
  sounds.push(loadSound("sound/sound7.mp3"));
  sounds.push(loadSound("sound/sound8.mp3"));

  bowlImages.push(loadImage("img/bowl1.png"));
  bowlImages.push(loadImage("img/bowl2.png"));
  bowlImages.push(loadImage("img/bowl3.png"));
  bowlImages.push(loadImage("img/bowl4.png"));
  bowlImages.push(loadImage("img/bowl5.png"));
  bowlImages.push(loadImage("img/bowl6.png"));
  bgImg = loadImage("img/bg.jpeg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // create the physics engine
  engine = Engine.create();
  world = engine.world;

  // no gravity
  world.gravity.y = 0;

  makeWalls();

  // bowl sounds
  Events.on(engine, "collisionStart", playHitSound);
}

function draw() {
  imageMode(CORNER);
image(bgImg, 0, 0, width, height);

  Engine.update(engine);

  // draw random bowls
  for (let b of bowls) {
    let pos = b.body.position;

// bowl shadow
    noStroke();
    fill(50, 120, 200, 80);
    ellipse(
      pos.x,
      pos.y + b.size * 0.25,
      b.size * 0.9,
      b.size * 0.35
    );
    
    imageMode(CENTER);
    image(b.img, pos.x, pos.y, b.size, b.size);

  }
  
}

// mouse press > make a new random bowl
function mousePressed() {
  createBowl(mouseX, mouseY);
}


// make a new random bowl
function createBowl(x, y) {
  let size = random(80, 200);
  let img = random(bowlImages);

  // circular physics body
  let body = Bodies.circle(x, y, size / 2, {
    restitution: 1,     // bounce
    frictionAir: 0.01   // air friction
  });

  World.add(world, body);

  // bowls
  bowls.push({
    body: body,
    img: img,
    size: size
  });

  // first move speed
  Matter.Body.setVelocity(body, {
    x: random(-5, 5),
    y: random(-5, 5)
  });
}


// wall
function makeWalls() {
  let t = 200; // wall thinkness

  let walls = [
    Bodies.rectangle(width/2, -t/2, width, t, { isStatic: true }),
    Bodies.rectangle(width/2, height+t/2, width, t, { isStatic: true }),
    Bodies.rectangle(-t/2, height/2, t, height, { isStatic: true }),
    Bodies.rectangle(width+t/2, height/2, t, height, { isStatic: true })
  ];

  World.add(world, walls);
}


// sound
function playHitSound(event) {
  let sound = random(sounds);
  if (!sound.isPlaying()) {
    sound.play();
  }
}


// full canvas size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
