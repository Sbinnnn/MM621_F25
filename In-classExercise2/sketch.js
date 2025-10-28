let table;

function preload() {
  //loading csv file
  table = loadTable('food.csv', 'csv', 'header');
}

function setup() {
  createCanvas(600, 400);
  background(0);
  textAlign(CENTER);
  textSize(14);
  fill(255);
  text("Korean Food Nutrition Visualization", width / 2, 30);

  //one food data at one time
  for (let i = 0; i < table.getRowCount(); i++) {
    let item = table.getString(i, "Food"); //food name
    let calories = table.getNum(i, "Calories"); //calories
    let sugar = table.getNum(i, "Sugar"); //sugar
    let carbs = table.getNum(i, "Carbs"); //carbs
    let sodium = table.getNum(i, "Sodium"); //sodium
    let protein = table.getNum(i, "Protein"); //protein

    //graph position by sodium
    let x = 100 + i * 100;
    let y = map(carbs, 0, 80, height - 50, 100);
    let size = map(calories, 25, 500, 20, 80);
    let colorShade = map(sodium, 0, 2, 150, 255);

    //sodium color
    fill(random(255), random(255), random(255), 120, 180);
    stroke(255);
    ellipse(x, y, size);

    fill(255);
    text(item, x, height - 10);
  }
}
