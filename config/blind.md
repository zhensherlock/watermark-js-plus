---
url: https://zhensherlock.github.io/watermark-js-plus/config/blind.md
description: >-
  Reference the option values that BlindWatermark enforces while inheriting
  standard Watermark capabilities.
---

# BlindWatermark Options

**Related:** [Blind watermark guide](/guide/blind-watermark) · [Watermark options](/config/)

## Inheritance Note

This configuration **inherits all options** from [Watermark Options](index.md), but **enforces fixed values** for:

* `globalAlpha`: Always `0.005` (cannot be modified)
* `mode`: Always `'blind'` (cannot be modified)

## Specialized Properties

### globalAlpha

* **Type**: `number`
* **Fixed Value**: `0.005`
* **Description**: Preset to ultra-low transparency for blind watermark effect. All modification attempts will be automatically overridden.

### mode

* **Type**: `string`
* **Fixed Value**: `'blind'`
* **Description**: Locked in blind watermark mode. Changing this value has no effect.

## Example Usage

```javascript
// These values will be automatically corrected:
new BlindWatermark({
  globalAlpha: 0.1,  // Will be forced to 0.005
  mode: 'default'    // Will be forced to 'blind'
})
```
