import { defineStore } from 'pinia'
import { Watermark, BlindWatermark } from '../../../src';
import type { WatermarkOptions, ChangeOptionsMode } from '../../../src/types'

const useAppStore = defineStore('app', {
  state: () => {
    return {
      watermark: null as Watermark | BlindWatermark,
    }
  },
  getters: {},
  actions: {
    createWatermark(args: Partial<WatermarkOptions>, mode = 'default') {
      if (this.watermark) {
        this.watermark.destroy()
      }
      this.watermark = mode === 'default' ? new Watermark(args) : new BlindWatermark(args)
      this.watermark.create()
    },
    changeWatermark(args: Partial<WatermarkOptions> = {}, mode: ChangeOptionsMode = 'overwrite', redraw: boolean = true) {
      if (!this.watermark) {
        return
      }
      this.watermark.changeOptions(args, mode, redraw)
    },
    removeWatermark() {
      if (!this.watermark) {
        return
      }
      this.watermark.destroy()
    }
  },
});

export { useAppStore }
