

// No import statement needed here.
// p5 is automatically available as a global variable.

function setup() {
  //{!1} This canvas size is used to accommodate the book’s layout but isn’t critical for the examples otherwise.
  createCanvas(640, 240);
  background(255);
}

function draw() {
  fill(0, 25);
  stroke(0, 50);
  // {!1} Draw a random circle each time through draw().
  // circle(random(width), random(height), 16);
}
