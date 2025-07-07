---
layout: doc
---

<el-backtop></el-backtop>

# Watermark Configuration Options

## Basic Configuration

### width
- **Type:** `number`
- **Default:** `300`
- **Description:** Unit width for a single watermark element.

### height
- **Type:** `number`
- **Default:** `300`
- **Description:** Unit height for a single watermark element.

### rotate
- **Type:** `number`
- **Default:** `45`
- **Description:** Rotation angle of the watermark in degrees.

### layout
- **Type:** `string`
- **Default:** `'default'`
- **Description:** Layout mode for watermark arrangement.
- **Possible Values:** Various layout types (implementation specific)

### gridLayoutOptions
- **Type:** `Object`
- **Default:** `null`
- **Description:** Custom options for grid-based layout configuration.

### auxiliaryLine
- **Type:** `boolean`
- **Default:** `false`
- **Description:** Whether to display auxiliary guidelines for positioning.

## Positioning & Movement

### translatePlacement
- **Type:** `string`
- **Default:** `'middle'`
- **Available Values:**
  - `'top'`, `'top-start'`, `'top-end'`
  - `'bottom'`, `'bottom-start'`, `'bottom-end'`
  - `'left'`, `'right'`, `'middle'`
- **Description:** Base position for translation transformation.

### translateX
- **Type:** `number`
- **Description:** Horizontal movement distance (positive = right, negative = left).

### translateY
- **Type:** `number`
- **Description:** Vertical movement distance (positive = down, negative = up).

### movable
- **Type:** `boolean`
- **Default:** `false`
- **Description:** Whether the watermark can be moved interactively.

### zIndex
- **Type:** `number`
- **Default:** `2147483647`
- **Description:** CSS z-index property for layering control.

### parent
- **Type:** `Element | string`
- **Default:** `'body'`
- **Description:** Container element for the watermark (selector or DOM element).

## Content Configuration

### contentType
- **Type:** `string`
- **Default:** `'text'`
- **Available Values:**
  - `'text'`: Simple text watermark
  - `'image'`: Image watermark
  - `'multi-line-text'`: Multi-line text
  - `'rich-text'`: Formatted rich text
- **Description:** Type of content to display as watermark.

### content
- **Type:** `string`
- **Default:** `'hello watermark-js-plus'`
- **Description:** The actual content to display (text or image URL).

### textType
- **Type:** `string`
- **Default:** `'fill'`
- **Available Values:** `'fill'` | `'stroke'`
- **Description:** Rendering method for text content.

## Text Styling

### fontSize
- **Type:** `string`
- **Default:** `'20px'`
- **Description:** Font size for text content.

### fontFamily
- **Type:** `string`
- **Default:** `'sans-serif'`
- **Description:** Font family for text content.

### fontStyle
- **Type:** `string`
- **Default:** `''`
- **Description:** Font style (e.g., 'italic').

### fontVariant
- **Type:** `string`
- **Default:** `''`
- **Description:** Font variant (e.g., 'small-caps').

### fontWeight
- **Type:** `string`
- **Default:** `'normal'`
- **Description:** Font weight (e.g., 'bold').

### fontColor
- **Type:** `string`
- **Default:** `'#000'`
- **Description:** Text color.

### textAlign
- **Type:** `string`
- **Available Values:** `'center'`, `'end'`, `'left'`, `'right'`, `'start'`
- **Description:** Horizontal text alignment.

### textBaseline
- **Type:** `string`
- **Available Values:**
  - `'top'`, `'bottom'`, `'middle'`
  - `'alphabetic'`, `'hanging'`, `'ideographic'`
- **Description:** Vertical text alignment baseline.
  ![textBaseline](../public/text-baseline.png)

### lineHeight
- **Type:** `number`
- **Default:** `30`
- **Description:** Line height for multi-line text.

### textRowMaxWidth
- **Type:** `number`
- **Description:** Maximum width for text rows before wrapping.

### letterSpacing
- **Type:** `string`
- **Default:** `'0px'`
- **Description:** Spacing between characters.

### wordSpacing
- **Type:** `string`
- **Default:** `'0px'`
- **Description:** Spacing between words.

## Image Configuration

### image
- **Type:** `string`
- **Description:** URL of the image to use as watermark (when contentType = 'image').

### imageWidth
- **Type:** `number`
- **Default:** `0`
- **Description:** Display width for the image (0 = natural width).

### imageHeight
- **Type:** `number`
- **Default:** `0`
- **Description:** Display height for the image (0 = natural height).

## Rich Text Configuration

### richTextWidth
- **Type:** `number`
- **Description:** Width constraint for rich text content.

### richTextHeight
- **Type:** `number`
- **Description:** Height constraint for rich text content.

## Visual Effects

### globalAlpha
- **Type:** `number`
- **Default:** `0.5`
- **Description:** Overall transparency of the watermark (0.0 to 1.0).

### filter
- **Type:** `string`
- **Default:** `'none'`
- **Description:** CSS filter effects to apply.

### shadowStyle
- **Type:** `Object`
- **Default:** `null`
- **Description:** Shadow configuration object (color, blur, offset).

### advancedStyle
- **Type:** `Object`
- **Default:** `null`
- **Description:** Advanced styling like gradients.

### backgroundPosition
- **Type:** `string`
- **Default:** `'0 0'`
- **Description:** CSS background-position property.

### backgroundRepeat
- **Type:** `string`
- **Default:** `'repeat'`
- **Description:** CSS background-repeat property.

## Behavior & Security

### mode
- **Type:** `string`
- **Default:** `'default'`
- **Available Values:** `'default'` | `'blind'`
- **Description:** Watermark display mode.

### mutationObserve
- **Type:** `boolean`
- **Default:** `true`
- **Description:** Whether to monitor DOM for unauthorized changes.

### monitorProtection
- **Type:** `boolean`
- **Default:** `false`
- **Description:** Enable protection against MutationObserver and requestAnimationFrame tampering.
- **Important:** Once enabled, this protection cannot be disabled.

## Callbacks

### extraDrawFunc
- **Type:** `Function`
- **Default:** `() => {}`
- **Description:** Additional drawing operations callback.

### onSuccess
- **Type:** `Function`
- **Default:** `() => {}`
- **Description:** Called when watermark is successfully applied.

### onBeforeDestroy
- **Type:** `Function`
- **Default:** `() => {}`
- **Description:** Called before watermark removal.

### onDestroyed
- **Type:** `Function`
- **Default:** `() => {}`
- **Description:** Called after watermark removal.

### onObserveError
- **Type:** `Function`
- **Default:** `() => {}`
- **Description:** Called when mutation observation fails.
