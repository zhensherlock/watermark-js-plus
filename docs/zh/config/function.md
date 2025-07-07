---
layout: doc
---

<el-backtop></el-backtop>

# 水印核心功能

## create()
- **描述**: 在指定父元素上创建并渲染水印
- **行为**:
  - 验证DOM中水印的唯一性（如果发现重复则抛出错误）
  - 根据contentType（文本/图片/富文本）检查内容有效性
  - 使用配置的样式（旋转、透明度等）生成水印画布
  - 将画布转换为带有正确定位的背景图片
  - 应用防御性CSS（!important标记，pointer-events: none）
  - 处理固定（body/html）和自定义父元素
  - 如果mutationObserve=true，则设置MutationObserver
  - 仅在首次创建时触发 `onSuccess` 回调
- **返回**: `Promise<void>`
- **示例**:
```javascript
  await watermark.create();
```

## destroy()
- **描述**: 完全移除水印并清理观察者
- **行为**:
  - 触发 `onBeforeDestroy()` 回调
  - 断开所有 MutationObservers
  - 移除水印DOM节点
  - 触发 `onDestroyed()` 回调
- **示例**:
```javascript
  watermark.destroy();
```

## check()
- **描述**: 验证水印在DOM中的存在性
- **返回**: `Promise<boolean>`
  - true: 水印存在于父元素中
  - false: 未找到水印
- **示例**:
```javascript
  const exists = await watermark.check();
```

## changeOptions()
- **描述**: 更新水印配置
- **参数**:
  - args: `Partial<WatermarkOptions>` - 新的配置选项
  - mode: 'overwrite'|'append' - 如何合并新选项
  - redraw: boolean - 是否立即重新创建 (默认: true)
- **行为**:
  - 根据指定模式合并新选项
  - 如果 monitorProtection=true，则启用保护
  - 如果 redraw=true，则重新创建水印
- **返回**: `Promise<void>`
- **示例**:
```javascript
  await watermark.changeOptions({ content: 'New Text' }, 'append');
```

## 技术细节
- **DOM Structure**:
```html
<div class="watermark" style="/* 防御性CSS */">
  <div style="/* 背景图片样式 */"></div>
</div>
  ```
- **保护机制**:
  - MutationObserver用于检测DOM篡改
  - 修改时自动重新创建
  - CSS !important覆盖

- **生命周期回调**:
  - `onSuccess`: 成功创建后触发
  - `onBeforeDestroy`: 移除前触发
  - `onDestroyed`: 移除后触发
  - `onObserveError`: MutationObserver 失败时触发
