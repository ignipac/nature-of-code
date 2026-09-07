import p5 from 'p5'
import { Block } from './block';

const sketches = document.getElementById('sketches')

new p5((p) => { // p - processing in-built functions
  // Objects
  let block;

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

    // block = new Block(p, 50)
  }

  p.draw = () => {
    p.background('white') // clear previous draw

    block.move();
    block.display();
  };
}, sketches)
