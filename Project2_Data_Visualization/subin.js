let apiData;
let filmCharts = [];
let tvCharts = [];
let bothCharts = [];
let noneCharts = [];

let mode = "all";
let gallery = [];
let alpha = 0;

function setup() {
  createCanvas(800, 600);
  textSize(16);
  textAlign(CENTER);
  loadJSON("https://api.disneyapi.dev/character?page=1&pageSize=300", gotData);
}

function gotData(data) {
  apiData = data;
  for (let i = 0; i < apiData.data.length; i++) {
    let c = apiData.data[i];
    let hasFilm = c.shortFilms.length > 0 || c.films.length > 0;
    let hasTV = c.tvShows.length > 0;

    if (hasFilm && hasTV) bothCharts.push(c);
    else if (hasFilm) filmCharts.push(c);
    else if (hasTV) tvCharts.push(c);
    else noneCharts.push(c);
  }
}

function draw() {
  background(0);
  fill(255);
  text("Click each chart to see chararcters!", width / 2, 50);

  let total = filmCharts.length + tvCharts.length + bothCharts.length + noneCharts.length;
  let barW = 100;
  let maxH = 600;
  let startX = 100;
  let endY = 500;

  let bars = [
    {label: "film", data: filmCharts, color: color(100, 200, 255)},
    {label: "tv", data: tvCharts, color: color(255, 180, 100)},
    {label: "both", data: bothCharts, color: color(180, 255, 150)},
    {label: "none", data: noneCharts, color: color(200)}
  ];

  // draw chart
  for (let i = 0; i < bars.length; i++) {
    let b = bars[i];
    let h = (b.data.length / total) * maxH;
    let x = startX + i * 150;
    let y = endY - h;

    if (mode !== "all" && mode !== b.label) fill(80);
    else fill(b.color);

    rect(x, y, barW, h);
    fill(255);
    text(b.label, x + barW / 2, endY + 20);
    text(b.data.length, x + barW / 2, y - 10);

    // click area
    if (mouseIsPressed && mouseX > x && mouseX < x + barW && mouseY > y && mouseY < endY) {
      showGallery(b.data);
      mode = b.label;
    }

    b.x = x;
    b.y = y;
    b.h = h;
    bars[i] = b;
  }

  // img over a chart, if img overlaps a chart.
  for (let b of bars) {
    if (mode === b.label && gallery.length > 0) {
      alpha = lerp(alpha, 255, 0.08);
      let spacing = 35;
      for (let j = 0; j < gallery.length; j++) {
        let g = gallery[j];
        if (g.img) {
          push();
          tint(255, alpha);
          let imgX = b.x + barW / 2 - 90 + j * (spacing + 40);
          let imgY = b.y - 80; // 막대 위로 살짝 띄움
          image(g.img, imgX, imgY, 60, 60);
          noTint();
          fill(255, alpha);
          textSize(12);
          text(g.name, imgX + 30, imgY - 10);
          pop();
        }
      }
    }
  }
}

// show 3 random img in each clich
function showGallery(list) {
  gallery = [];
  alpha = 0;
  let picks = shuffle(list).slice(0, 3);
  for (let p of picks) {
    let g = {name: p.name, img: null};
    if (p.imageUrl && p.imageUrl.startsWith("http")) {
      g.img = loadImage(p.imageUrl);
    }
    gallery.push(g);
  }
}
