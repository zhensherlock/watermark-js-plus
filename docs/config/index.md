---
layout: doc
---
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

Watermark rotation Angle.

## translatePlacement

- **Type:** `string`
- **Default:** `'text'`
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

## imageWidth

- **Type:** `number`
- **Default:** `0`

Watermark image width.

## imageHeight

- **Type:** `number`
- **Default:** `0`

Watermark image height.

## lineHeight

- **Type:** `number`
- **Default:** `30`

Watermark content line high.

## zIndex

- **Type:** `number`
- **Default:** `10000`

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

- **Type:** `number`
- **Default:** `20`

The font size of the watermark content.

## fontFamily

- **Type:** `string`
- **Default:** `'sans-serif'`

The font family of the watermark content.

## textAlign

- **Type:** `string`
- **Default:** `'center'`
- **available values**: `'center' | 'left' | 'right'`

Watermark content horizontal alignment.

## textBaseline

- **Type:** `string`
- **Default:** `'middle'`
- **available values**: `'top' | 'bottom' | 'middle'`

Watermark content baseline.

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

## mode

- **Type:** `string`
- **Default:** `'default'`
- **available values**: `'default' | 'blind'`

Watermark mode

## mutationObserve

- **Type:** `boolean`
- **Default:** `true`

Enable listening for watermark dom changes.

## unique

- **Type:** `boolean`
- **Default:** `true`

The watermark cannot be added repeatedly.

## parent

- **Type:** `Element | string`
- **Default:** `'body'`

Watermarking container.

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
