import type { WatermarkOptions } from '../../types'
import { Matrix } from '../../types'
import { generateMatrix } from '../../utils'
import { WatermarkCanvas } from '../canvas'

class GridLayout {
  private readonly options: WatermarkOptions
  private readonly partialCanvas: HTMLCanvasElement
  private readonly partialWidth: number
  private readonly partialHeight: number
  private readonly cols: number
  private readonly rows: number
  private readonly matrix: Matrix<number>
  private readonly gap: [number, number]

  constructor (args: WatermarkOptions, partialCanvas: HTMLCanvasElement) {
    this.options = args
    this.partialWidth = this.options.width
    this.partialHeight = this.options.height
    this.rows = this.options.gridLayoutOptions?.rows || 1
    this.cols = this.options.gridLayoutOptions?.cols || 1
    this.matrix = this.options.gridLayoutOptions?.matrix || generateMatrix(this.rows, this.cols, 1)
    this.gap = this.options.gridLayoutOptions?.gap || [0, 0]
    this.partialCanvas = partialCanvas
  }

  draw (): HTMLCanvasElement {
    const layoutCanvas = WatermarkCanvas.createCanvas(
      this.partialWidth * this.cols + this.gap[0] * this.cols,
      this.partialHeight * this.rows + this.gap[1] * this.rows
    )
    const layoutContext = layoutCanvas.getContext('2d')
    for (let rowIndex = 0; rowIndex < this.rows; rowIndex++) {
      for (let colIndex = 0; colIndex < this.cols; colIndex++) {
        if (!this.matrix?.[rowIndex]?.[colIndex]) {
          continue
        }
        layoutContext?.drawImage(
          this.partialCanvas,
          this.partialWidth * colIndex + this.gap[0] * colIndex,
          this.partialHeight * rowIndex + this.gap[1] * rowIndex,
          this.partialWidth,
          this.partialHeight
        )
      }
    }
    return layoutCanvas
  }
}

export {
  GridLayout
}
