---
layout: doc
---

<el-backtop></el-backtop>

# Watermark Core Functions

## create()
- **Description**: Creates and renders the watermark on the specified parent element
- **Behavior**:
  - Validates watermark uniqueness in the DOM (throws error if duplicate found)
  - Checks content validity based on contentType (text/image/rich-text)
  - Generates watermark canvas with configured styles (rotation, opacity, etc.)
  - Converts canvas to background image with proper positioning
  - Applies defensive CSS (!important flags, pointer-events: none)
  - Handles both fixed (body/html) and custom parent elements
  - Sets up MutationObserver if mutationObserve=true
  - Triggers `onSuccess` callback only on first creation
- **Returns**: `Promise<void>`
- **Example**:
```javascript
  await watermark.create();
```

## destroy()
- **Description**: Completely removes the watermark and cleans up observers
- **Behavior**:
  - Triggers onBeforeDestroy() callback
  - Disconnects all MutationObservers
  - Removes watermark DOM nodes
  - Triggers onDestroyed() callback
- **Example**:
```javascript
  watermark.destroy();
```

## check()
- **Description**: Verifies watermark DOM existence
- **Returns**: Promise<boolean>
  - true: Watermark exists in parentElement
  - false: Watermark not found
- **Example**:
```javascript
  const exists = await watermark.check();
```

## changeOptions()
- **Description**: Updates watermark configuration
- **Parameters**:
  - args: Partial<WatermarkOptions> - New configuration options
  - mode: 'overwrite'|'append' - How to merge new options
  - redraw: boolean - Whether to recreate immediately (default: true)
- **Behavior**:
  - Merges new options according to specified mode
  - Enables protection if monitorProtection=true
  - Recreates watermark if redraw=true
- **Returns**: Promise<void>
- **Example**:
```javascript
  await watermark.changeOptions({ content: 'New Text' }, 'append');
```

## Technical Details
- **DOM Structure**:
```html
<div class="watermark" style="/* defensive CSS */">
  <div style="/* background image styles */"></div>
</div>
  ```
- **Protection Mechanisms**:
  - MutationObserver for DOM tampering detection
  - Automatic recreation when modified
  - CSS !important overrides

- **Lifecycle Callbacks**:
  - `onSuccess`: After successful creation
  - `onBeforeDestroy`: Before removal
  - `onDestroyed`: After removal
  - `onObserveError`: When MutationObserver fails
