class Grid {
  constructor(ctx, colDim, rowDim) {
    this.ctx = ctx

    this.colDim = colDim
    this.rowDim = rowDim

    this.w = this.ctx.canvas.clientWidth / this.colDim
    this.h = this.ctx.canvas.clientHeight / this.rowDim
  }

  draw() {
    this.ctx.save()
    this.ctx.strokeStyle = GRID_LINE_COLOR;
    this.ctx.lineWidth = GRID_LINE_WIDTH

    for (let x = this.w; x < this.ctx.canvas.clientWidth; x += this.w) {
      this.ctx.moveTo(x, 1);
      this.ctx.lineTo(x, this.ctx.canvas.clientHeight);
      this.ctx.stroke();
    }

    for (let y = this.h; y < this.ctx.canvas.clientHeight; y += this.h) {
      this.ctx.moveTo(1, y);
      this.ctx.lineTo(this.ctx.canvas.clientWidth, y);
      this.ctx.stroke();
    }

    this.ctx.restore()
  }

}