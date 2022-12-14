class I_Figure extends Figure {
  constructor(ctx, colDim, rowDim, isPanel, type, color) {
    super(ctx, colDim, rowDim, isPanel, type, color)

    this.color = color

    this.position = 0
    this.positions = [0, 1]

    this.create()
  }

  create() {
    for (let i = 0; i < 4; i++) {
      const square = new Square(this.ctx, this.xStart + i, this.yStart, this.w, this.h, this.color)
      this.squares.push(square)
    }
    return this.squares
  }

  setRotation() {
    this.setNextPosition()
    switch (this.position) {
      case 0:
        for (let i = 0; i < this.squares.length; i++) {
          this.squares[i].x += i === 0 ? -2 : i === 1 ? -1 : i === 2 ? 0 : 1
          this.squares[i].y += i === 0 ? 0 : i === 1 ? -1 : i === 2 ? -2 : -3
        }
        break;
      case 1:
        for (let i = 0; i < this.squares.length; i++) {
          this.squares[i].x += i === 0 ? 2 : i === 1 ? 1 : i === 2 ? 0 : -1
          this.squares[i].y += i === 0 ? 0 : i === 1 ? 1 : i === 2 ? 2 : 3
        }
        break;
    }
  }

}