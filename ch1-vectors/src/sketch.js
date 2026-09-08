import p5 from 'p5'
import { Block } from './block';

const sketches = document.getElementById('sketches')

new p5((p) => { // p - processing in-built functions
  let cols; let rows; let cellSize = 10;

  // Objects
  let blocks = [];
  let ball;

  p.setup = () => {
    p.createCanvas(500, 500) // only works for 1:1 aspect ratio
    p.rectMode(p.CENTER)
    p.angleMode(p.DEGREES)

    rows = p.width / cellSize
    cols = p.height / cellSize

    // this may be why only 1:1 aspect ratio
    for (let i = 0; i < cols; i++) {
      blocks[i] = [];
      for (let j = 0; j < rows; j++){
        blocks[i][j] = new Block(p, p.createVector(cellSize/2 + i*cellSize, cellSize/2 + j*cellSize), cellSize)
      }
    }

    ball = {
      pos: p.createVector(p.width / 2, p.height / 2),
      speed: p.createVector(2, 2.5),
      size: 50,
      display: function () {
        // p.translate(this.posX, this.posY)
        p.circle(this.pos.x, this.pos.y, this.size)
        p.fill('grey')
        p.stroke('black')
        p.strokeWeight(2)
      },
      bounce: function () {
        this.pos.x += this.speed.x
        this.pos.y += this.speed.y
        if (this.pos.x > p.width - this.size/2 || this.pos.x < 0 + this.size/2) {
          this.speed.x *= -1
        }
        if (this.pos.y > p.height - this.size/2 || this.pos.y < 0 + this.size/2) {
          this.speed.y *= -1
        }
      }
    }
  }

  p.draw = () => {
    p.background('black') // clear previous draw
    // ball.display()
    // ball.bounce()

    for (const colBlocks of blocks) {
      for (const cell of colBlocks) {
        cell.display()
        cell.move()
      }
    }
  };
}, sketches)
