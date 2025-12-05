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

// wobbling setup
let wobbleData = new Map();
let wobbleDuration = 200;
let wobbleStrength = 8;

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

  engine = Engine.create();
  world = engine.world;
  world.gravity.y = 0;

  makeWalls();

  Events.on(engine, "collisionStart", playHitSound);
  Events.on(engine, "collisionStart", wobbleOnCollision);
}

function draw() {
  imageMode(CORNER);
  image(bgImg, 0, 0, width, height);

  Engine.update(engine);

  let now = millis();
  let minV = 0.5;

  for (let b of bowls) {
    let pos = b.body.position;
    let vel = b.body.velocity;
    let shakeX = 0;

    // keep minimum velocity
    if (abs(vel.x) < minV && abs(vel.y) < minV) {
      Matter.Body.setVelocity(b.body, {
        x: vel.x < 0 ? -minV : minV,
        y: vel.y < 0 ? -minV : minV
      });
    }

    // collision wobbling effect
    if (wobbleData.has(b.body.id)) {
      let startTime = wobbleData.get(b.body.id);
      let t = (now - startTime) / wobbleDuration;

      if (t < 1) {
        shakeX = sin(t * PI * 10) * wobbleStrength;
      } else {
        wobbleData.delete(b.body.id);
      }
    }

    noStroke();
    fill(50, 120, 200, 80);
    ellipse(pos.x, pos.y + b.size * 0.25, b.size * 0.9, b.size * 0.35);

    imageMode(CENTER);
    image(b.img, pos.x + shakeX, pos.y, b.size, b.size);
  }
}


function mousePressed() {
  createBowl(mouseX, mouseY);
}

function createBowl(x, y) {
  let size = random(80, 200);
  let img = random(bowlImages);

  let body = Bodies.circle(x, y, size / 2, {
    restitution: 1,
    frictionAir: 0.01
  });

  World.add(world, body);

  bowls.push({ body, img, size });

  Matter.Body.setVelocity(body, {
    x: random(-5, 5),
    y: random(-5, 5)
  });
}

function makeWalls() {
  let t = 200;

  let walls = [
    Bodies.rectangle(width/2, -t/2, width, t, { isStatic: true }),
    Bodies.rectangle(width/2, height+t/2, width, t, { isStatic: true }),
    Bodies.rectangle(-t/2, height/2, t, height, { isStatic: true }),
    Bodies.rectangle(width+t/2, height/2, t, height, { isStatic: true })
  ];

  World.add(world, walls);
}

function playHitSound(event) {
  let sound = random(sounds);
  if (!sound.isPlaying()) {
    sound.play();
  }
}

//collision wobbling effect
function wobbleOnCollision(event) {
  for (let p of event.pairs) {
    wobbleData.set(p.bodyA.id, millis());
    wobbleData.set(p.bodyB.id, millis());
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
