// No import for p5 statement needed here.
// p5 is automatically available as a global variable.
// <script src="https://cdn.jsdelivr.net/npm/p5@2.3.1/lib/p5.min.js"></script>

// Create the element with a class label
const debug = document.createElement('div');
debug.classList.add("debug");

// Append to the document
document.body.appendChild(debug);

// Objects
let splatter;

// Controls - Sliders
let posSpreadSlider;
let hue_slider;
let baseHueSlider;
let hueSpreadSlider;
let alphaSlider;

// Controls - Buttons
let isActive = true;


function toggleSplatter() {
  isActive = !isActive
  console.log(isActive)
}

// Hooking into the p5 framework
function setup() {
  createCanvas(800, 500);
  background(255);

  let stopButton = createButton("On / Off ");
  stopButton.position(100, height + 200);
  stopButton.mousePressed(this.toggleSplatter);

  splatter = new PaintSplatter()
  splatter.createControls()
}


function draw() {
  if (!isActive) return;
  splatter.update()
}


class PaintSplatter {
  // props
  x = width / 2;
  y = height / 2;

  paintHue;
  paintSat;
  paintBright;


  // state to pass when instancing
  constructor() {

  }

  enter() {

  }

  createControls() {
    posSpreadSlider = createSlider(0, 100, 50, 1);
    posSpreadSlider.position(100, height + 100);
    posSpreadSlider.size(100);

    baseHueSlider = createSlider(0, 100, 50, 1);
    baseHueSlider.position(200, height + 100);
    baseHueSlider.size(100);

    hueSpreadSlider = createSlider(0, 100, 50, 1);
    hueSpreadSlider.position(300, height + 100);
    hueSpreadSlider.size(100);

    alphaSlider = createSlider(0, 100, 50, 1);
    alphaSlider.position(400, height + 100);
    alphaSlider.size(100);



  }

  update() {
    this.splat();
    this.show();
  }

  show() {
    noStroke();
    fill(this.paintHue, this.paintSat, this.paintBright, alphaSlider.value());
    circle(this.x, this.y, 10);
  }

  splat() {
    this.x = randomGaussian(width / 2, posSpreadSlider.value());
    this.y = randomGaussian(height / 2, posSpreadSlider.value());

    this.paintHue = randomGaussian(baseHueSlider.value(), hueSpreadSlider.value());
    this.paintSat = randomGaussian(80, 20);
    this.paintBright = randomGaussian(80, 20);

    if (this.paintHue < 0) {
      this.paintHue += 360;
    } else if (this.paintHue >= 360) {
      this.paintHue -= 360;
    }
    if (this.paintSat > 100) {
      this.paintSat = 100;
    }
    if (this.paintBright > 100) {
      this.paintBright = 100;
    }
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
