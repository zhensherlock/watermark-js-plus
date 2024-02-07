---
layout: doc
---

<el-backtop></el-backtop>

# Basic Config

## width

- **Type:** `number`
- **Default:** `300`

A unit of width for a single watermark.

## height

- **Type:** `number`
- **Default:** `300`

A unit of height for a single watermark.

## rotate

- **Type:** `number`
- **Default:** `45`

Watermark rotation angle.

## layout

- **Type:** `string`
- **Default:** `default`

Watermark layout mode.

## gridLayoutOptions

- **Type:** `Object`
- **Default:** `null`

Watermark grid layout options.

## auxiliaryLine

- **Type:** `boolean`
- **Default:** `false`

Watermark auxiliary line visible.

## movable

- **Type:** `boolean`
- **Default:** `false`

Watermark movable.

## translatePlacement

- **Type:** `string`
- **available values**: `'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'right' | 'middle'`

Translation transformation to the current matrix by moving the canvas and its origin x units horizontally and y units vertically on the grid.

## translateX

- **Type:** `number`

Distance to move in the horizontal direction. Positive values are to the right, and negative to the left.

## translateY

- **Type:** `number`

Distance to move in the vertical direction. Positive values are down, and negative are up.

## contentType

- **Type:** `string`
- **Default:** `'text'`
- **available values**: `'text' | 'image' | 'multi-line-text' | 'rich-text'`

Type of watermark content.

## content

- **Type:** `string`
- **Default:** `'hello watermark-js-plus'`

Watermark content.

## textType

- **Type:** `string`
- **Default:** `'fill'`
- **available values**: `'fill' | 'stroke'`

Watermark text type.

## textRowMaxWidth

- **Type:** `number`

Watermark text row max width.

## image

- **Type:** `string`

Watermark image url.

## imageWidth

- **Type:** `number`
- **Default:** `0`

Watermark image width.

## imageHeight

- **Type:** `number`
- **Default:** `0`

Watermark image height.

## richTextWidth

- **Type:** `number`

Watermark rich text width.

## richTextHeight

- **Type:** `number`

Watermark rich text height.

## lineHeight

- **Type:** `number`
- **Default:** `30`

Watermark content line high.

## zIndex

- **Type:** `number`
- **Default:** `2147483647`

z-index

## backgroundPosition

- **Type:** `string`
- **Default:** `'0 0, 0 0'`

background-position

## backgroundRepeat

- **Type:** `string`
- **Default:** `'repeat'`

background-repeat

## fontSize

- **Type:** `string`
- **Default:** `'20px'`

The font size of the watermark content.

## fontFamily

- **Type:** `string`
- **Default:** `'sans-serif'`

The font family of the watermark content.

## fontStyle

- **Type:** `string`
- **Default:** `''`

The font style of the watermark content.

## fontVariant

- **Type:** `string`
- **Default:** `''`

The font variant of the watermark content.

## textAlign

- **Type:** `string`
- **available values**: `'center' | 'end' | 'left' | 'right' | 'start'`

Watermark content horizontal alignment.

## textBaseline

- **Type:** `string`
- **available values**: `'top' | 'bottom' | 'middle' | 'alphabetic' | 'hanging' | 'ideographic'`

Watermark content baseline.
![textBaseline](../public/text-baseline.png)

## fontColor

- **Type:** `string`
- **Default:** `'#000'`

Watermark content font color.

## globalAlpha

- **Type:** `number`
- **Default:** `0.5`

Transparency of watermark.

## fontWeight

- **Type:** `string`
- **Default:** `'normal'`

Watermark content font weight.

## filter

- **Type:** `string`
- **Default:** `''`

The filter of the watermark content.

## letterSpacing

- **Type:** `string`
- **Default:** `'0px'`

The letterSpacing property of the Canvas API specifies the spacing between letters when drawing text.

## mode

- **Type:** `string`
- **Default:** `'default'`
- **available values**: `'default' | 'blind'`

Watermark mode

## mutationObserve

- **Type:** `boolean`
- **Default:** `true`

Enable listening for watermark dom changes.

## parent

- **Type:** `Element | string`
- **Default:** `'body'`

Watermarking container.

## shadowStyle

- **Type:** `Object`
- **Default:** `null`

The shadow style of the watermark content.

## advancedStyle

- **Type:** `Object`
- **Default:** `null`

The gradient style of the watermark content.

## extraDrawFunc

- **Type:** `Function`
- **Default:** `() => {}`

Watermark extra draw callback event.

## onSuccess

- **Type:** `Function`
- **Default:** `() => {}`

Watermark added successful callback event.

## onBeforeDestroy

- **Type:** `Function`
- **Default:** `() => {}`

Watermark delete before callback event.

## onDestroyed

- **Type:** `Function`
- **Default:** `() => {}`

Watermark deleted after callback event.
