---
layout: doc
---

<el-backtop></el-backtop>

# Custom Configs

<script setup lang="ts">
import { reactive, getCurrentInstance, onMounted } from 'vue';
import { useData } from 'vitepress';
import WatermarkOptionsForm from '../../components/WatermarkOptionsForm.vue';
// import { cloneDeep } from 'lodash';
import cloneDeep from 'lodash/cloneDeep';
import { useAppStore } from '../../.vitepress/stores/app';

const appStore = useAppStore();

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

onMounted(() => {
});

const handleAddWatermark = () => {
  appStore.createWatermark(outputWatermarkOptions)
};
const handleRemoveWatermark = () => {
  appStore.removeWatermark()
};
const handleChangeOptions = (options) => {
  Object.keys(outputWatermarkOptions).forEach(key => {
    delete outputWatermarkOptions[key]
  })
  outputWatermarkOptions = Object.assign(outputWatermarkOptions, options)
  appStore.changeWatermark(options);
};
</script>

<ClientOnly>
  <WatermarkOptionsForm
    :options="initialWatermarkOptions"
    @change="handleChangeOptions"
  />
</ClientOnly>

```js-vue
import { Watermark } from 'watermark-js-plus' // import watermark plugin

const watermark = new Watermark({{ outputWatermarkOptions }})

watermark.create() // add watermark

watermark.destroy() // remove watermark
```

<el-affix position="bottom" :offset="0">
  <el-space class="block-operation">
    <el-button round type="primary" @click="handleAddWatermark">Add Watermark</el-button>
    <el-button round type="danger" @click="handleRemoveWatermark">Remove Watermark</el-button>
  </el-space>
</el-affix>
