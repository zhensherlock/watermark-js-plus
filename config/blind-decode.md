---
url: https://zhensherlock.github.io/watermark-js-plus/config/blind-decode.md
description: >-
  Configure BlindWatermark.decode to enhance and reveal a blind watermark
  contained in a screenshot or image.
---

# BlindWatermark.decode Options

**Related:** [Blind watermark guide](/guide/blind-watermark) · [Blind Watermark Decoder](/tools/blind-watermark-decoder)

## url

* **Type**: `string`
* **Default**: `''`
* **Description**: Source image URL or Data URL. The decoder does not set `crossOrigin`, so use a same-origin source or Data URL to avoid a tainted Canvas and export failure.

## mode

* **Type**: `'canvas' | 'html' | 'svg'`
* **Default**: `'canvas'`
* **Supported Value**: `'canvas'`
* **Description**: Only canvas decoding is implemented. The typed `'html'` and `'svg'` values currently perform no decoding.

## fillColor

* **Type**: `string`
* **Default**: `'#000'`
* **Description**: Fill color used during decoding, affects final decoding result

## compositeOperation

* **Type**: `string`
* **Default**: `'color-burn'`
* **Description**: Image composite operation used to enhance watermark visibility. The IE entry provides a software fallback for `'color-burn'` and `'overlay'` when the browser does not support them.

## compositeTimes

* **Type**: `number`
* **Default**: `3`
* **Description**: Number of composite passes. The visual result depends on `compositeOperation` and `fillColor`; values less than or equal to `0` skip compositing.

## onSuccess

* **Type**: `Function | undefined`
* **Default**: `undefined`
* **Description**: Callback after successful decoding; its parameter is the processed PNG Data URL.

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
```
