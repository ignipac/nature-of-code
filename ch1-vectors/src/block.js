export class Block {
  constructor(p5, position, size) {
    this.p = p5
    this.pos = position
    this.angle = 0;
    this.size = size;
    this.maxDistance = 30; // distance of interactivity of each block
    this.c = 70 // color
    this.padding = 4
  }

  display() {
    this.p.noFill()
    this.p.stroke(this.c)
    this.p.push(); // understand why I need to push & pop?
    this.p.translate(this.pos.x, this.pos.y)
    this.p.rotate(this.angle)

    if (this.angle > 0 && this.angle < 45) {
      this.drawRect();
    } else {
      this.drawCross()
    }

    this.p.pop();
  }

  move() {
    // If the mouse is moving, check distance between mouse location and center of square
    let distanceFromMouse;
    if (this.p.pmouseX - this.p.mouseX != 0 || this.p.pmouseY - this.p.mouseY != 0) {
      distanceFromMouse = this.p.dist(this.p.mouseX, this.p.mouseY, this.pos.x, this.pos.y)
      if (distanceFromMouse < this.maxDistance) {
        this.angle += 1; //degrees
        this.c = 255;
      }
    }

    // If squares are already rotating, keep rotating until angle = 90
    if (this.angle > 0 && this.angle < 90) {
      this.angle += 1;
      if (this.c > 70) {
        this.c -= 3 // gradual fade of color to default
      }
    } else {
      this.angle = 0;
      this.c = 70;
    }
  }

  drawRect() {
    this.p.rect(0, 0, this.size - this.padding, this.size - this.padding);
  }

  drawCross() {
    let margin = -this.size / 2;
    this.p.line(margin + this.padding / 2, margin + this.padding / 2, margin + this.size - this.padding / 2, margin + this.size - this.padding / 2);
    this.p.line(margin + this.size - this.padding / 2, margin + this.padding / 2, margin + this.padding / 2, margin + this.size - this.padding / 2);
  }
}


