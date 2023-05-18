import type { CustomContentSVGType, WatermarkOptions } from '../types'

export const convertImage = (canvas: HTMLCanvasElement): string => {
  return canvas.toDataURL('image/png', 1)
}

export const isFunction = (value: Function): boolean => {
  return typeof value === 'function'
}

export const isUndefined = (value: any): boolean => {
  return value === undefined
}

export const isString = (value: any): boolean => {
  return typeof value === 'string'
}

export const createSVGElement = (tagName: string, attrs: {[key: string]: string} = {}, namespaceURI = 'http://www.w3.org/2000/svg'): Element => {
  const element = document.createElementNS(namespaceURI, tagName)
  for (const attr in attrs) {
    element.setAttribute(attr, attrs[attr])
  }
  return element
}

export const getMultiLineData = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number) => {
  const result = []
  let str = ''
  for (let i = 0, len = text.length; i < len; i++) {
    str += text.charAt(i)
    if (ctx.measureText(str).width > maxWidth) {
      result.push(str.substring(0, str.length - 1))
      str = ''
      i--
    }
  }
  result.push(str)
  return result
}

export const createCustomContentSVG = (ctx: CanvasRenderingContext2D, options: WatermarkOptions): CustomContentSVGType => {
  const svgElement = createSVGElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg'
  })
  const bodyElement = document.createElement('div')
  bodyElement.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml')
  bodyElement.style.cssText = `
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font: ${ctx.font};
  color: ${options.fontColor};
`
  bodyElement.innerHTML = `<div class="rich-text-content">${options.content}</div>`
  document.body.appendChild(bodyElement)
  const { offsetHeight, offsetWidth } = <HTMLElement>bodyElement.querySelector('.rich-text-content')
  document.body.removeChild(bodyElement)
  const width = options.richTextWidth || offsetWidth || options.width
  const height = options.richTextHeight || offsetHeight || options.height
  const foreignObjectElement = createSVGElement('foreignObject', {
    width: width.toString(),
    height: height.toString()
  })
  foreignObjectElement.appendChild(bodyElement)
  svgElement.appendChild(foreignObjectElement)
  return {
    element: svgElement,
    width,
    height
  }
}

export const convertSVGToImage = (svg: Element): string => {
  const richContent = svg.outerHTML.replace(/\n/g, '').replace(/\t/g, '').replace(/#/g, '%23')
  return `data:image/svg+xml;charset=utf-8,${richContent}`
}

export const getValue = (v1: any, v2: any) => {
  if (isUndefined(v1)) {
    return v2
  } else {
    return v1
  }
}

export const loadImage = (url: string, width: number | undefined = undefined, height: number | undefined = undefined): Promise<HTMLImageElement> => {
  const image = new Image()
  image.setAttribute('crossOrigin', 'Anonymous')
  !isUndefined(width) && (image.width = <number> width)
  !isUndefined(height) && (image.height = <number> height)
  image.src = url
  return new Promise(resolve => {
    image.onload = () => {
      resolve(image)
    }
  })
}

export const generateMatrix = (rows: number, columns: number, value: any) => {
  return Array.from({ length: rows }, () => new Array(columns).fill(value))
}
