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

export {
  renderLayout
}
