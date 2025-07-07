---
layout: doc
---

<el-backtop></el-backtop>

# 水印配置选项

## 基础配置

### width
- **类型:** `number`
- **默认值:** `300`
- **描述:** 单个水印单元的宽度

### height
- **类型:** `number`
- **默认值:** `300`
- **描述:** 单个水印单元的高度

### rotate
- **类型:** `number`
- **默认值:** `45`
- **描述:** 水印旋转角度(度数)

### layout
- **类型:** `string`
- **默认值:** `'default'`
- **描述:** 水印布局模式
- **可选值:** 多种布局类型(具体实现相关)

### gridLayoutOptions
- **类型:** `Object`
- **默认值:** `null`
- **描述:** 网格布局的自定义配置选项

### auxiliaryLine
- **类型:** `boolean`
- **默认值:** `false`
- **描述:** 是否显示辅助定位线

## 定位与移动

### translatePlacement
- **类型:** `string`
- **默认值:** `'middle'`
- **可选值:**
  - `'top'`, `'top-start'`, `'top-end'`
  - `'bottom'`, `'bottom-start'`, `'bottom-end'`
  - `'left'`, `'right'`, `'middle'`
- **描述:** 平移变换的基础位置

### translateX
- **类型:** `number`
- **描述:** 水平移动距离(正数=向右，负数=向左)

### translateY
- **类型:** `number`
- **描述:** 垂直移动距离(正数=向下，负数=向上)

### movable
- **类型:** `boolean`
- **默认值:** `false`
- **描述:** 水印是否可交互移动

### zIndex
- **类型:** `number`
- **默认值:** `2147483647`
- **描述:** 控制图层叠放的CSS z-index属性

### parent
- **类型:** `Element | string`
- **默认值:** `'body'`
- **描述:** 水印的容器元素(选择器或DOM元素)

## 内容配置

### contentType
- **类型:** `string`
- **默认值:** `'text'`
- **可选值:**
  - `'text'`: 简单文本水印
  - `'image'`: 图片水印
  - `'multi-line-text'`: 多行文本
  - `'rich-text'`: 格式化富文本
- **描述:** 水印内容的显示类型

### content
- **类型:** `string`
- **默认值:** `'hello watermark-js-plus'`
- **描述:** 要显示的实际内容(文本或图片URL)

### textType
- **类型:** `string`
- **默认值:** `'fill'`
- **可选值:** `'fill'` | `'stroke'`
- **描述:** 文本内容的渲染方式

## 文本样式

### fontSize
- **类型:** `string`
- **默认值:** `'20px'`
- **描述:** 文本内容的字体大小

### fontFamily
- **类型:** `string`
- **默认值:** `'sans-serif'`
- **描述:** 文本内容的字体家族

### fontStyle
- **类型:** `string`
- **默认值:** `''`
- **描述:** 字体样式(如'italic')

### fontVariant
- **类型:** `string`
- **默认值:** `''`
- **描述:** 字体变体(如'small-caps')

### fontWeight
- **类型:** `string`
- **默认值:** `'normal'`
- **描述:** 字体粗细(如'bold')

### fontColor
- **类型:** `string`
- **默认值:** `'#000'`
- **描述:** 文本颜色

### textAlign
- **类型:** `string`
- **可选值:** `'center'`, `'end'`, `'left'`, `'right'`, `'start'`
- **描述:** 文本水平对齐方式

### textBaseline
- **类型:** `string`
- **可选值:**
  - `'top'`, `'bottom'`, `'middle'`
  - `'alphabetic'`, `'hanging'`, `'ideographic'`
- **描述:** 文本垂直对齐基线
  ![textBaseline](../public/text-baseline.png)

### lineHeight
- **类型:** `number`
- **默认值:** `30`
- **描述:** 多行文本的行高

### textRowMaxWidth
- **类型:** `number`
- **描述:** 文本行自动换前的最大宽度

### letterSpacing
- **类型:** `string`
- **默认值:** `'0px'`
- **描述:** 字符间距

### wordSpacing
- **类型:** `string`
- **默认值:** `'0px'`
- **描述:** 单词间距

## 图片配置

### image
- **类型:** `string`
- **描述:** 用作水印的图片URL(当contentType = 'image'时)

### imageWidth
- **类型:** `number`
- **默认值:** `0`
- **描述:** 图片显示宽度(0表示自然宽度)

### imageHeight
- **类型:** `number`
- **默认值:** `0`
- **描述:** 图片显示高度(0表示自然高度)

## 富文本配置

### richTextWidth
- **类型:** `number`
- **描述:** 富文本内容的宽度限制

### richTextHeight
- **类型:** `number`
- **描述:** 富文本内容的高度限制

## 视觉效果

### globalAlpha
- **类型:** `number`
- **默认值:** `0.5`
- **描述:** 水印的整体透明度(0.0到1.0)

### filter
- **类型:** `string`
- **默认值:** `'none'`
- **描述:** 要应用的CSS滤镜效果

### shadowStyle
- **类型:** `Object`
- **默认值:** `null`
- **描述:** 阴影配置对象(颜色、模糊、偏移)

### advancedStyle
- **类型:** `Object`
- **默认值:** `null`
- **描述:** 高级样式如渐变等

### backgroundPosition
- **类型:** `string`
- **默认值:** `'0 0'`
- **描述:** CSS background-position属性

### backgroundRepeat
- **类型:** `string`
- **默认值:** `'repeat'`
- **描述:** CSS background-repeat属性

## 行为与安全

### mode
- **类型:** `string`
- **默认值:** `'default'`
- **可选值:** `'default'` | `'blind'`
- **描述:** 水印显示模式

### mutationObserve
- **类型:** `boolean`
- **默认值:** `true`
- **描述:** 是否监控DOM的未授权更改

### monitorProtection
- **类型:** `boolean`
- **默认值:** `false`
- **描述:** 启用对MutationObserver和requestAnimationFrame篡改的保护
- **重要:** 一旦启用，此保护无法禁用

## 回调函数

### extraDrawFunc
- **类型:** `Function`
- **默认值:** `() => {}`
- **描述:** 额外绘图操作的回调函数

### onSuccess
- **类型:** `Function`
- **默认值:** `() => {}`
- **描述:** 水印成功应用时调用

### onBeforeDestroy
- **类型:** `Function`
- **默认值:** `() => {}`
- **描述:** 水印移除前调用

### onDestroyed
- **类型:** `Function`
- **默认值:** `() => {}`
- **描述:** 水印移除后调用

### onObserveError
- **类型:** `Function`
- **默认值:** `() => {}`
- **描述:** 当DOM变化观察失败时调用
