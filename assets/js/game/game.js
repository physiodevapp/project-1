class Game {
  constructor(canvas, colDim, rowDim) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')

    this.colDim = colDim
    this.rowDim = rowDim

    this.intervalId = null

    this.dropVel = 60
    this.drop = 0

    this.newFigures = []

    this.isIntervalPaused = false

    this.random = new Random()

  }

  load() {
    this.initData()
    this.initGrid()
    this.initInteractions()
    this.initPanels()
  }

  openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  }

  exitFullScreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    }
  }


  initPanels() {
    const infoPanel = document.getElementById('info-panel')
    infoPanel.style.height = `${this.canvas.parentElement.offsetHeight}px`
    infoPanel.style.width = `${this.canvas.clientWidth * 0.5}px`

    this.score = new Score()
    this.score.render()

    this.panelFigure = new PanelFigure()
    this.panelFigure.render(
      this.newFigures[this.newFigures.length - 1].type,
      this.newFigures[this.newFigures.length - 1].color
    )
  }

  initInteractions() {
    document.onfullscreenchange = (ev) => {
      if (!document.fullscreenElement) {
        console.log('exit using esc')
        document.getElementById('start-stop-btn').innerHTML = 'RESUME'
        this.stop()
      }
    }

    document.getElementById('start-stop-btn').onclick = (ev) => {
      switch (ev.target.innerHTML) {
        case 'PLAY':
        case 'RESUME':
          // this.openFullscreen(this.canvas.parentElement.parentElement)
          ev.target.innerHTML = 'PAUSE'
          this.play();
          break;
        case 'PAUSE':
          this.exitFullScreen()
          ev.target.innerHTML = 'RESUME'
          this.stop();
          break;
        case 'RESTART':
          ev.target.innerHTML = 'PAUSE'
          this.restart();
          break;
      }
    }

    document.body.onkeydown = (ev) => {
      if (!this.intervalId) {
        return null
      }
      let action = null;
      switch (ev.keyCode) {
        case 39:
          action = 'right'
          break;
        case 37:
          action = 'left'
          break;
        case 38:
          action = 'rotate'
          break;
        case 40:
          action = 'down'
          break;
      }

      if (action) {
        this.moveFigure(action)
      }
    }
  }

  initData() {
    this.matrix = new Matrix(this.colDim, this.rowDim)
    this.addNewFigure()
  }

  initGrid() {
    this.grid = new Grid(canvas.parentElement.firstElementChild.getContext('2d'), this.colDim, this.rowDim)
    this.grid.draw()
  }

  isGameover() {
    return !this.figure.squares.every((square) => square.y >= 0) &&
      !this.matrix.canSet(this.figure, 'down')
  }

  play() {
    this.intervalId = setInterval(() => {
      if (this.drop++ >= this.dropVel && !this.isIntervalPaused) {
        this.drop = 0
        this.nextFigure()
      }
    }, 1000 / 60)
  }

  stop() {
    clearInterval(this.intervalId)
    this.intervalId = null
  }

  end() {
    this.stop()
    document.getElementById('start-stop-btn').innerHTML = 'RESTART'
  }

  restart() {
    this.clear()
    this.initData()
    this.play()
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight);
  }

  draw() {
    this.figure.draw()
    this.matrix.draw()
  }

  moveFigure(action = '') {
    if (this.isIntervalPaused) {
      return null
    }

    if (this.matrix.canSet(this.figure, action)) {
      if (action === 'down') {
        this.score.total++
        this.score.render()
      }

      if (action === 'rotate') {
        this.figure.setRotation()
      } else {
        this.figure.setTranslation(action)
      }
    }

    this.render() // permite dibujar hasta la parte de la figura que quepa, auqneu vaya a terminarse la partida

    if (this.isGameover()) {
      this.end()
      return null
    } 

    if (this.matrix.isBlocked(this.figure) && this.matrix.canFreeze()) {
      this.matrix.isChecked = true
      this.isIntervalPaused = true
      this.matrix.freeze(this.figure).then((linePacks) => {
        this.score.linesToScore(linePacks)
        this.score.render()
        this.isIntervalPaused = false
      })
    }
  }

  render() {
    this.clear()
    this.draw()
  }

  nextFigure() {
    if (!this.matrix.canSet(this.figure, 'down')) {
      this.frozenFigure = this.figure
      this.addNewFigure() // para que no tenga que esperar a completarse el 'freeze()'
      if (this.matrix.canFreeze()) {
        this.isIntervalPaused = true
        this.matrix.freeze(this.frozenFigure).then((linePacks) => {
          this.score.linesToScore(linePacks)
          this.score.render()
          this.isIntervalPaused = false

          this.moveFigure()
        })
      } else {
        this.moveFigure()
      }
      this.matrix.isChecked = false
    } else {
      this.moveFigure()
    }
  }

  addNewFigure() {
    while (this.newFigures.length < 2) {
      this.newFigures.push(this.random.getFigure(this.ctx, this.colDim, this.rowDim))
    }
    this.figure = this.newFigures[0]
    this.newFigures.shift()

    if (this.panelFigure) {
      this.panelFigure.render(
        this.newFigures[this.newFigures.length - 1].type,
        this.newFigures[this.newFigures.length - 1].color
      )
    }
  }

}