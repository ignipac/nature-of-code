import p5 from 'p5'
import { Block } from './block';

const sketches = document.getElementById('sketches')

new p5((p) => { // p - processing in-built functions
  // Objects
  let block;
  let ball;

  p.setup = () => {
    p.createCanvas(400, 400)
    p.rectMode(p.CENTER)
    // p.angleMode(p.DEGREES)

    // Assign Objects
    block = {
      posX: p.width / 2,
      posY: p.height / 2,
      angle: 0,
      size: 50,
      maxDistance: 100,

      display: function () {
        p.translate(this.posX, this.posY)
        p.rotate(this.angle)
        p.rect(0, 0, this.size, this.size)
      },

      move: function () {
        let distanceFromMouse = p.dist(p.mouseX, p.mouseY, this.posX, this.posY)
        if (distanceFromMouse < this.maxDistance) {
          this.angle += p.PI / 128;
        }
      }
    }

    ball = {
      posX: p.width / 2,
      posY: p.height / 2,
      size: 50,
      speedX: 2,
      speedY: 2.5,
      display: function () {
        // p.translate(this.posX, this.posY)
        p.circle(this.posX, this.posY, this.size)
        p.fill('grey')
        p.stroke('black')
        p.strokeWeight(2)
      },
      bounce: function () {
        this.posX += this.speedX
        this.posY += this.speedY

        if (this.posX > p.width - this.size/2 || this.posX < 0 + this.size/2) {
          this.speedX *= -1
        }
        if (this.posY > p.height - this.size/2 || this.posY < 0 + this.size/2) {
          this.speedY *= -1
        }
      }
    }


  }

  p.draw = () => {
    p.background('white') // clear previous draw
    ball.display()
    ball.bounce()

  };
}, sketches)
