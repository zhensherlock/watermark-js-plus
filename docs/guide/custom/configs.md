---
layout: doc
---
# Custom Configs

<script setup lang="ts">
import { reactive, getCurrentInstance, onMounted } from 'vue';
import { Watermark } from '../../../src';
import { useData } from 'vitepress';
import WatermarkOptionsForm from '../../components/WatermarkOptionsForm.vue';
// import { cloneDeep } from 'lodash';
import cloneDeep from 'lodash/cloneDeep';

const { isDark } = useData();
const app = getCurrentInstance();
const initialWatermarkOptions = {
  width: 300,
  height: 300,
  rotate: 45
};

let outputWatermarkOptions = reactive(
  cloneDeep(initialWatermarkOptions)
)

let watermark = null;
onMounted(() => {
  watermark = new Watermark(initialWatermarkOptions);
});

const handleAddWatermark = () => {
  // if (isDark.value) {
  //   watermark.options.fontColor = '#fff'
  // }
  watermark.create();
};
const handleRemoveWatermark = () => {
  watermark.destroy();
};
const handleChangeOptions = (options) => {
  Object.keys(outputWatermarkOptions).forEach(key => {
    delete outputWatermarkOptions[key]
  })
  outputWatermarkOptions = Object.assign(outputWatermarkOptions, options)
  watermark.changeOptions(options);
};
</script>

<WatermarkOptionsForm
  :options="initialWatermarkOptions"
  @change="handleChangeOptions"
/>

```js-vue
import { Watermark } from 'watermark-js-plus' // import watermark plugin

const watermark = new Watermark({{ outputWatermarkOptions }})

watermark.create() // add watermark

watermark.destroy() // remove watermark
```

<el-affix position="bottom" :offset="0">
  <el-space style="padding: 10px 0;background: var(--vp-c-bg);width: 100%;">
    <el-button round type="primary" @click="handleAddWatermark">Add Watermark</el-button>
    <el-button round type="danger" @click="handleRemoveWatermark">Remove Watermark</el-button>
  </el-space>
</el-affix>


