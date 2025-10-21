let table;

function preload() {
  //loading csv file
  table = loadTable('food.csv', 'csv', 'header');
}

function setup() {
  createCanvas(600, 400);
  background(250);
  textAlign(CENTER);
  textSize(14);
  fill(0);
  text("Korean Food Nutrition Visualization", width / 2, 30);

  //one food data at one time
  for (let i = 0; i < table.getRowCount(); i++) {
    let item = table.getString(i, "Food");
    let calories = table.getNum(i, "Calories");
    let sugar = table.getNum(i, "Sugar");
    let carbs = table.getNum(i, "Carbs");
    let sodium = table.getNum(i, "Sodium");
    let protein = table.getNum(i, "Protein");

    //graph location
    let x = 100 + i * 100;
    let y = map(carbs, 0, 80, height - 50, 100);
    let size = map(calories, 25, 500, 20, 80);
    let colorShade = map(sodium, 0, 2, 150, 255);

    fill(colorShade, 120, 180);
    noStroke();
    ellipse(x, y, size);

    fill(0);
    text(item, x, height - 10);
  }
}
