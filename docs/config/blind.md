---
layout: doc
---

<el-backtop></el-backtop>

# Blind Watermark Configuration

## Inheritance Note
This configuration **inherits all options** from [Watermark Configuration Options](index.md), but **enforces fixed values** for:
- `globalAlpha`: Always `0.005` (cannot be modified)
- `mode`: Always `'blind'` (cannot be modified)

## Specialized Properties

### globalAlpha
- **Type**: `number`
- **Fixed Value**: `0.005`
- **Description**: Preset to ultra-low transparency for blind watermark effect. All modification attempts will be automatically overridden.

### mode
- **Type**: `string`
- **Fixed Value**: `'blind'`
- **Description**: Locked in blind watermark mode. Changing this value has no effect.

## Technical Implementation
The blind watermark:
1. Inherits all standard watermark capabilities
2. Automatically enforces `globalAlpha=0.005` during initialization and all updates
3. Permanently sets `mode='blind'` (even if other values are provided)
4. Maintains all other configurable options from the parent class

## Example Usage
```javascript
// These values will be automatically corrected:
new BlindWatermark({
  globalAlpha: 0.1,  // Will be forced to 0.005
  mode: 'default'    // Will be forced to 'blind'
})
