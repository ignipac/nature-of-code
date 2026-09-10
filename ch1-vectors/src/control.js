export class Control {
  constructor() {
    // Create the element with a class label
    this.controls = document.createElement('div');
    this.controls.classList.add("controls");
    // Append to the document
    document.body.appendChild(this.controls);
    this.isActive = true;
    // let pauseButton = createElement('button');
    // this.controls.appendChild(pauseButton)
    // pauseButton.mousePressed(this.toggleLiveSketch())
  }

  init() {
    this.isActive = true;
    let pauseButton = createElement('button');
    this.controls.appendChild(pauseButton)
    pauseButton.mousePressed(this.toggleLiveSketch())
  }

  toggleLiveSketch() {
    isActive = !isActive
  }
}
