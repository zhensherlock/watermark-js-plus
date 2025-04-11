import { GridLayout } from './grid'
import type { WatermarkOptions } from '../../types'

const renderLayout = (options: WatermarkOptions, partialCanvas: HTMLCanvasElement) => {
  switch (options.layout) {
    case 'grid':
      return new GridLayout(options, partialCanvas).draw()
    default:
      return partialCanvas
  }
}

const generateBackgroundSize = (options: WatermarkOptions) => {
  switch (options.layout) {
    case 'grid': {
      const cols = options.gridLayoutOptions?.cols || 1
      const rows = options.gridLayoutOptions?.rows || 1
      const gap = options.gridLayoutOptions?.gap || [0, 0]
      return [options.width * cols + gap[0] * cols, options.height * rows + gap[1] * rows]
    }
    default:
      return [options.width, options.height]
  }
}

export { renderLayout, generateBackgroundSize }
