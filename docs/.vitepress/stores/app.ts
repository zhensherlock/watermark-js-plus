import { defineStore } from 'pinia'
import _ from 'lodash'
import { Watermark, BlindWatermark } from '../../../src';
import type { WatermarkOptions, ChangeOptionsMode } from '../../../src/types'

const useAppStore = defineStore('app', {
  state: () => {
    return {
      watermark: null as unknown as Watermark | BlindWatermark,
    }
  },
  getters: {},
  actions: {
    createWatermark(args: Partial<WatermarkOptions>, mode = 'default') {
      if (this.watermark) {
        this.watermark.destroy()
      }
      if (_.isUndefined(args.monitorProtection)) {
        args.monitorProtection = true
      }
      // if (mode === 'blind') {
      //   args.globalAlpha = 0.015560149680823086824
      //   args.mode = 'blind'
      // }
      // this.watermark = new Watermark(args)
      this.watermark = mode === 'default' ? new Watermark(args) : new BlindWatermark(args)
      this.watermark.create()
    },
    changeWatermark(args: Partial<WatermarkOptions> = {}, mode: ChangeOptionsMode = 'overwrite', redraw: boolean = true) {
      if (!this.watermark) {
        return
      }
      if (_.isUndefined(args.monitorProtection)) {
        args.monitorProtection = true
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
