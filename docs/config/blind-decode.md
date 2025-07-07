---
layout: doc
---

<el-backtop></el-backtop>

# Blind Watermark Decoding

## url
- **Type:** `string`
- **Default:** `''`
- **Description:** Path to the image requiring decoding (URL or base64)

## mode
- **Type:** `string`
- **Default:** `'canvas'`
- **Available Values:** `'canvas'`
- **Description:** Decoding mode, currently only canvas method is supported

## fillColor
- **Type:** `string`
- **Default:** `'#000'`
- **Description:** Fill color used during decoding, affects final decoding result

## compositeOperation
- **Type:** `string`
- **Default:** `'color-burn'`
- **Description:** Image composite operation type used to enhance watermark visibility

## compositeTimes
- **Type:** `number`
- **Default:** `3`
- **Description:** Number of composite operation repetitions - more repetitions make watermark more visible

## onSuccess
- **Type:** `Function`
- **Default:** `undefined`
- **Description:** Callback function after successful decoding, parameter contains decoded image data

## Decoding Principle
Blind watermark decoding works through these steps:
1. Load image containing blind watermark
2. Create canvas and draw original image
3. Apply specified composite operation and fill color
4. Repeat composite operation multiple times to enhance watermark visibility
5. Output processed image

## Usage Example
```javascript
BlindWatermark.decode({
  url: 'image-with-watermark.png',
  fillColor: '#000',
  compositeOperation: 'color-burn',
  onSuccess: (decodedImage) => {
    // Handle decoded image
  }
})
