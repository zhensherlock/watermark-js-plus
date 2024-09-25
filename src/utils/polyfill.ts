if (typeof CanvasRenderingContext2D !== 'undefined' && !CanvasRenderingContext2D.prototype.resetTransform) {
  CanvasRenderingContext2D.prototype.resetTransform = function () {
    this.setTransform(1, 0, 0, 1, 0, 0)
  }
}
