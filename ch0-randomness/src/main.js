import p5 from 'p5'
import { greet } from './utils';

// No import for p5 statement needed here.
// p5 is automatically available as a global variable.



console.log(greet("world"))

let walker;

const sketch = (p) => {
  p.setup = () => {
    // This canvas size is used to accommodate the book’s layout but isn’t critical for the examples otherwise.
    p.createCanvas(800, 600);
    p.background(235);

    walker = new Walker(p);
  };

  p.draw = () => {
    walker.step();
    walker.show();
  };

  class Walker {
    constructor(p) {
      // Access width/height via the sketch instance 'p'
      this.p = p;
      this.x = p.width / 2;
      this.y = p.height / 2;
    }

    show() {
      this.p.stroke(0);
      this.p.point(this.x, this.y);
    }

    step() {
      // Any floating-point number from –1 to 1
      let xstep = this.p.random(-1, 1);
      let ystep = this.p.random(-1, 1);

      this.x += xstep;
      this.y += ystep;
    }
  }
};

new p5(sketch);
