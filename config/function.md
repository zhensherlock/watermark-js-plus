---
url: https://zhensherlock.github.io/watermark-js-plus/config/function.md
description: >-
  Reference the Watermark and BlindWatermark instance methods and the methods
  supported by ImageWatermark.
---

# Watermark Methods

`Watermark` and `BlindWatermark` support every method below. `ImageWatermark` supports only `create()` and `destroy()`.

**Related:** [Watermark guide](/guide/watermark) · [Image watermark guide](/guide/image) · [Watermark Configurator](/tools/watermark-configurator)

## create()

* **Description**: Creates and renders the watermark on the specified parent element
* **Behavior**:
  * Returns without creating if a duplicate watermark is found in the parent element
  * Checks content validity based on contentType (text/image/multi-line-text/rich-text)
  * Generates watermark canvas with configured styles (rotation, opacity, etc.)
  * Converts canvas to background image with proper positioning
  * Applies defensive CSS (!important flags, pointer-events: none)
  * Handles both fixed (body/html) and custom parent elements
  * Sets up MutationObserver if mutationObserve=true
  * Triggers `onSuccess` callback only on first creation
* **Returns**: `Promise<void>`
* **Example**:

```javascript
  await watermark.create();
```

## destroy()

* **Description**: Completely removes the watermark and cleans up observers
* **Behavior**:
  * Triggers `onBeforeDestroy()` callback
  * Disconnects all MutationObservers
  * Removes watermark DOM nodes
  * Triggers `onDestroyed()` callback
* **Example**:

```javascript
  watermark.destroy();
```

## check()

* **Description**: Verifies watermark DOM existence
* **Returns**: `Promise<boolean>`
  * true: Watermark exists in parentElement
  * false: Watermark not found
* **Example**:

```javascript
  const exists = await watermark.check();
```

## changeOptions()

* **Description**: Updates watermark configuration
* **Parameters**:
  * args: `Partial<WatermarkOptions>` - New configuration options (default: `{}`)
  * mode: 'overwrite'|'append' - How to merge new options (default: `'overwrite'`)
  * redraw: boolean - Whether to recreate immediately (default: true)
* **Behavior**:
  * `overwrite` replaces previous explicit options, so omitted values return to defaults
  * `append` merges into previous explicit options
  * Enables protection if monitorProtection=true
  * Recreates watermark if redraw=true
* **Returns**: `Promise<void>`
* **Example**:

```javascript
  await watermark.changeOptions({ content: 'New Text' }, 'append');
```

## Technical Details

* **DOM Structure**:

```html
<div style="/* defensive CSS */">
  <div style="/* background image styles */"></div>
</div>
```

* **Protection Mechanisms**:
  * MutationObserver for DOM tampering detection
  * Automatic recreation when modified
  * CSS !important overrides

* **Lifecycle Callbacks**:
  * `onSuccess`: After successful creation
  * `onBeforeDestroy`: Before removal
  * `onDestroyed`: After removal
  * `onObserveError`: When MutationObserver fails
