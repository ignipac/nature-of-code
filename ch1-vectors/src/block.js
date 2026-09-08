export class Block {
  constructor(p5, position, size) {
    this.p = p5
    this.pos = position
    this.angle = 0;
    this.size = size;
    this.maxDistance = 50;
  }

  display() {
    this.p.push(); // understand why I need to push & pop?
    this.p.translate(this.pos.x, this.pos.y)
    this.p.rotate(this.angle)
    this.p.rect(0, 0, this.size, this.size)
    this.p.pop();
  }

  move() {
    let distanceFromMouse = this.p.dist(this.p.mouseX, this.p.mouseY, this.pos.x, this.pos.y)
    if (distanceFromMouse < this.maxDistance) {
      this.angle += 1; //degrees
    }
  }
}
