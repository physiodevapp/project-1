class L_Figure extends Figure {
  constructor(ctx, colDim, rowDim) {
    super(ctx, colDim, rowDim)

    this.position = 0;
    this.positions = [0, 1, 2, 3]

    this.create()
  }

  create() {
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 3; j++) {
        if (i=== 0 || j === 0) {
          const square = new Square(this.ctx, 6 + j, -1 + i, this.w, this.h)
          this.squares.push(square)
        }
      }
    }
  }

  setRotation() {
    this.goNextPosition()
    switch (this.position) {
      case 0:
        for (let i = 0; i < this.squares.length; i++) {
          this.squares[i].x += i === 0 ? -1 : i === 1 ? 0 : i === 2 ? 1 : -2
          this.squares[i].y += i === 0 ? -2 : i === 1 ? -1 : i === 2 ? 0 : -1
        }
        break;
      case 1:
        for (let i = 0; i < this.squares.length; i++) {
          this.squares[i].x += i === 0 ? 1 : i === 1 ? 0 : i === 2 ? -1 : 0
          this.squares[i].y += i === 0 ? 0 : i === 1 ? 1 : i === 2 ? 2 : -1
        }
        break;
      case 2:
        for (let i = 0; i < this.squares.length; i++) {
          this.squares[i].x += i === 0 ? 1 : i === 1 ? 0 : i === 2 ? -1 : 2
          this.squares[i].y += i === 0 ? 1 : i === 1 ? 0 : i === 2 ? -1 : 0
        }
        break;
      case 3:
        for (let i = 0; i < this.squares.length; i++) {
          this.squares[i].x += i === 0 ? -1 : i === 1 ? 0 : i === 2 ? 1 : 0
          this.squares[i].y += i === 0 ? 1 : i === 1 ? 0 : i === 2 ? -1 : 2
        }
        break;
    }
  }

}