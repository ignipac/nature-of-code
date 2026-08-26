// No import for p5 statement needed here.
// p5 is automatically available as a global variable.
// <script src="https://cdn.jsdelivr.net/npm/p5@2.3.1/lib/p5.min.js"></script>

// Create the element with a class label
const debug = document.createElement('div');
debug.classList.add("debug");

// Append to the document
document.body.appendChild(debug);

// States
let splatter;

// Hooking into the p5 framework
function setup() {
  createCanvas(800, 500);
  background(255);

  splatter = new PaintSplatter()
  splatter.enter()
}

function draw() {
  splatter.update()
}

let h_slider;
let v_slider;

class PaintSplatter {
  // props
  x = width / 2;
  y = height / 2;

  // state to pass when instancing
  constructor() {

  }

  enter() {
    h_slider = createSlider(0, 100, 50, 1);
    h_slider.position(100, height + 100);
    h_slider.size(100);
    console.log(h_slider.value())
  }

  update() {
    this.splat()
    this.show()
  }

  show() {
    stroke(255);
    fill(0);
    circle(this.x, this.y, 10);
  }

  splat() {
    this.x = randomGaussian(width/2, h_slider.value());
    this.y = randomGaussian(height/2, 50);
  }

}

class Walker {
  label;

  constructor() {
    this.x = width / 2;
    this.y = height / 2;
  }

  enter() {
    // Set content and attributes
    debug.innerHTML = "<p>Vector(0, 0)</p>";
    debug.id = "label";
    label = document.getElementById("label")
  }

  show() {
    stroke(0);
    point(this.x, this.y);
  }

  step() {
    let x_dir = max(min(mouseX / width, 1), 0)
    let y_dir = max(min(mouseY / height, 1), 0)
    let dir_to_mouse = createVector(x_dir, y_dir).normalize()
    let r = random(1)

    this.label.innerHTML = dir_to_mouse
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
