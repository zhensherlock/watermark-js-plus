---
layout: doc
---

<el-backtop></el-backtop>

# 基础配置项

## width

- **Type:** `number`
- **Default:** `300`

单个水印的宽度。

## height

- **Type:** `number`
- **Default:** `300`

单个水印的高度。

## rotate

- **Type:** `number`
- **Default:** `45`

水印旋转角度。

## layout

- **Type:** `string`
- **Default:** `default`

水印布局方式。

## gridLayoutOptions

- **Type:** `Object`
- **Default:** `null`

水印Grid布局配置项。

## auxiliaryLine

- **Type:** `boolean`
- **Default:** `false`

水印辅助线可见性。

## movable

- **Type:** `boolean`
- **Default:** `false`

水印是否可移动。

## translatePlacement

- **Type:** `string`
- **available values**: `'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'right' | 'middle'`

水平方向的移动位置。

## translateX

- **Type:** `number`

水平方向的移动距离。

## translateY

- **Type:** `number`

垂直方向的移动距离。

## contentType

- **Type:** `string`
- **Default:** `'text'`
- **available values**: `'text' | 'image' | 'multi-line-text' | 'rich-text'`

水印内容类型。

## content

- **Type:** `string`
- **Default:** `'hello watermark-js-plus'`

水印内容。

## textType

- **Type:** `string`
- **Default:** `'fill'`
- **available values**: `'fill' | 'stroke'`

文本水印渲染文字的方式。方式：填充文字和绘制文字。

## textRowMaxWidth

- **Type:** `number`

文本水印单行最大宽度。

## image

- **Type:** `string`

水印图像路径。

## imageWidth

- **Type:** `number`
- **Default:** `0`

水印图像宽度。

## imageHeight

- **Type:** `number`
- **Default:** `0`

水印图像高度。

## richTextWidth

- **Type:** `number`

水印富文本宽度。

## richTextHeight

- **Type:** `number`

水印富文本高度。

## lineHeight

- **Type:** `number`
- **Default:** `30`

水印内容行高。

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

- **Type:** `string`
- **Default:** `'20px'`

水印内容的字体大小。

## fontFamily

- **Type:** `string`
- **Default:** `'sans-serif'`

水印内容的字体。

## fontStyle

- **Type:** `string`
- **Default:** `''`

水印内容的fontStyle。

## fontVariant

- **Type:** `string`
- **Default:** `''`

水印内容的fontVariant。

## textAlign

- **Type:** `string`
- **available values**: `'center' | 'end' | 'left' | 'right' | 'start'`

水印内容水平对齐方式。

## textBaseline

- **Type:** `string`
- **available values**: `'top' | 'bottom' | 'middle' | 'alphabetic' | 'hanging' | 'ideographic'`

水印内容基准线。
![textBaseline](../../public/text-baseline.png)

## fontColor

- **Type:** `string`
- **Default:** `'#000'`

水印内容字体颜色。

## globalAlpha

- **Type:** `number`
- **Default:** `0.5`

水印的透明度。

## fontWeight

- **Type:** `string`
- **Default:** `'normal'`

水印内容字体权重。

## filter

- **Type:** `string`
- **Default:** `''`

水印内容的滤镜。

## mode

- **Type:** `string`
- **Default:** `'default'`
- **available values**: `'default' | 'blind'`

水印模式。

## mutationObserve

- **Type:** `boolean`
- **Default:** `true`

启用侦听水印dom更改。

## parent

- **Type:** `Element | string`
- **Default:** `'body'`

水印的容器。

## shadowStyle

- **Type:** `Object`
- **Default:** `null`

水印的阴影样式。

## advancedStyle

- **Type:** `Object`
- **Default:** `null`

水印的渐变样式。

## extraDrawFunc

- **Type:** `Function`
- **Default:** `() => {}`

水印自定义额外绘图函数。

## onSuccess

- **Type:** `Function`
- **Default:** `() => {}`

水印添加成功的回调事件。

## onBeforeDestroy

- **Type:** `Function`
- **Default:** `() => {}`

水印删除前的回调事件。

## onDestroyed

- **Type:** `Function`
- **Default:** `() => {}`

水印删除后的回调事件。
