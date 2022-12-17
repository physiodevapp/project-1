class Square {
  constructor(ctx, col, row, w, h) {
    this.ctx = ctx

    // this.col = col
    // this.row = row

    this.w = w
    this.h = h

    // this.x = this.colToX()
    // this.y = this.rowToY()
    this.x = col
    this.y = row

    this.ay = 0
    this.vy = this.h
  }

  draw() {
    // console.log('draw')
    this.ctx.save()
    this.ctx.fillStyle = 'red'
    this.ctx.fillRect(this.colToX(), this.rowToY(), this.w, this.h)
    this.ctx.restore()
  }

  set(action) {
    switch (action) {
      case 'rotate':
        break;
      case 'left':
        this.x -= 1
        break;
      case 'right':
        this.x += 1
        break;
      case 'down':
      default:
        this.y += 1
        break;
    }
  }

  setDown() {
    this.y += 1
  }

  setLeftRight(leftRight) {
    switch (leftRight) {
      case 'right':
        this.x += 1
        break;
      case 'left':
        this.x -= 1
        break;
    }
  }

  colToX() {
    return this.x * this.w
  }

  rowToY() {
    return this.y * this.h
  }

}