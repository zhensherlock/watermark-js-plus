---
layout: doc
---

<el-backtop></el-backtop>

# Watermark Configuration Options

## Basic Configuration

### width
- **Type**: `number`
- **Default**: `300`
- **Description**: Unit width for a single watermark element.

### height
- **Type**: `number`
- **Default**: `300`
- **Description**: Unit height for a single watermark element.

### rotate
- **Type**: `number`
- **Default**: `45`
- **Description**: Rotation angle of the watermark in degrees.

### layout
- **Type**: `string`
- **Default**: `'default'`
- **Description**: Controls the arrangement of watermark elements
- **Available Values**:
  - `'default'` (Default mode)
    * Basic layout with minimal configuration
    * Suitable for simple use cases

  - `'grid'` (Grid layout)
    * Arranges watermarks in a matrix grid pattern
    * Requires `gridLayoutOptions` configuration
    * Typical use case: Generating patterned watermark backgrounds

### gridLayoutOptions
- **Type**: `GridLayoutOptions`
- **Default**: `null`
- **Description**: Custom options for grid-based layout configuration.
- **Properties**:
  - `cols`: Number of columns (default: `1`)
  - `rows`: Number of rows (default: `1`)
  - `gap`: Spacing as `[horizontal, vertical]` (default: `[0, 0]`)
  - `matrix`: 2D matrix controlling visibility per grid cell (default: all `1`s)
  - `backgroundImage`: Optional background image (covers entire grid)
  - `width`: Optional custom total width (overrides cols/gap calculation)
  - `height`: Optional custom total height (overrides rows/gap calculation)

### auxiliaryLine
- **Type**: `boolean`
- **Default**: `false`
- **Description**: Whether to display auxiliary guidelines for positioning.

## Positioning & Movement

### translatePlacement
- **Type**: `TranslatePlacementType`
- **Default**: `'middle'`
- **Available Values**:
  - `'top'` - Top center
  - `'top-start'` - Top left
  - `'top-end'` - Top right
  - `'bottom'` - Bottom center
  - `'bottom-start'` - Bottom left
  - `'bottom-end'` - Bottom right
  - `'left'` - Middle left
  - `'right'` - Middle right
  - `'middle'` - Center (default)
- **Description**:
  - Determines the base position for watermark placement and rotation transformation
  - Affects both the initial position and gradient calculations when using advanced styles
  - Automatically adjusts text alignment and baseline when not explicitly set
  - Coordinates with `translateX` and `translateY` for precise positioning
- **Note**:
  - When combined with rotation, the placement becomes the rotation center point
  - For text watermarks, this also affects text baseline calculation

### translateX
- **Type**: `number`
- **Default**: Auto-calculated (based on `translatePlacement` and `width`)
- **Description**: 
  - Horizontal offset (in pixels)
  - Positive value → Right movement | Negative value ← Left movement
  - Overrides horizontal positioning from `translatePlacement`
  - Serves as X-coordinate for rotation pivot point
  - Affects calculation of linear/radial gradient start points

### translateY
- **Type**: `number`
- **Default**: Auto-calculated (based on `translatePlacement` and `height`)
- **Description**:
  - Vertical offset (in pixels)
  - Positive value ↓ Downward movement | Negative value ↑ Upward movement
  - Overrides vertical positioning from `translatePlacement`
  - Serves as Y-coordinate for rotation pivot point
  - Affects automatic calculation of text baseline (`textBaseline`)

### movable
- **Type**: `boolean`
- **Default**: `false`
- **Description**:  
  When enabled, applies dynamic movement effects to the watermark. The behavior differs based on `backgroundRepeat`:
  - `repeat`: Full 2D floating animation (200s duration)
  - `repeat-x`: Horizontal oscillation (random 2-8s duration)
  - `repeat-y`: Vertical oscillation (random 2-4s duration)
  - `no-repeat`: Combined horizontal+vertical movement. The watermark node will simulate collision-based movement within its parent element, automatically bouncing off boundaries.
- **Live Examples**:
  - [StackBlitz](https://stackblitz.com/edit/webpack-webpack-js-org-wq26h43z)
  - [Demo](../guide/watermark.html#child-element-watermark)
- **Mechanism**:
  - Implemented via CSS `animation` with randomized durations
  - Uses `alternate` direction for ping-pong effect
  - Speed ranges:
    - Horizontal: 2-8 seconds per cycle
    - Vertical: 2-4 seconds per cycle
- **Note**:
  - Disables when `mutationObserve` is active
  - Animation intensity scales with container size
  - For physics-based movement, combine with `advancedStyle` gradients

### zIndex
- **Type**: `number`
- **Default**: `2147483647`
- **Description**: CSS z-index property for layering control.

### parent
- **Type**: `Element | string`
- **Default**: `'body'`
- **Description**: Container element for the watermark (selector or DOM element).

## Content Configuration

### contentType
- **Type**: `string`
- **Default**: `'text'`
- **Available Values**:
  - `'text'`: Simple text watermark
  - `'image'`: Image watermark
  - `'multi-line-text'`: Multi-line text watermark
  - `'rich-text'`: Formatted rich text watermark
- **Description**: Type of content to display as watermark.

### content
- **Type**: `string`
- **Default**: `'hello watermark-js-plus'`
- **Description**: The actual content to display (text or image URL).

### textType
- **Type**: `string`
- **Default**: `'fill'`
- **Available Values**: `'fill'` | `'stroke'`
- **Description**: Rendering method for text content.

## Text Styling

### fontSize
- **Type**: `string`
- **Default**: `'20px'`
- **Description**: Font size for text content.

### fontFamily
- **Type**: `string`
- **Default**: `'sans-serif'`
- **Description**: Font family for text content.

### fontStyle
- **Type**: `string`
- **Default**: `''`
- **Description**: Font style (e.g., 'italic').

### fontVariant
- **Type**: `string`
- **Default**: `''`
- **Description**: Font variant (e.g., 'small-caps').

### fontWeight
- **Type**: `string`
- **Default**: `'normal'`
- **Description**: Font weight (e.g., 'bold').

### fontColor
- **Type**: `string`
- **Default**: `'#000'`
- **Description**: Text color.

### textAlign
- **Type**: `string`
- **Available Values**: `'center'`, `'end'`, `'left'`, `'right'`, `'start'`
- **Description**: Horizontal text alignment.

### textBaseline
- **Type**: `string`
- **Available Values**:
  - `'top'`, `'bottom'`, `'middle'`
  - `'alphabetic'`, `'hanging'`, `'ideographic'`
- **Description**: Vertical text alignment baseline.
  ![textBaseline](../public/text-baseline.png)

### lineHeight
- **Type**: `number`
- **Default**: `30`
- **Description**: Line height for multi-line text.

### textRowMaxWidth
- **Type**: `number`
- **Description**: Maximum width for text rows before wrapping.

### letterSpacing
- **Type**: `string`
- **Default**: `'0px'`
- **Description**: Spacing between characters.

### wordSpacing
- **Type**: `string`
- **Default**: `'0px'`
- **Description**: Spacing between words.

## Image Configuration

### image
- **Type**: `string`
- **Description**: URL of the image to use as watermark (when contentType = 'image').

### imageWidth
- **Type**: `number`
- **Default**: `0`
- **Description**: Display width for the image (0 = natural width).

### imageHeight
- **Type**: `number`
- **Default**: `0`
- **Description**: Display height for the image (0 = natural height).

## Rich Text Configuration

### richTextWidth
- **Type**: `number`
- **Description**: Width constraint for rich text content.

### richTextHeight
- **Type**: `number`
- **Description**: Height constraint for rich text content.

## Visual Effects

### globalAlpha
- **Type**: `number`
- **Default**: `0.5`
- **Description**: Overall transparency of the watermark (0.0 to 1.0).

### filter
- **Type**: `string`
- **Default**: `'none'`
- **Description**: Applies CSS filter effects similar to those available for CSS. The value is a string containing one or more of the following filter functions.
  - `url()`: Applies an SVG filter defined in an external resource (e.g., `url(#custom-filter)`)
  - `blur(<length>)`: Applies a Gaussian blur (e.g., `blur(5px)`)
  - `brightness(<percentage>)`: Adjusts brightness (e.g., `brightness(150%)`)
  - `contrast(<percentage>)`: Adjusts contrast (e.g., `contrast(75%)`)
  - `drop-shadow(<offset-x> <offset-y> <blur-radius> <color>)`: Applies a drop shadow (e.g., `drop-shadow(4px 4px 8px blue)`)
  - `grayscale(<percentage>)`: Converts to grayscale (e.g., `grayscale(100%)`)
  - `hue-rotate(<angle>)`: Applies hue rotation (e.g., `hue-rotate(90deg)`)
  - `invert(<percentage>)`: Inverts colors (e.g., `invert(50%)`)
  - `opacity(<percentage>)`: Adjusts opacity (e.g., `opacity(25%)`)
  - `saturate(<percentage>)`: Adjusts saturation (e.g., `saturate(200%)`)
  - `sepia(<percentage>)`: Applies sepia tone (e.g., `sepia(80%)`)

Multiple filters can be combined by space-separating them (e.g., `brightness(120%) contrast(110%)`). The value `'none'` indicates no filter effect.

### shadowStyle
- **Type**: `CanvasShadowStyles`
- **Default**: `null`
- **Properties**:
  - `shadowColor`: `string`  
    Shadow color (supports all CSS color formats)
  - `shadowBlur`: `number`  
    Blur level (in pixels, 0 = no blur)
  - `shadowOffsetX`: `number`  
    Horizontal offset (in pixels, positive = right)
  - `shadowOffsetY`: `number`  
    Vertical offset (in pixels, positive = down)
- **Description**:
  Adds standard Canvas shadow effects with features:
  - Supports transparency (alpha channel)
  - Hardware-accelerated blur
  - Offsets are unaffected by `rotate`/`translate`
  - Combines multiplicatively with `globalAlpha`
- **Note**:
  - Requires `shadowColor` to be set to take effect
  - Blur calculations may impact rendering performance
  - May appear subtle at low opacity (`globalAlpha < 0.3`)

### advancedStyle
- **Type**: `AdvancedStyleType`
- **Default**: `null`
- **Properties**:
  - `type`: `'linear' | 'radial' | 'conic' | 'pattern'`  
    Gradient type (linear/radial/conic/pattern)
  - `params`: Configuration object
    - `linear`: { x0, y0, x1, y1 }  
      Start/end coordinates for linear gradient
    - `radial`: { x0, y0, r0, x1, y1, r1 }  
      Circle parameters for radial gradient
    - `conic`: { startAngle, x, y }  
      Starting angle and center point for conic gradient
    - `pattern`: { image, repetition }  
      Pattern fill settings
  - `colorStops`: `Array<{ offset: number, color: string }>`  
    Color stop positions and values
- **Description**:
  Enables advanced fill styles that override default `fontColor`. Supports:
  - All CSS gradient types (auto-adapted to Canvas coordinates)
  - Image pattern fills (with cross-origin support)
  - Smart coordinate positioning (auto-adjusts gradient points based on `translatePlacement`)
- **Note**:
  - Works with `textType` (applies to both `fillStyle` and `strokeStyle`)
  - Requires preloaded images for `pattern` type
  - Coordinate system affected by `rotate` and `translateX/Y` transforms

### backgroundPosition
- **Type**: `string`
- **Default**: `'0 0'`
- **Description**: CSS background-position property.

### backgroundRepeat
- **Type**: `string`
- **Default**: `'repeat'`
- **Description**: CSS background-repeat property.

## Behavior & Security

### mode
- **Type**: `string`
- **Default**: `'default'`
- **Available Values**:
  - `'default'`: Standard visible watermark mode (normal transparency)
  - `'blind'`: Invisible watermark mode (extremely low transparency) for covert protection
- **Description**: Determines the watermark visibility behavior.
  - In `default` mode, the watermark is visibly displayed with configured transparency.
  - In `blind` mode, the watermark becomes nearly invisible (fixed at globalAlpha=0.005) while remaining detectable through decoding.

### mutationObserve
- **Type**: `boolean`
- **Default**: `true`
- **Description**: Whether to monitor DOM for unauthorized changes.

### monitorProtection
- **Type**: `boolean`
- **Default**: `false`
- **Description**: Enable protection against MutationObserver tampering.
- **Important**: Once enabled, this protection cannot be disabled.

## Callbacks

### extraDrawFunc
- **Type**: `Function`
- **Default**: `() => {}`
- **Description**: Additional drawing operations callback.

### onSuccess
- **Type**: `Function`
- **Default**: `() => {}`
- **Description**: Called when watermark is successfully applied.

### onBeforeDestroy
- **Type**: `Function`
- **Default**: `() => {}`
- **Description**: Called before watermark removal.

### onDestroyed
- **Type**: `Function`
- **Default**: `() => {}`
- **Description**: Called after watermark removal.

### onObserveError
- **Type**: `Function`
- **Default**: `() => {}`
- **Description**: Called when mutation observation fails.
