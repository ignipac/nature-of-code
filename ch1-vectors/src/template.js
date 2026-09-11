new p5((p) => {
  let hasBeenStarted = false;
  let isPaused = false
  let isReadyForInputs = false
  let maxDelay = 500;
  let delay = 0

  function userInterface() {
    let sketchCell = p.createDiv()
    sketchCell.addClass('sketch')
    p.createCanvas(400, 400).parent(sketchCell) // 1:1 aspect ratio

    p.rectMode(p.CENTER)
    p.angleMode(p.DEGREES)

    const controls = p.createDiv().parent(sketchCell)
    const playButton = p.createButton("Play")
    const pauseButton = p.createButton("Pause")

    controls.child(playButton)
    controls.child(pauseButton)

    playButton.mousePressed(() => {
      hasBeenStarted = true
      isPaused = false
    })

    pauseButton.mousePressed(() => {
      isPaused = !isPaused
    })
  }

  p.setup = () => {
    userInterface()

  }

  p.draw = () => {
    if (isPaused) return;
    delay += p.deltaTime
    
    // Draw logic here...

    if (!hasBeenStarted) {
      isPaused = true
      delay = 0
    } else {
      if (delay > maxDelay) {
        isReadyForInputs = true
      }
    }
  }

  p.mouseClicked = () => {
    if (!isReadyForInputs) return
    // initial input recieved
  }

}, sketches)
