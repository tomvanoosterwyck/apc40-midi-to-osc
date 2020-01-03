<template>
  <g
     inkscape:groupmode="layer"
     id="layer4"
     inkscape:label="grid"
     transform="translate(0,-140.89585)">
    <!-- <rect
       style="display:inline;opacity:0.5;fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:0.51242369;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
       id="grid1"
       width="8.7375755"
       height="8.7375765"
       x="14.386718"
       y="151.14133"
       inkscape:tile-cx="18.755505"
       inkscape:tile-cy="66.610127"
       inkscape:tile-w="9.249999"
       inkscape:tile-h="9.25"
       inkscape:tile-x0="14.130506"
       inkscape:tile-y0="61.985127">
    </rect> -->
    <rect
      v-for="(item, i) in gridItems"
      :key="i"
      @click="test(item)"
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

@Component
export default class Grid extends Vue {
  @Prop(Array) readonly config!: Array<any>

  get gridItems () {
    console.log('updating')
    let rtn:Array<any> = []
    this.config.forEach((e:any) => {
      this.items.forEach((j:any) => {
        if (j.id === e.name) {
          rtn.push(Object.assign(e, j))
        }
      })
    })
    return rtn
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

  items:Array<any> = [
    { id: 'grid1', width: 8.7375755, height: 8.7375755, x: 14.386718, y: 151.14133 },
    { id: 'grid9', width: 8.7375755, height: 8.7375755, x: 14.386718, y: 151.14133 + 11.08058 },
    { id: 'grid17', width: 8.7375755, height: 8.7375755, x: 14.386718, y: 151.14133 + 22.595833 },
    { id: 'grid25', width: 8.7375755, height: 8.7375755, x: 14.386718, y: 151.14133 + 33.922097 },
    { id: 'grid33', width: 8.7375755, height: 8.7375755, x: 14.386718, y: 151.14133 + 45.097171 },
    { id: 'stopclip1', width: 8.7375755, height: 8.7375755, x: 14.386718, y: 151.14133 + 57.812501 },
    { id: 'grid2', width: 8.7375755, height: 8.7375755, x: 14.386718 + 12.209999, y: 151.14133 },
    { id: 'grid10', width: 8.7375755, height: 8.7375755, x: 14.386718 + 12.209999, y: 151.14133 + 11.08058 },
    { id: 'grid18', width: 8.7375755, height: 8.7375755, x: 14.386718 + 12.143182, y: 151.14133 + 22.595833 },
    { id: 'grid26', width: 8.7375755, height: 8.7375755, x: 14.386718 + 12.209999, y: 151.14133 + 33.922097 },
    { id: 'grid34', width: 8.7375755, height: 8.7375755, x: 14.386718 + 12.209999, y: 151.14133 + 45.097171 },
    { id: 'stopclip2', width: 8.7375755, height: 8.7375755, x: 14.386718 + 12.209999, y: 151.14133 + 57.812501 },
    { id: 'grid3', width: 8.7375755, height: 8.7375755, x: 14.386718 + 24.419997, y: 151.14133 },
    { id: 'grid11', width: 8.7375755, height: 8.7375755, x: 14.386718 + 24.419997, y: 151.14133 + 11.08058 },
    { id: 'grid19', width: 8.7375755, height: 8.7375755, x: 14.386718 + 24.419997, y: 151.14133 + 22.595833 },
    { id: 'grid27', width: 8.7375755, height: 8.7375755, x: 14.386718 + 24.419997, y: 151.14133 + 33.922097 },
    { id: 'grid35', width: 8.7375755, height: 8.7375755, x: 14.386718 + 24.419997, y: 151.14133 + 45.097171 },
    { id: 'stopclip3', width: 8.7375755, height: 8.7375755, x: 14.386718 + 24.419997, y: 151.14133 + 57.812501 },
    { id: 'grid4', width: 8.7375755, height: 8.7375755, x: 14.386718 + 36.629996, y: 151.14133 },
    { id: 'grid12', width: 8.7375755, height: 8.7375755, x: 14.386718 + 36.629996, y: 151.14133 + 11.08058 },
    { id: 'grid20', width: 8.7375755, height: 8.7375755, x: 14.386718 + 36.629996, y: 151.14133 + 22.595833 },
    { id: 'grid28', width: 8.7375755, height: 8.7375755, x: 14.386718 + 36.629996, y: 151.14133 + 33.922097 },
    { id: 'grid36', width: 8.7375755, height: 8.7375755, x: 14.386718 + 36.629996, y: 151.14133 + 45.097171 },
    { id: 'stopclip4', width: 8.7375755, height: 8.7375755, x: 14.386718 + 36.629996, y: 151.14133 + 57.812501 },
    { id: 'grid5', width: 8.7375755, height: 8.7375755, x: 14.386718 + 48.839996, y: 151.14133 + 0 },
    { id: 'grid13', width: 8.7375755, height: 8.7375755, x: 14.386718 + 48.839996, y: 151.14133 + 11.08058 },
    { id: 'grid21', width: 8.7375755, height: 8.7375755, x: 14.386718 + 48.839996, y: 151.14133 + 22.595833 },
    { id: 'grid29', width: 8.7375755, height: 8.7375755, x: 14.386718 + 48.839996, y: 151.14133 + 33.922097 },
    { id: 'grid37', width: 8.7375755, height: 8.7375755, x: 14.386718 + 48.839996, y: 151.14133 + 45.097171 },
    { id: 'stopclip5', width: 8.7375755, height: 8.7375755, x: 14.386718 + 48.839996, y: 151.14133 + 57.812501 },
    { id: 'grid6', width: 8.7375755, height: 8.7375755, x: 14.386718 + 61.049993, y: 151.14133 + 0 },
    { id: 'grid14', width: 8.7375755, height: 8.7375755, x: 14.386718 + 61.049993, y: 151.14133 + 11.08058 },
    { id: 'grid22', width: 8.7375755, height: 8.7375755, x: 14.386718 + 61.049993, y: 151.14133 + 22.595833 },
    { id: 'grid30', width: 8.7375755, height: 8.7375755, x: 14.386718 + 61.049993, y: 151.14133 + 33.922097 },
    { id: 'grid38', width: 8.7375755, height: 8.7375755, x: 14.386718 + 61.049993, y: 151.14133 + 45.097171 },
    { id: 'stopclip6', width: 8.7375755, height: 8.7375755, x: 14.386718 + 61.049993, y: 151.14133 + 57.812501 },
    { id: 'grid7', width: 8.7375755, height: 8.7375755, x: 14.386718 + 73.259992, y: 151.14133 + 0 },
    { id: 'grid15', width: 8.7375755, height: 8.7375755, x: 14.386718 + 73.259992, y: 151.14133 + 11.08058 },
    { id: 'grid23', width: 8.7375755, height: 8.7375755, x: 14.386718 + 73.259992, y: 151.14133 + 22.595833 },
    { id: 'grid31', width: 8.7375755, height: 8.7375755, x: 14.386718 + 73.259992, y: 151.14133 + 33.922097 },
    { id: 'grid39', width: 8.7375755, height: 8.7375755, x: 14.386718 + 73.259992, y: 151.14133 + 45.097171 },
    { id: 'stopclip7', width: 8.7375755, height: 8.7375755, x: 14.386718 + 73.259992, y: 151.14133 + 57.812501 },
    { id: 'grid8', width: 8.7375755, height: 8.7375755, x: 14.386718 + 85.469992, y: 151.14133 + 0 },
    { id: 'grid16', width: 8.7375755, height: 8.7375755, x: 14.386718 + 85.469992, y: 151.14133 + 11.08058 },
    { id: 'grid24', width: 8.7375755, height: 8.7375755, x: 14.386718 + 85.469992, y: 151.14133 + 22.595833 },
    { id: 'grid32', width: 8.7375755, height: 8.7375755, x: 14.386718 + 85.469992, y: 151.14133 + 33.922097 },
    { id: 'grid40', width: 8.7375755, height: 8.7375755, x: 14.386718 + 85.469992, y: 151.14133 + 45.097171 },
    { id: 'stopclip8', width: 8.7375755, height: 8.7375755, x: 14.386718 + 85.469992, y: 151.14133 + 57.812501 },
    { id: 'scenelaunch1', width: 8.7375755, height: 8.7375755, x: 14.386718 + 98.039137, y: 151.14133 + 0 },
    { id: 'scenelaunch2', width: 8.7375755, height: 8.7375755, x: 14.386718 + 98.039137, y: 151.14133 + 11.08058 },
    { id: 'scenelaunch3', width: 8.7375755, height: 8.7375755, x: 14.386718 + 98.039137, y: 151.14133 + 22.595833 },
    { id: 'scenelaunch4', width: 8.7375755, height: 8.7375755, x: 14.386718 + 98.039137, y: 151.14133 + 33.922097 },
    { id: 'scenelaunch5', width: 8.7375755, height: 8.7375755, x: 14.386718 + 98.039137, y: 151.14133 + 45.097171 },
    { id: 'stopall', width: 8.7375755, height: 8.7375755, x: 14.386718 + 98.039137, y: 151.14133 + 57.812501 }
  ]

  test (item:any) {
    console.log(item)
  }
}
</script>

<style scoped>
.addPointer {
  cursor: pointer;
}
</style>
