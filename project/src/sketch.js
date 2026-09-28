import p5 from 'p5'

// one sketch with each creature for each chaper
new p5((p) => {
  p.setup = () => {
    let sketch = p.createDiv().addClass("sketch");
    p.createCanvas(400, 400).parent(sketch);

    p.background("white");
  };

  p.draw = () => {
    // your code here
  };
});

// Creature classes