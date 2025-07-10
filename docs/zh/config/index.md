---
layout: doc
---

<el-backtop></el-backtop>

# 水印配置选项

## 基础配置

### width
- **类型**: `number`
- **默认值**: `300`
- **描述**: 单个水印单元的宽度

### height
- **类型**: `number`
- **默认值**: `300`
- **描述**: 单个水印单元的高度

### rotate
- **类型**: `number`
- **默认值**: `45`
- **描述**: 水印旋转角度(度数)

### layout
- **类型**: `string`
- **默认值**: `'default'`
- **描述**: 控制水印元素的排列方式
- **可选值及说明**:
  - `'default'` (默认模式)
    * 基础布局，配置简单
    * 适用于常规场景
  - `'grid'` (网格布局)
    * 将水印按矩阵网格形式排列
    * 需配合 `gridLayoutOptions` 配置
    * 典型应用场景：生成规律排列的水印背景

### gridLayoutOptions
- **类型**: `GridLayoutOptions`
- **默认值**: `null`
- **描述**: 网格布局的自定义配置项
- **配置属性**:
  - `cols`: 列数（默认 `1`）
  - `rows`: 行数（默认 `1`）
  - `gap`: 间距配置，格式为 `[水平间距, 垂直间距]`（默认 `[0, 0]`）
  - `matrix`: 二维矩阵，控制每个网格位是否显示水印（默认全 `1` 矩阵）
  - `backgroundImage`: 可选背景图（覆盖整个网格区域）
  - `width`: 可选总宽度（覆盖自动计算的列/间距宽度）
  - `height`: 可选总高度（覆盖自动计算的行/间距高度）

### auxiliaryLine
- **类型**: `boolean`
- **默认值**: `false`
- **描述**: 是否显示辅助定位线

## 定位与移动

### translatePlacement
- **类型**: `TranslatePlacementType`
- **默认值**: `'middle'`
- **可选值**:
  - `'top'`: 顶部居中
  - `'top-start'`: 顶部居左
  - `'top-end'`: 顶部居右
  - `'bottom'`: 底部居中
  - `'bottom-start'`: 底部居左
  - `'bottom-end'`: 底部居右
  - `'left'`: 左侧居中
  - `'right'`: 右侧居中
  - `'middle'`: 正中心（默认值）
- **功能说明**:
  - 决定水印的基础定位和旋转变换的基准点
  - 会影响高级样式中的渐变计算
  - 当未显式设置时，会自动调整文本对齐方式和基线
  - 与 `translateX` 和 `translateY` 配合实现精确定位
- **注意事项**:
  - 当结合旋转使用时，该定位点将成为旋转中心
  - 对于文本水印，该参数还会影响文本基线的计算

### translateX
- **类型**: `number`
- **默认值**: 自动计算（根据`translatePlacement`和`width`）
- **描述**:
  - 水平偏移量（单位：像素）
  - 正值 → 向右移动 | 负值 ← 向左移动
  - 会覆盖`translatePlacement`的水平定位
  - 作为旋转中心点的X坐标
  - 影响线性渐变/径向渐变的起始点计算

### translateY
- **类型**: `number`
- **默认值**: 自动计算（根据`translatePlacement`和`height`）
- **描述**:
  - 垂直偏移量（单位：像素）
  - 正值 ↓ 向下移动 | 负值 ↑ 向上移动
  - 会覆盖`translatePlacement`的垂直定位
  - 作为旋转中心点的Y坐标
  - 影响文本基线(`textBaseline`)的自动计算

### movable（动画）
- **类型**: `boolean`
- **默认值**: `false`
- **功能描述**:
  启用后，水印将产生符合物理规律的动画运动效果，在容器边界内呈现自然的往复运动轨迹。  
  具体模式取决于`backgroundRepeat`配置：  
  • `repeat`: 二维平面浮动（200秒周期）  
  • `repeat-x`: 水平往返运动（2-8秒随机周期）  
  • `repeat-y`: 垂直往返运动（2-4秒随机周期）  
  • `no-repeat`: 双轴复合运动。水印节点会在父元素内模拟碰撞反弹运动。
- **示例**:
  - [StackBlitz](https://stackblitz.com/edit/webpack-webpack-js-org-wq26h43z)
  - [Demo](../guide/watermark.html#child-element-watermark)
- **运动特性**:
  - 智能速度调节（水平2-8秒/周期，垂直2-4秒/周期）
  - 边界感知的自动转向
  - 动量保持的平滑过渡（`alternate`动画模式）
- **技术说明**:
  - 通过CSS `animation` 高性能实现
  - 运动幅度随容器尺寸自适应

### zIndex
- **类型**: `number`
- **默认值**: `2147483647`
- **描述**: 控制图层叠放的CSS z-index属性

### parent
- **类型**: `Element | string`
- **默认值**: `'body'`
- **描述**: 水印的容器元素(选择器或DOM元素)

## 内容配置

### contentType
- **类型**: `string`
- **默认值**: `'text'`
- **可选值**:
  - `'text'`: 简单文本水印
  - `'image'`: 图片水印
  - `'multi-line-text'`: 多行文本水印
  - `'rich-text'`: 格式化富文本水印
- **描述**: 水印内容的显示类型

### content
- **类型**: `string`
- **默认值**: `'hello watermark-js-plus'`
- **描述**: 要显示的实际内容(文本或图片URL)

### textType
- **类型**: `string`
- **默认值**: `'fill'`
- **可选值**: `'fill'` | `'stroke'`
- **描述**: 文本内容的渲染方式

## 文本样式

### fontSize
- **类型**: `string`
- **默认值**: `'20px'`
- **描述**: 文本内容的字体大小

### fontFamily
- **类型**: `string`
- **默认值**: `'sans-serif'`
- **描述**: 文本内容的字体家族

### fontStyle
- **类型**: `string`
- **默认值**: `''`
- **描述**: 字体样式(如'italic')

### fontVariant
- **类型**: `string`
- **默认值**: `''`
- **描述**: 字体变体(如'small-caps')

### fontWeight
- **类型**: `string`
- **默认值**: `'normal'`
- **描述**: 字体粗细(如'bold')

### fontColor
- **类型**: `string`
- **默认值**: `'#000'`
- **描述**: 文本颜色

### textAlign
- **类型**: `string`
- **可选值**: `'center'`, `'end'`, `'left'`, `'right'`, `'start'`
- **描述**: 文本水平对齐方式

### textBaseline
- **类型**: `string`
- **可选值**:
  - `'top'`, `'bottom'`, `'middle'`
  - `'alphabetic'`, `'hanging'`, `'ideographic'`
- **描述**: 文本垂直对齐基线
  ![textBaseline](../../public/text-baseline.png)

### lineHeight
- **类型**: `number`
- **默认值**: `30`
- **描述**: 多行文本的行高

### textRowMaxWidth
- **类型**: `number`
- **描述**: 文本行自动换前的最大宽度

### letterSpacing
- **类型**: `string`
- **默认值**: `'0px'`
- **描述**: 字符间距

### wordSpacing
- **类型**: `string`
- **默认值**: `'0px'`
- **描述**: 单词间距

## 图片配置

### image
- **类型**: `string`
- **描述**: 用作水印的图片URL(当contentType = 'image'时)

### imageWidth
- **类型**: `number`
- **默认值**: `0`
- **描述**: 图片显示宽度(0表示自然宽度)

### imageHeight
- **类型**: `number`
- **默认值**: `0`
- **描述**: 图片显示高度(0表示自然高度)

## 富文本配置

### richTextWidth
- **类型**: `number`
- **描述**: 富文本内容的宽度限制

### richTextHeight
- **类型**: `number`
- **描述**: 富文本内容的高度限制

## 视觉效果

### globalAlpha
- **类型**: `number`
- **默认值**: `0.5`
- **描述**: 水印的整体透明度(0.0到1.0)

### filter
- **类型**: `string`
- **默认值**: `'none'`
- **描述**: 应用与 CSS 类似的滤镜效果。该值是一个字符串，可包含以下一种或多种滤镜函数：
  - `url()`: 引用外部 SVG 滤镜（如 `url(#custom-filter)`）
  - `blur(<length>)`: 应用高斯模糊 (如 `blur(5px)`)
  - `brightness(<percentage>)`: 调整亮度 (如 `brightness(150%)`)
  - `contrast(<percentage>)`: 调整对比度 (如 `contrast(75%)`)
  - `drop-shadow(<offset-x> <offset-y> <blur-radius> <color>)`: 添加投影 (如 `drop-shadow(4px 4px 8px blue)`)
  - `grayscale(<percentage>)`: 转换为灰度 (如 `grayscale(100%)`)
  - `hue-rotate(<angle>)`: 调整色相旋转 (如 `hue-rotate(90deg)`)
  - `invert(<percentage>)`: 颜色反转 (如 `invert(50%)`)
  - `opacity(<percentage>)`: 调整透明度 (如 `opacity(25%)`)
  - `saturate(<percentage>)`: 调整饱和度 (如 `saturate(200%)`)
  - `sepia(<percentage>)`: 应用深褐色调 (如 `sepia(80%)`)

多个滤镜可通过空格组合使用 (如 `brightness(120%) contrast(110%)`)。 默认值  `'none'` 表示不应用任何滤镜效果。

### shadowStyle
- **类型**: `CanvasShadowStyles`
- **默认值**: `null`
- **配置属性**:
  - `shadowColor`: `string`  
    阴影颜色（支持所有CSS颜色格式）
  - `shadowBlur`: `number`  
    模糊级别（单位：像素，0=无模糊）
  - `shadowOffsetX`: `number`  
    水平偏移量（单位：像素，正值=右偏移）
  - `shadowOffsetY`: `number`  
    垂直偏移量（单位：像素，正值=下偏移）
- **功能说明**:
  为水印添加Canvas标准的阴影效果，特性包括：
  - 支持透明色（alpha通道）
  - 偏移量不受`rotate`和`translate`影响
  - 与`globalAlpha`参数叠加作用
- **注意事项**:
  - 需要同时设置`shadowColor`才会生效
  - 模糊计算会轻微影响渲染性能
  - 在低透明度(`globalAlpha < 0.3`)时效果可能不明显

### advancedStyle
- **类型**: `AdvancedStyleType`
- **默认值**: `null`
- **配置属性**:
  - `type`: `'linear' | 'radial' | 'conic' | 'pattern'`  
    渐变类型（线性/径向/锥形/图案）
  - `params`: 渐变参数对象
    - `linear`: { x0, y0, x1, y1 }  
      线性渐变起止坐标
    - `radial`: { x0, y0, r0, x1, y1, r1 }  
      径向渐变圆参数
    - `conic`: { startAngle, x, y }  
      锥形渐变起始角度和中心点
    - `pattern`: { image, repetition }  
      图案填充设置
  - `colorStops`: `Array<{ offset: number, color: string }>`  
    色标位置和颜色值数组
- **功能说明**:
  实现高级填充样式，覆盖默认的`fontColor`设置。支持：
  - 全类型CSS渐变（自动适配Canvas坐标系）
  - 图片纹理填充（支持跨域资源）
  - 智能坐标定位（根据`translatePlacement`自动调整渐变起止点）
- **注意事项**:
  - 与`textType`联动（同时作用于`fillStyle`和`strokeStyle`）
  - 当使用`pattern`类型时，需要预加载图片资源
  - 渐变坐标系统会受`rotate`和`translateX/Y`影响

### backgroundPosition
- **类型**: `string`
- **默认值**: `'0 0'`
- **描述**: CSS background-position属性

### backgroundRepeat
- **类型**: `string`
- **默认值**: `'repeat'`
- **描述**: CSS background-repeat属性

## 行为与安全

### mode
- **类型**: `string`
- **默认值**: `'default'`
- **可选值**:
  - `'default'`: 标准可见水印模式（正常透明度）
  - `'blind'`: 隐形水印模式（极低透明度）用于隐蔽保护
- **描述**: 决定水印的显示行为。
  - 在`default`模式下，水印会以配置的透明度正常显示。
  - 在`blind`模式下，水印会变得几乎不可见（固定globalAlpha=0.005），但仍可通过解码技术检测到。

### mutationObserve
- **类型**: `boolean`
- **默认值**: `true`
- **描述**: 是否监控DOM的未授权更改

### monitorProtection
- **类型**: `boolean`
- **默认值**: `false`
- **描述**: 启用对MutationObserver篡改的保护
- **重要**: 一旦启用，此保护无法禁用

## 回调函数

### extraDrawFunc
- **类型**: `Function`
- **默认值**: `() => {}`
- **描述**: 额外绘图操作的回调函数

### onSuccess
- **类型**: `Function`
- **默认值**: `() => {}`
- **描述**: 水印成功应用时调用

### onBeforeDestroy
- **类型**: `Function`
- **默认值**: `() => {}`
- **描述**: 水印移除前调用

### onDestroyed
- **类型**: `Function`
- **默认值**: `() => {}`
- **描述**: 水印移除后调用

### onObserveError
- **类型**: `Function`
- **默认值**: `() => {}`
- **描述**: 当DOM变化观察失败时调用
