import { WatermarkOptions } from '../types'

export const convertImage = (canvas: HTMLCanvasElement): string => {
  return canvas.toDataURL('image/png', 1)
}

export const isFunction = (value: Function): boolean => {
  return typeof value === 'function'
}

export const isUndefined = (value: any): boolean => {
  return value === undefined
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

export const createCustomContentSVG = (ctx: CanvasRenderingContext2D, options: WatermarkOptions): Element => {
  const svgElement = createSVGElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg'
  })
  const foreignObjectElement = createSVGElement('foreignObject', {
    width: options.width.toString(),
    height: options.height.toString()
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
  bodyElement.innerHTML = options.content
  foreignObjectElement.appendChild(bodyElement)
  svgElement.appendChild(foreignObjectElement)
  return svgElement
}

export const convertSVGToImage = (svg: Element): string => {
  const richContent = svg.outerHTML.replace(/\n/g, '').replace(/\t/g, '').replace(/#/g, '%23')
  return `data:image/svg+xml;charset=utf-8,${richContent}`
}
