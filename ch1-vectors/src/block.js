export class Block {
  constructor(p5, size) {
    this.p = p5
    this.posX = this.p.width/2;
    this.posY = this.p.height/2;
    this.angle = 0;
    this.size = size;
    this.maxDistance = 50;
  }

  display() {
    this.p.translate(this.posX, this.posY)
    this.p.rotate(this.angle)
    this.p.rect(0, 0, this.size, this.size)
  }

  move() {
    let distanceFromMouse = this.p.dist(this.p.mouseX, this.p.mouseY, this.posX, this.posY)
    if (distanceFromMouse < this.maxDistance) {
      this.angle += this.p.PI / 128;
    }
  }
}
