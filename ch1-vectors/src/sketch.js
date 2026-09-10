import p5 from 'p5'

// for each sketch pass a different p5 obj for the sketch to modify, for color, canvas
// this each p5 is it's own img/resource
const sketches = document.getElementById('sketches')

// bouncing ball with choosing the start launch direction and speed
new p5((p) => { // p - processing in-built functions
  let hasBeenStarted = false
  let isPaused = false
  let isReadyForInputs = false
  let maxDelay = 500;
  let delay = 0
  // Objects
  let ball;

  function userInterface() {
    let sketchCell = p.createDiv()
    sketchCell.addClass('sketch')
    p.createCanvas(400, 400).parent(sketchCell) // 1:1 aspect ratio

    p.rectMode(p.CENTER)
    p.angleMode(p.DEGREES)

    const controls = p.createDiv().parent(sketchCell)
    const playButton = p.createButton("Play")
    const pauseButton = p.createButton("Pause")

    controls.child(playButton)
    controls.child(pauseButton)

    playButton.mousePressed(() => {
      hasBeenStarted = true
      isPaused = false
    })

    pauseButton.mousePressed(() => {
      isPaused = !isPaused
    })
  }

  p.setup = () => {
    userInterface()

    ball = {
      hasBeenLaunched: false,
      hasSetStartVel: false,
      pos: p.createVector(p.width / 2, p.height / 2),
      dir: p.createVector(0, 0),
      speed: 5,
      size: 50,

      lauching: function () {
        let mouse = p.createVector(p.mouseX, p.mouseY)
        let center = p.createVector(p.width / 2, p.height / 2);
        mouse.sub(center)

        // one-time logic execution
        if (this.hasBeenLaunched) {
          if (!this.hasSetStartVel) {
            // this.speed = mouse.mag() / center.mag(); // mouse magnitude, the speed at which the ball is thrown
            // console.log(this.speed)
            this.dir = mouse.normalize()
            this.hasSetStartVel = true
          }
        } else {
          // display
          p.push()
          // p.fill(0);
          // p.rect(0, 0, m * 2, 10);
          p.translate(p.width / 2, p.height / 2);
          p.strokeWeight(5)
          p.line(0, 0, mouse.x, mouse.y);
          p.pop();
        }
      },

      display: function () {
        // push and pop contains fill, stroke... data to specific shape, model etc.
        p.push();
        p.fill('black')
        p.circle(this.pos.x, this.pos.y, this.size)
        p.pop();
      },

      bounce: function () {
        if (this.dir.mag() == 0) return;

        let vel = p.createVector(this.dir.x * this.speed, this.dir.y * this.speed)
        this.pos.add(vel)

        if (this.pos.x > p.width - this.size/2 || this.pos.x < 0 + this.size/2) {
          this.dir.x *= -1
        }
        if (this.pos.y > p.height - this.size/2 || this.pos.y < 0 + this.size/2) {
          this.dir.y *= -1
        }
      }
    }

    // setup continued...
  }

  p.mouseClicked = () => {
    if (!isReadyForInputs) return
    ball.hasBeenLaunched = true
  }

  p.draw = () => {
    if (isPaused) return;

    // delays first render for a duration of (i think) in ms
    delay += p.deltaTime
    // if (delay < maxDelay) return;

    p.background(255) // clear previous draw, keep at top of draw call

    ball.lauching()
    ball.display()
    ball.bounce()

    if (p.mouseIsPressed) {
      if (p.mouseButton.left) {
        // continous inputs detection...
      }
    }

    if (!hasBeenStarted) {
      isPaused = true
      delay = 0
    } else {
      if (delay > maxDelay) {
        isReadyForInputs = true
      }
    }
  };
}, sketches)



// sketch exploring vector subtraction
new p5((p) => {
  let hasBeenStarted = false;
  let isPaused = false

  p.setup = () => {
    let sketchCell = p.createDiv()
    sketchCell.addClass('sketch')

    p.createCanvas(400, 400).parent(sketchCell)

    const controls = p.createDiv().parent(sketchCell)
    const playButton = p.createButton("Play")
    const pauseButton = p.createButton("Pause")

    controls.child(playButton)
    controls.child(pauseButton)

    playButton.mousePressed(() => {
      hasBeenStarted = true
      isPaused = false
    })

    pauseButton.mousePressed(() => {
      isPaused = !isPaused
    })
  }

  p.draw = () => {
    if (isPaused) return;

    p.background(255) //white
    let mouse = p.createVector(p.mouseX, p.mouseY);
    let center = p.createVector(p.width / 2, p.height / 2)

    // display changes
    p.stroke(0) // black
    p.strokeWeight(4)
    p.line(0, 0, center.x, center.y)
    p.line(0, 0, mouse.x, mouse.y);

    mouse.sub(center)
    p.translate(center.x, center.y) // get local points from center of canvas
    p.line(0, 0, mouse.x, mouse.y)

    if (!hasBeenStarted) {
      isPaused = true
    }
  }

}, sketches)


// bouncing ball sketch to group related by using vectors
new p5((p) => { // p - processing in-built functions

  let hasBeenStarted = false
  let isPaused = false
  // Objects
  let ball;

  p.setup = () => {
    let sketchCell = p.createDiv()
    sketchCell.addClass('sketch')

    p.createCanvas(400, 400).parent(sketchCell) // 1:1 aspect ratio

    p.rectMode(p.CENTER)
    p.angleMode(p.DEGREES)

    const controls = p.createDiv().parent(sketchCell)
    const playButton = p.createButton("Play")
    const pauseButton = p.createButton("Pause")

    controls.child(playButton)
    controls.child(pauseButton)

    playButton.mousePressed(() => {
      hasBeenStarted = true
      isPaused = false
    })

    pauseButton.mousePressed(() => {
      isPaused = !isPaused
    })

    ball = {
      pos: p.createVector(p.width / 2, p.height / 2),
      dir: p5.Vector.random2D(),
      launch_angle: p.random(0, 360),
      speed: 5,
      size: 50,

      init: function () {
        // this.dir.rotate(this.launch_angle)
      },

      display: function () {
        // p.translate(this.posX, this.posY)
        p.circle(this.pos.x, this.pos.y, this.size)
        p.fill('white')
        p.stroke('white')
        p.strokeWeight(2)
      },
      bounce: function () {
        let vel = p.createVector(this.dir.x * this.speed, this.dir.y * this.speed)
        this.pos.add(vel)
        if (this.pos.x > p.width - this.size/2 || this.pos.x < 0 + this.size/2) {
          this.dir.x *= -1
        }
        if (this.pos.y > p.height - this.size/2 || this.pos.y < 0 + this.size/2) {
          this.dir.y *= -1
        }
      }
    }

    ball.init()
    // setup...

  }

  p.draw = () => {
    if (isPaused) return;

    p.background('black') // clear previous draw
    ball.display()
    ball.bounce()

    if (!hasBeenStarted) {
      isPaused = true
    }
  };
}, sketches)



// Helpers
