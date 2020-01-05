<template>
  <g
     inkscape:groupmode="layer"
     id="layer23"
     inkscape:label="fadercap"
     transform="translate(0,-140.89585)">
    <g
       inkscape:groupmode="layer"
       :id="f.name"
       v-for="(f, i) in ff"
       :key="i"
       @click="openConfig(f)"
       class="addPointer"
       >
      <rect
         style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.06614583;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke markers fill"
         id="rect6492"
         :width="f.rect0.width"
         :height="f.rect0.height"
         :x="f.rect0.x"
         :y="f.rect0.fixedY" />
      <rect
         style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.08883093;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke markers fill"
         id="rect6494"
         :width="f.rect1.width"
         :height="f.rect1.height"
         :x="f.rect1.x"
         :y="f.rect1.fixedY" />
    </g>
  </g>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch, Emit } from 'vue-property-decorator'
import faderCaps from './json/fadercaps.json'
import { EventBus } from '../../EventBus'

@Component
export default class FaderCaps extends Vue {
  @Prop(Array) readonly config!: Array<any>

  ff:any = {}
  mounted () {
    this.ff = faderCaps
    setTimeout(() => {
      this.initFaders()
      EventBus.$on('sendOsc', (data:any) => {
        this.setFader(data)
      })
    }, 1500)
  }

  setFader (updateData:any) {
    let name = updateData.name
    if (this.ff[name]) {
      this.ff[name].value = updateData.value
      this.ff[name].rect0.fixedY = this.calcY(this.ff[name].rect0.y, updateData.value)
      this.ff[name].rect1.fixedY = this.calcY(this.ff[name].rect1.y, updateData.value)
      this.ff = Object.assign({}, this.ff)
    }
  }

  initFaders () {
    for (let i = 0; i < this.config.length; i++) {
      const e = this.config[i]
      if (this.ff[e.name]) {
        this.ff[e.name].name = e.name
        this.ff[e.name].osc = e.osc
        this.ff[e.name].type = e.type
        this.ff[e.name].value = e.value
        this.ff[e.name].rect0.fixedY = this.calcY(this.ff[e.name].rect0.y, e.value)
        this.ff[e.name].rect1.fixedY = this.calcY(this.ff[e.name].rect1.y, e.value)
      }
    }
    this.ff = Object.assign({}, this.ff)
  }

  openConfig (item:any) {
    EventBus.$emit('openConfig', item)
  }

  calcY (y:any, value:any) {
    let rtn = 0
    y = Number(y)
    value = Number(value)
    let up = 27 * value
    rtn = (y - up)
    return rtn
  }
}
</script>
