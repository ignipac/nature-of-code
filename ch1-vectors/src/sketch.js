import p5 from 'p5'

const sketches = document.getElementById('sketches')

new p5((p) => {
  let hasBeenStarted = false;
  let isPaused = false

  p.setup = () => {
    p.createCanvas(400, 400)

    const playButton = p.createButton("Play")
    playButton.mousePressed(() => {
      hasBeenStarted = true
      isPaused = false
    })

    const pauseButton = p.createButton("Pause")
    pauseButton.mousePressed(() => {
      isPaused = !isPaused
    })
  }
  p.draw = () => {
    if (isPaused) return;

    p.background(255) //white
    let mouse = p.createVector(p.mouseX, p.mouseY);
    let center = p.createVector(p.width / 2, p.height / 2)
    p.stroke(0) // black
    p.strokeWeight(4)
    p.line(0, 0, mouse.x, mouse.y);
    p.line(0, 0, center.x, center.y)

    mouse.sub(center)

    p.translate(center.x, center.y) // get local points from center of canvas
    p.line(0, 0, mouse.x, mouse.y)

    if (!hasBeenStarted) {
      isPaused = true
    }

  }
}, sketches)


// for each sketch pass a different p5 obj for the sketch to modify, for color, canvas
// this each p5 is it's own img/resource
new p5((p) => { // p - processing in-built functions

  let hasBeenStarted = false
  let isPaused = false
  // Objects
  let ball;

  p.setup = () => {
    p.createCanvas(400, 400) // 1:1 aspect ratio
    p.rectMode(p.CENTER)
    p.angleMode(p.DEGREES)

    const playButton = p.createButton("Play")
    playButton.mousePressed(() => {
      hasBeenStarted = true
      isPaused = false
    })
    const pauseButton = p.createButton("Pause")
    pauseButton.mousePressed(() => {
      isPaused = true
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
