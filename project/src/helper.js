export function createCanvas(p) {
  let sketch = p.createDiv()
  sketch.addClass('sketch')
  // parent the p5 canvas to div with class attribute 'sketch'
  p.createCanvas(400, 400).parent(sketch) // 1:1 aspect ratio
}
