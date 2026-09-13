// import p5 from 'p5'
// this way I can load multiple sketches on a single web page
// but require a bit more bolier plate code


// ----- Creative Code Project -----

// new p5(( sketch ) => {
//   sketch.setup = () => {};
//   sketch.draw = () => {};
// })



// const { x, ...z } = walker;
// console.log(walker)
// console.log(z)



// REFACTOR by Class or Factory Pattern
// class Walker {
//   // The constructor runs once per 'new Walker()'
//   constructor(p, x, y) {
//     this.p = p;      // Store the p5 instance
//     this.x = x;
//     this.y = y;
//   }

//   // Methods live on the prototype, shared by all instances
//   step() {
//     const p = this.p;
//     this.x += (p.noise(this.x * 0.01, this.y * 0.01) - 0.5) * 4;
//     this.y += (p.noise(this.y * 0.01, this.x * 0.01) - 0.5) * 4;

//     // Wrap around edges
//     if (this.x > p.width)  this.x = 0;
//     if (this.x < 0)        this.x = p.width;
//     if (this.y > p.height) this.y = 0;
//     if (this.y < 0)        this.y = p.height;
//   }

//   show() {
//     this.p.point(this.x, this.y);
//   }
// }

// new p5(( sketch ) => {
//   sketch.setup = () => {
//     sketch.createCanvas(400, 400)
//     sketch.background('grey')
//   };

//   sketch.draw = () => {
//   };
// }, sketches)

// const createWalker = (p, x, y) => ({
//   x, y,
//   step() {
//     this.x += (p.noise(this.x * 0.01) - 0.5) * 4;
//     this.y += (p.noise(this.y * 0.01) - 0.5) * 4;
//   },
//   show() { p.point(this.x, this.y); }
// });

// Usage: walkers.push(createWalker(p, 100, 100));

// ----- Events & Elements
let triggerAlertMSG = false;

const button = document.createElement('button')
const defaultText = "A button to click on"
button.innerText = "click me"
button.addEventListener('mouseover', () => {
  button.innerText = "hovering..."
})
button.addEventListener('mouseout', () => {
  button.innerText = defaultText
  triggerAlertMSG = false
})
button.addEventListener('click', () => {
  button.innerText = "clicked"
  alert("hello world");
})


// document.body.appendChild(button)
