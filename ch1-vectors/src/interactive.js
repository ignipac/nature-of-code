import { Block } from './block'

export class InteractiveDisplay {
  constructor(p5) {
    this.p = p5
    this.blocks = [];
    this.cellSize = 10;
    this.cols = this.p.width / this.cellSize;
    this.rows = this.p.height / this.cellSize;
  }

  // add in setup
  init() {
    // why only 1:1 aspect ratio?
    for (let i = 0; i < this.cols; i++) {
      this.blocks[i] = [];
      for (let j = 0; j < this.rows; j++){
        this.blocks[i][j] = new Block(this.p, this.p.createVector(this.cellSize/2 + i*this.cellSize, this.cellSize/2 + j*this.cellSize), this.cellSize)
      }
    }
  }

  // add in draw
  render() {
    for (const colBlocks of this.blocks) {
      for (const cell of colBlocks) {
        cell.display()
        cell.move()
      }
    }
  }
}
