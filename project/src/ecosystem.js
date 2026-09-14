// ----- Creative Code Project -----
import p5 from 'p5'
import * as h from './helper'

const sketches = document.getElementById('sketches')

// End of ch1 (Vectors) sketch
new p5((p) => {
  p.setup = () => {
    h.createCanvas(p)
    p.background(255)
  }

  p.draw = () => {

  }

}, sketches)

// End of ch0 (Randomness) sketch
new p5((p) => {
  let walker;
  p.setup = () => {
    h.createCanvas(p)
    p.background(255)

    // Objects
    walker = {
      x: p.width/2,
      y: p.height / 2,

      step: function () {
        this.x += (p.noise(this.x * 0.01, this.y * 0.01) - 0.5) * 4;
        this.y += (p.noise(this.y * 0.01, this.x * 0.01) - 0.5) * 4;
      }
    }
  };

  p.draw = () => {
    walker.step()
    p.background('white') // clear previous draw
    p.circle(walker.x, walker.y, 20);
    p.triangle(walker.x + 5, walker.y, walker.x + 20, walker.y + 10, walker.x + 20, walker.y - 10)
    p.triangle(walker.x - 5, walker.y, walker.x - 20, walker.y + 10, walker.x - 20, walker.y - 10)
  };

}, sketches)
