<template>
  <g
     inkscape:groupmode="layer"
     id="layer23"
     inkscape:label="fadercap"
     transform="translate(0,-140.89585)">
    <g
       inkscape:groupmode="layer"
       :id="f.name"
       v-for="(f, i) in faders"
       :key="i"
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

@Component
export default class FaderCaps extends Vue {
  @Prop(Array) readonly config!: Array<any>

  ff:Array<any> = []
  mounted () {
    this.ff = faderCaps
  }

  get faders () {
    let rtn:Array<any> = []
    for (let i = 0; i < this.config.length; i++) {
      const e = this.config[i]
      for (let t = 0; t < this.ff.length; t++) {
        const j = this.ff[t]
        if (j.name === e.name) {
          let tmp = {}
          j.rect0.fixedY = this.calcY(j.rect0.y, e.value)
          j.rect1.fixedY = this.calcY(j.rect1.y, e.value)
          rtn.push({
            ...j,
            ...e
          })
          // rtn.push(Object.assign(e, j))
        }
      }
    }
    return rtn
  }

  calcY (y:any, value:any) {
    let rtn = 0
    y = Number(y)
    value = Number(value)
    let up = 27 * value
    console.log(y, value, up)
    rtn = (y - up)
    return rtn
  }
}
</script>
