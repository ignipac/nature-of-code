new p5((p) => {
  let hasBeenStarted = false;
  let isPaused = false

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

    // Draw logic here...

    if (!hasBeenStarted) {
      isPaused = true
    }
  }
}, sketches)
