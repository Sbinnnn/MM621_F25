let apiData;
let filmCharts = [];
let tvCharts = [];
let bothCharts = [];
let noneCharts = [];

let mode = "all"; // start: show all

function setup() {
  createCanvas(800, 600);
  textSize(16);
  loadJSON("https://api.disneyapi.dev/character?page=1&pageSize=1000", gotData);
}

function gotData(data) {
  apiData = data;

  for (let i = 0; i < apiData.data.length; i++) {
    let c = apiData.data[i];
    let hasFilm = c.shortFilms.length > 0;
    let hasTV = c.tvShows.length > 0;

    if (hasFilm && hasTV) bothCharts.push(c.name);
    else if (hasFilm) filmCharts.push(c.name);
    else if (hasTV) tvCharts.push(c.name);
    else noneCharts.push(c.name);
  }
}

function draw() {
  background(0);
  fill(255);
  textAlign(CENTER);
  text("Disney Characters: Film vs TV", width / 2, 50);
  text("Press F / T / B / N / A", width / 2, 80);

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

  for (let i = 0; i < bars.length; i++) {
    let b = bars[i];
    let h = (b.data.length / total) * maxH;
    let x = startX + i * 150;
    let y = endY - h;

    //show origin color of selected bar
    if (mode !== "all" && mode !== b.label) {
      fill(80); // none selected - gray 
    } else {
      fill(b.color); // sellected bar origin color
    }

    rect(x, y, barW, h);

    fill(255);
    text(b.label, x + barW / 2, endY + 20);
    text(b.data.length, x + barW / 2, y - 10);
  }
}

// keyboard input
function keyPressed() {
  if (key === 'f' || key === 'F') mode = "film";
  if (key === 't' || key === 'T') mode = "tv";
  if (key === 'b' || key === 'B') mode = "both";
  if (key === 'n' || key === 'N') mode = "none";
  if (key === 'a' || key === 'A') mode = "all";
}
