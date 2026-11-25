---
url: https://zhensherlock.github.io/watermark-js-plus/zh/config/blind-decode.md
description: 配置 BlindWatermark.decode，对截图或图片中的暗水印进行增强和显现。
---

# BlindWatermark.decode 参数

**相关内容：** [暗水印指南](/zh/guide/blind-watermark) · [暗水印解码器](/zh/tools/blind-watermark-decoder)

## url

* **类型**: `string`
* **默认值**: `''`
* **描述**: 待解码图片的 URL 或 Data URL。解码器不会设置 `crossOrigin`，应使用同源地址或 Data URL，避免 Canvas 被污染而无法导出

## mode

* **类型**: `'canvas' | 'html' | 'svg'`
* **默认值**: `'canvas'`
* **支持值**: `'canvas'`
* **描述**: 目前只实现了 canvas 解码；类型中包含的 `'html'` 和 `'svg'` 当前不会执行解码。

## fillColor

* **类型**: `string`
* **默认值**: `'#000'`
* **描述**: 解码时使用的填充颜色，影响最终解码效果

## compositeOperation

* **类型**: `string`
* **默认值**: `'color-burn'`
* **描述**: 用于增强水印可见性的图像合成操作。浏览器不支持时，IE 入口会为 `'color-burn'` 和 `'overlay'` 提供软件回退。

## compositeTimes

* **类型**: `number`
* **默认值**: `3`
* **描述**: 图像合成次数，实际效果取决于 `compositeOperation` 和 `fillColor`；小于或等于 `0` 时跳过合成

## onSuccess

* **类型**: `Function | undefined`
* **默认值**: `undefined`
* **描述**: 解码成功后的回调函数，参数为处理后的 PNG Data URL。

## 使用示例

```javascript
BlindWatermark.decode({
  url: 'image-with-watermark.png',
  fillColor: '#000',
  compositeOperation: 'color-burn',
  onSuccess: (decodedImage) => {
    // 处理解码后的图像
  }
})
```
