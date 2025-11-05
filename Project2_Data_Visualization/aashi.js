let characters = []; // CHaracters Arrey
let loading = true;
let filterMode = "A"; // A=All, F=Films>0, T=TV>0, G=Games>0
let selected = null;  // holds the currently selected character object (or null)

function setup() {
  createCanvas(1200, 4000); // for scrolling
  textFont('sans-serif');

  const url = 'https://api.disneyapi.dev/character?page=1&pageSize=50';
  loadJSON(url, gotData);
}

function gotData(data) {
  const list = data.data || [];
  characters = list.map(c => {
    const films  = c.films?.length || 0;
    const shorts = c.shortFilms?.length || 0;
    const tv     = c.tvShows?.length || 0;
    const games  = c.videoGames?.length || 0;
    const total  = films + shorts + tv + games;
    return {
      name: c.name,
      imgUrl: c.imageUrl,
      films, shorts, tv, games, total,
      img: null,
      _rect: null // will store last-drawn rect for hit-testing
    };
  }).filter(c => c.imgUrl);

  characters.forEach(c => c.img = loadImage(c.imgUrl, ()=>{}, ()=>{}));
  loading = false;
}

function draw() {
  noStroke();
  background(17, 60, 207, 0); //Backgrounf Blue
  drawHeader();

  if (loading) {
    fill(20);
    text("Loading...", 20, 60);
    return;
  }

  drawCardsGrid();
}

//Header and Filters
function drawHeader() {
  // noStroke();
  // textAlign(CENTER, BASELINE);
  // //fill(191, 245, 253); //light blue 
  // fill(255);
  // textSize(22); 
  // textStyle(BOLD);
  // text("Disney Characters — Click a card to expand & see stats", width/2, 30);

  // textStyle(NORMAL); 
  // textSize(15); 
  // fill(255);
  // text("FILTERS: F = Films | T = TV | G = Games | A = All", width/2, 52);
  // textAlign(LEFT, BASELINE);

  // Active Filtr Indication
  const label = (filterMode==="A"?"All":
                 filterMode==="F"?"Films>0":
                 filterMode==="T"?"TV>0":"Games>0");
  const chip = `Filter: ${label}`;
  const w = textWidth(chip) + 16;
  fill(191, 245, 253); 
  rect(16, 56, w, 23, 8);
  fill(0); 
  textAlign(LEFT, CENTER); 
  text(chip, 24, 67);
  textAlign(LEFT, CENTER);
}

function keyPressed(){
  if (key==='A' || key==='a') filterMode="A";
  if (key==='F' || key==='f') filterMode="F";
  if (key==='T' || key==='t') filterMode="T";
  if (key==='G' || key==='g') filterMode="G";
}

// Cards , and the whole Grid
function drawCardsGrid() {
  const CARD_W = 260, CARD_H = 260, MARGIN = 20, HEADER = 90;

  const filtered = characters.filter(c => {
    if (filterMode === "F") return c.films  > 0;
    if (filterMode === "T") return c.tv     > 0;
    if (filterMode === "G") return c.games  > 0;
    return true;
  });

  //number of columns per row
  const cols = max(1, floor((width - MARGIN * 2) / (CARD_W + MARGIN)));
  let x = MARGIN, y = HEADER + MARGIN, col = 0;

  for (const c of filtered) { //to check if this card is selected out of the filtered set
    // Is this the selected card?
    const isSelected = (selected === c);

    // Draw the card (returns the rect used to draw)
    const rectObj = drawCard(c, x, y, isSelected);
    c._rect = rectObj; // save for click ... remember which card the user would click

    // after 1 row is filled 
    //next row starts to fill up
    col++;
    if (col >= cols) { col = 0; x = MARGIN; y += CARD_H + MARGIN; }
    else { x += CARD_W + MARGIN; }
  }
}


// Draws a single card.
// If selected, it renders slightly bigger and shows emoji stats lines.
// Returns an object {x, y, w, h} used for hit-testing.

function drawCard(c, x, y, isSelected) {
  // OG size; when selected grows a bit
  const W0 = 260, H0 = 260;
  const scale = isSelected ? 1.08 : 1.0;
  const W = W0 * scale, H = (H0 + (isSelected ? 40 : 0)) * scale; // extra height for bottom data lines
  const pad = 12 * scale;

  // Keeping the card centered around when a card is scaled
  const cx = x + (W0 - W) / 2;
  const cy = y + (H0 - H) / 2;

  // hover 
  const isHover = mouseX >= cx && mouseX <= cx+W && mouseY >= cy && mouseY <= cy+H;

  // card 
  noStroke(); fill(255); rect(cx, cy, W, H, 16);
  if (isHover && !isSelected) { noFill(); stroke(90,150,255,180); strokeWeight(2); rect(cx, cy, W, H, 16); }

  // image slightly zooms on hover or when selected
  const imgW = W - pad*2, imgH = 150 * scale;
  const zoom = isSelected ? 1.06 : (isHover ? 1.03 : 1.0);
  const ix = cx + pad + (imgW*(1-zoom))/2;
  const iy = cy + pad + (imgH*(1-zoom))/2;
  if (c.img) image(c.img, ix, iy, imgW*zoom, imgH*zoom);

  // name + total
  fill(20); 
  textSize(14*scale); 
  textStyle(BOLD);
  const nameY = cy + pad + imgH + 26*scale;
  text(c.name.length > 24 ? c.name.slice(0,22)+"…" : c.name, cx + 12*scale, nameY);
  textStyle(NORMAL); textSize(12*scale); fill(60);
  text(`Total Media: ${c.total}`, cx + 12*scale, nameY + 18*scale);

  // when selected, This willshow this 
  if (isSelected) {
    const lines = [
      `🎬 Films: ${c.films}`,
      `🎞 Shorts: ${c.shorts}`,
      `📺 TV: ${c.tv}`,
      `🎮 Games: ${c.games}`
    ];
    const startY = nameY + 32*scale;
    fill(40); textSize(12*scale);
    for (let i = 0; i < lines.length; i++) {
      text(lines[i], cx + 12*scale, startY + i * (16*scale));
    }
  }

  return { x: cx, y: cy, w: W, h: H };
}

//mouse function clicks
function mousePressed() {
  if (loading) return;

  // Find a card under the mouse (check all characters; use their last _rect)
  let hit = null;
  for (const c of characters) {
    const r = c._rect;
    if (!r) continue;
    if (mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h) {
      hit = c; break;
    }
  }

  // Toggle selection
  if (hit) {
    selected = (selected === hit) ? null : hit;
  } else {
    selected = null;
  }
}
