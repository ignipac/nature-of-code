import p5 from 'p5'

// ----- Creative Code Project -----

// new p5(( sketch ) => {
//   sketch.setup = () => {};
//   sketch.draw = () => {};
// })

new p5(( sketch ) => {
  sketch.setup = () => {
    sketch.createCanvas(400, 400)
    sketch.background('white')
  };

  sketch.draw = () => {
  };
})

new p5(( sketch ) => {
  sketch.setup = () => {
    sketch.createCanvas(400, 400)
    sketch.background('grey')
  };

  sketch.draw = () => {
  };
})



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
