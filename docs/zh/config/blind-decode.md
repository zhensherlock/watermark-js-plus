---
layout: doc
---

<el-backtop></el-backtop>

# 盲水印解码

## url
- **类型:** `string`
- **默认值:** `''`
- **描述:** 需要解码的图片路径(URL或base64)

## mode
- **类型:** `string`
- **默认值:** `'canvas'`
- **可选值:** `'canvas'`
- **描述:** 解码模式，目前仅支持canvas方式

## fillColor
- **类型:** `string`
- **默认值:** `'#000'`
- **描述:** 解码时使用的填充颜色，影响最终解码效果

## compositeOperation
- **类型:** `string`
- **默认值:** `'color-burn'`
- **描述:** 图像合成操作类型，用于增强水印可见性

## compositeTimes
- **类型:** `number`
- **默认值:** `3`
- **描述:** 合成操作的重复次数，次数越多水印越明显

## onSuccess
- **类型:** `Function`
- **默认值:** `undefined`
- **描述:** 解码成功后的回调函数，参数为解码后的图像数据

## 解码原理
盲水印解码通过以下步骤实现:
1. 加载包含盲水印的图片
2. 创建canvas并绘制原图
3. 应用指定的合成操作(compositeOperation)和填充颜色(fillColor)
4. 多次重复合成操作(compositeTimes)以增强水印可见性
5. 输出处理后的图像

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
