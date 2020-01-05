<template>
  <div>
    <svg
      :width="793.70081 * multiplier"
      :height="590 * multiplier"
      class="ma-2"
      viewBox="0 0 210 156.10416"
      version="1.1"
      id="svg8"
      inkscape:version="0.92.4 (5da689c313, 2019-01-14)"
      sodipodi:docname="APC40-plain.svg">
      <Frame />
      <Grid :config="config" />
      <SmallQue :config="config" />
      <Buttons-Right :config="config" />
      <Track-Control-Knobs :config="config" />
      <Device-Control-Knobs :config="config" />
      <Faders />
      <Fader-Caps :config="config" />
      <Track-Buttons :config="config" />
      <Labels />
    </svg>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch, Emit } from 'vue-property-decorator'
import Frame from '../components/apc40/Frame.vue'
import SmallQue from '../components/apc40/SmallQue.vue'
import Grid from '../components/apc40/Grid.vue'
import ButtonsRight from '../components/apc40/ButtonsRight.vue'
import TrackControlKnobs from '../components/apc40/TrackControlKnobs.vue'
import DeviceControlKnobs from '../components/apc40/DeviceControlKnobs.vue'
import Faders from '../components/apc40/Faders.vue'
import TrackButtons from '../components/apc40/TrackButtons.vue'
import FaderCaps from '../components/apc40/FaderCaps.vue'
import Labels from '../components/apc40/Labels.vue'
import { EventBus } from '../EventBus'
import axios from 'axios'

@Component({
  components: {
    Frame,
    SmallQue,
    Grid,
    TrackControlKnobs,
    DeviceControlKnobs,
    ButtonsRight,
    Faders,
    TrackButtons,
    FaderCaps,
    Labels
  }
})
export default class APC40 extends Vue {
  multiplier: number = 1.7
  config:Array<any> = []
  ws:WebSocket | null = null

  mounted () {
    this.fetchStatus()
    this.ws = new WebSocket('ws://localhost:8001')
    this.ws.onopen = () => {
      console.log('open')
    }
    let vm = this
    this.ws.onmessage = function (msg) {
      let data = JSON.parse(msg.data)
      // console.log(data)
      if (data.event === 'sendOsc') {
        EventBus.$emit('sendOsc', data.data)
        let tmp:Array<any> = []
        vm.config.forEach(e => {
          if (e.name === data.data.name) {
            e.value = data.data.value
          }
          tmp.push(e)
        })
        vm.config = tmp
      }
    }
  }

  async fetchStatus () {
    let data = await axios('http://localhost:8001/init')
    this.config = data.data
  }
}
</script>

<style>

</style>
