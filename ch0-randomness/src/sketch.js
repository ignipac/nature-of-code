// No import for p5 statement needed here.
// p5 is automatically available as a global variable.
// <script src="https://cdn.jsdelivr.net/npm/p5@2.3.1/lib/p5.min.js"></script>


let walker;

// Create the element with a class label
const debug = document.createElement('div');
debug.classList.add("debug");

// Append to the document
document.body.appendChild(debug);

// Hooking into the p5 framework
function setup() {
  createCanvas(800, 500);
  background(255);
}

function draw() {
}

class PaintSplatter {


  constructor() {

  }

  show() {

  }

  splatter() {

  }
}

class Walker {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
  }

  show() {
    stroke(0);
    point(this.x, this.y);
  }

  step() {
    let x_distance = max(min(mouseX / width, 1), 0)
    let y_distance = max(min(mouseY / height, 1), 0)
    let dir_to_mouse = createVector(x_distance, y_distance).normalize()
    let r = random(1)
    // Set content and attributes
    debug.innerHTML = "<p>Vector(0, 0)</p>";
    debug.id = "label";
    const label = document.getElementById("label")
    label.innerHTML = dir_to_mouse
    if (r < 0.5) {
      if (r < 0.25) {
        if (this.x < mouseX) { // need the comparison check with mouse pos and current pos to decided axis direction
          this.x += dir_to_mouse.x;
        } else {
          this.x -= dir_to_mouse.x;
        }
      } else {
        if (this.y < mouseY) {
          this.y += dir_to_mouse.y;
        } else {
          this.y -= dir_to_mouse.y;
        }
      }
    } else {
      let xstep = random(-1, 1);
      let ystep = random(-1, 1);
      this.x += xstep;
      this.y += ystep;
    }
  }
}
