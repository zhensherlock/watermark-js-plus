---
layout: doc
---

<el-backtop></el-backtop>

# 盲水印配置

## 继承说明
本配置**继承所有**[水印配置选项](index.md)参数，但**固定以下值不可修改**:
- `globalAlpha`: 恒为 `0.005` (不可修改)
- `mode`: 恒为 `'blind'` (不可修改)

## 特殊属性

### globalAlpha
- **类型:** `number`
- **固定值:** `0.005`
- **说明:** 预设极低透明度实现盲水印效果，所有修改尝试将被自动重置

### mode
- **类型:** `string`
- **固定值:** `'blind'`
- **说明:** 锁定为盲水印模式，修改此值无效

## 技术实现
盲水印:
1. 继承标准水印所有功能
2. 初始化和更新时自动强制`globalAlpha=0.005`
3. 永久固定`mode='blind'`(即使传入其他值)
4. 保留父类所有其他可配置选项

## 使用示例
```javascript
// 以下值将被自动修正:
new BlindWatermark({
  globalAlpha: 0.1,  // 会被强制设为0.005
  mode: 'default'    // 会被强制设为'blind'
})
