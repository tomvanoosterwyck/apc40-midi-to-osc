<template>
  <g
     inkscape:groupmode="layer"
     id="layer4"
     inkscape:label="grid"
     transform="translate(0,-140.89585)">
    <rect
      v-for="(item, i) in ff"
      :key="i"
      @click="openConfig(item)"
      :style="getColor(item)"
      :id="item.id"
      :width="item.width"
      :height="item.height"
      :x="item.x"
      :y="item.y"
      class="addPointer"
    />
  </g>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch, Emit } from 'vue-property-decorator'
import { EventBus } from '../../EventBus'
import grid from './json/grid.json'

@Component
export default class Grid extends Vue {
  @Prop(Array) readonly config!: Array<any>
  ff:any = {}

  mounted () {
    this.ff = grid
    setTimeout(() => {
      this.initGrid()
      EventBus.$on('sendOsc', (data:any) => {
        this.setGrid(data)
      })
    }, 1500)
  }

  setGrid (updateData:any) {
    let name = updateData.name
    if (this.ff[name]) {
      this.ff[name].value = updateData.value
      this.ff = Object.assign({}, this.ff)
    }
  }

  initGrid () {
    for (let i = 0; i < this.config.length; i++) {
      const e = this.config[i]
      if (this.ff[e.name]) {
        this.ff[e.name].name = e.name
        this.ff[e.name].osc = e.osc
        this.ff[e.name].type = e.type
        this.ff[e.name].value = e.value
        this.ff[e.name].ledOn = e.ledOn
        this.ff[e.name].ledOff = e.ledOff
      }
    }
    this.ff = Object.assign({}, this.ff)
  }

  getColor (btn:any) {
    let rtn = ''
    if (btn.value) {
      rtn = this.color[btn.ledOn]
    } else {
      rtn = this.color[btn.ledOff]
    }
    return rtn
  }

  color:Array<string> = [
    'display:inline;fill:#000000;opacity:0.5',
    'display:inline;fill:#00FF00;opacity:0.3',
    'display:inline;fill:#00FF00;opacity:1',
    'display:inline;fill:#FF0000;opacity:0.3',
    'display:inline;fill:#FF0000;opacity:1',
    'display:inline;fill:#FF8300;opacity:0.3',
    'display:inline;fill:#FF8300;opacity:1'
  ]

  openConfig (item:any) {
    EventBus.$emit('openConfig', item)
  }
}
</script>

<style>
.addPointer {
  cursor: pointer;
}
</style>
