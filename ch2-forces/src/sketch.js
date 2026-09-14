import p5 from 'p5'

const sketches = document.getElementById('sketches')

new p5((p) => {
  p.setup = () => {
    let sketch = p.createDiv()
    sketch.addClass('sketch')

    // canvas with 1:1 aspect ratio, contained in sketch div
    p.createCanvas(400, 400).parent(sketch)
    p.background('white')

  }
  p.draw = () => {

  }
}, sketches)
