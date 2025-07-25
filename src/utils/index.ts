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

export const createSVGElement = (
  tagName: string,
  attrs: { [key: string]: string } = {},
  namespaceURI = 'http://www.w3.org/2000/svg',
): Element => {
  const element = document.createElementNS(namespaceURI, tagName)
  for (const attr in attrs) {
    element.setAttribute(attr, attrs[attr])
  }
  return element
}

export const getMultiLineData = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number) => {
  const result = []
  let str = ''
  let word = ''
  for (let i = 0, len = text.length; i < len; i++) {
    word = text.charAt(i)
    if (word === '\n') {
      result.push(str)
      str = ''
      continue
    }
    str += word
    if (ctx.measureText(str).width > maxWidth) {
      result.push(str.substring(0, str.length - 1))
      str = ''
      i--
    }
  }
  result.push(str)
  return result
}

export const createCustomContentSVG = async (
  ctx: CanvasRenderingContext2D,
  options: WatermarkOptions,
): Promise<CustomContentSVGType> => {
  const svgElement = createSVGElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
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
  bodyElement.innerHTML = `<div class='rich-text-content'>${options.content}</div>`
  document.body.appendChild(bodyElement)
  // convert all images to base64
  await convertImgToBase64(bodyElement)
  const rect = bodyElement.querySelector('.rich-text-content')?.getBoundingClientRect()
  const rectWidth = rect?.width
  const rectHeight = rect?.height
  document.body.removeChild(bodyElement)
  const width = options.richTextWidth || rectWidth || options.width
  const height = options.richTextHeight || rectHeight || options.height
  svgElement.setAttribute('width', width.toString())
  svgElement.setAttribute('height', height.toString())
  const foreignObjectElement = createSVGElement('foreignObject', {
    width: width.toString(),
    height: height.toString(),
  })
  foreignObjectElement.appendChild(bodyElement)
  svgElement.appendChild(foreignObjectElement)
  return {
    element: svgElement,
    width,
    height,
  }
}

async function convertImgToBase64(bodyElement: HTMLElement) {
  const imgElements = bodyElement.querySelectorAll('img')

  for (const img of Array.from(imgElements)) {
    const src = img.getAttribute('src')
    if (src) {
      try {
        const response = await fetch(src)
        const blob = await response.blob()
        const imgData = await new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsDataURL(blob)
        })
        if (isString(imgData)) {
          img.setAttribute('src', imgData as string)
        }
      } catch (error) {
        console.error(`Error converting ${src} to base64:`, error)
      }
    }
  }
}

export const convertSVGToImage = (svg: Element): string => {
  const richContent = svg.outerHTML
    .replace(/<(img|br|input|hr|embed)(.*?)>/g, '<$1$2/>')
    .replace(/\n/g, '')
    .replace(/\t/g, '')
    .replace(/#/g, '%23')
  return `data:image/svg+xml;charset=utf-8,${richContent}`
}

export const getValue = (v1: any, v2: any) => {
  if (isUndefined(v1)) {
    return v2
  } else {
    return v1
  }
}

export const loadImage = (
  url: string,
  width: number | undefined = undefined,
  height: number | undefined = undefined,
): Promise<HTMLImageElement> => {
  const image = new Image()
  image.setAttribute('crossOrigin', 'anonymous')
  !isUndefined(width) && (image.width = <number>width)
  !isUndefined(height) && (image.height = <number>height)
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

export const generateAnimationStyle = (movable: boolean, backgroundRepeat: string) => {
  if (!movable) {
    return ''
  }
  const horizontalDuration = Math.random() * (8 - 2) + 2
  const verticalDuration = Math.random() * (4 - 2) + 2
  switch (backgroundRepeat) {
    case 'repeat':
      return 'animation: 200s linear 0s infinite alternate watermark !important;'
    case 'repeat-x':
      return `animation: ${horizontalDuration}s linear 0s infinite alternate watermark-vertical !important;'`
    case 'repeat-y':
      return `animation: ${verticalDuration}s linear 0s infinite alternate watermark-horizontal !important;'`
    case 'no-repeat':
      return `animation: ${horizontalDuration}s linear 0s infinite alternate watermark-horizontal, ${verticalDuration}s linear 0s infinite alternate watermark-vertical !important;`
    default:
      return ''
  }
}
