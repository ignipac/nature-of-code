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


function toggleLiveSketch() {
  isActive = !isActive
}


// Hooking into the p5 framework
function setup() {
  createCanvas(800, 500);
  background(255);



  // way to decide if code in draw call should run or exit early
  let onOffButton = createButton("On / Off ");
  onOffButton.parent(debug)

  onOffButton.position(0, height + 10);
  onOffButton.mousePressed(toggleLiveSketch);

  perlinNoiseWalker.enter()

  land = new Terrain(20, 800, 400)
  console.log(land)
}

function draw() {
  if (!isActive) return;

  perlinNoiseWalker.update()
  perlinNoiseWalker.show()
}

const perlinNoiseWalker = {
  t: 0,
  n: 0,
  x: 0,

  // note: give access to obj props using this, anoymous function will not
  enter: function () {
    this.x = width/2
  },
  show: function () {
    noFill()
    background(255)
    circle(this.x, height / 2, 20)

  },
  update: function () {
    this.n = noise(this.t);
    this.x += map(this.n, 0, 1, -1, 1);
    // this.x = map(this.n, 0, 1, 0, width) // assign the new pos
    this.t += 0.01;
  }
}

// Custom distribution of random numbers
function monteCarlo() {
  // Do this “forever” until you find a qualifying random value.
  while (true) { // graph y = x
    // Pick a random value.
    let r1 = random(1);
    // Assign a probability.
    let probability = r1;
    // Pick a second random value.
    let r2 = random(1);
    // Does it qualify?  If so, you’re done!
    if (r2 < probability) {
      return r1;
    }
  }
}


// Exercise 4: Paint splatter simultaion as collection of colored dots
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
    this.createControls()
  }

  createControls() {
    let xAnchor = 25;
    let yAnchor = height + 25;

    let cLabel = createP("Paint Splatter Simulation");
    cLabel.position(xAnchor, yAnchor);

    xAnchor += 25
    yAnchor += 50

    let spreadLabel = createP("Spread");
    spreadLabel.position(xAnchor, yAnchor)

    yAnchor += 50

    posSpreadSlider = createSlider(0, 100, 50, 1);
    posSpreadSlider.position(xAnchor, yAnchor);
    posSpreadSlider.size(100);

    baseHueSlider = createSlider(0, 255, 100, 1);
    baseHueSlider.position(200, height + 100);
    baseHueSlider.size(100);

    hueSpreadSlider = createSlider(0, 255, 100, 1);
    hueSpreadSlider.position(300, height + 100);
    hueSpreadSlider.size(100);

    alphaSlider = createSlider(0, 255, 255, 1);
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
