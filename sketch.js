let parrots = [];

function preload() {
  parrots.push({
    name: "Hahns Macaw",
    size: "12 inch",
    lifeSpan: "30 years",
    img: loadImage("p1-hans.png")
  });
  parrots.push({
    name: "Cockatiel",
    size: "14 inch",
    lifeSpan: "15 years",
    img: loadImage("p2-cock.png")
  });
  parrots.push({
    name: "Ringneck Parakeet",
    size: "17 inch",
    lifeSpan: "30 years",
    img: loadImage("p3-ring.png")
  });
  parrots.push({
    name: "Cockatoo",
    size: "24 inch",
    lifeSpan: "60 years",
    img: loadImage("p4-co.png")
  });
  parrots.push({
    name: "Hyacinth Macaw",
    size: "3 ft 3 inch",
    lifeSpan: "50 years",
    img: loadImage("p5-hya.png")
  });
  parrots.push({
    name: "Rainbow Lorikeet",
    size: "12 inch",
    lifeSpan: "12 years",
    img: loadImage("p6-lori.png")
  });
  parrots.push({
    name: "Budgerigar",
    size: "7 inch",
    lifeSpan: "8 years",
    img: loadImage("p7-bud.png")
  });
}

function setup() {
  createCanvas(1000, 800);
  textAlign(CENTER, TOP);
  textSize(14);
}

function draw() {
  background(20);
  fill(255);
  textSize(22);
  text("Parrot Gallery", width / 2, 30);

  // axis
  stroke(300);
  line(width - 930, height - 100, width - 100, height - 100);
  line(100, height - 70, 100, height - 700);
  textSize(20);
  text("Size", 900, 720);
  text("Lifespan", 100, 70);

  let positions = [
    {x: 340, y: 420},
    {x: 440, y: 520},
    {x: 550, y: 420},
    {x: 720, y: 130},
    {x: 890, y: 190},
    {x: 340, y: 600},
    {x: 210, y: 650}
  ];

  // locate parrots
  for (let i = 0; i < parrots.length; i++) {
    let p = parrots[i];      // current parrot data
    let pos = positions[i];  // parrot positions

    // img
    imageMode(CENTER);
    image(p.img, pos.x, pos.y, 110, 100); // (x, y, width, height)

    // parrot info shows under the img
    textSize(14);
    fill(255);
    text(p.name, pos.x, pos.y + 80);
    text("Size: " + p.size, pos.x, pos.y + 100);
    text("Lifespan: " + p.lifeSpan, pos.x, pos.y + 120);
  }
}
