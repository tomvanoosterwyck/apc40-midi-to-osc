<template>
  <div>
    <v-list dense v-if="item">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{item.name}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-text-field label="OSC address" v-model="item.osc" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="item.type !== 'Fader'">
          <v-list-item-content>
            <v-select
              label="Led off"
              v-model="item.ledOff"
              :items="ledColors"
              />
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="item.type !== 'Fader'">
          <v-list-item-content>
            <v-select
              label="Led on"
              v-model="item.ledOn"
              :items="ledColors"
              />
          </v-list-item-content>
        </v-list-item>
      </v-list>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch, Emit } from 'vue-property-decorator'
import { EventBus } from '../EventBus'
import buttonsRight from './json/buttonsRight.json'

@Component
export default class Config extends Vue {
  item:any = null
  ledColors = [
    { text: 'off', value: 0 },
    { text: 'green', value: 1 },
    { text: 'green blink', value: 2 },
    { text: 'red', value: 3 },
    { text: 'red blink', value: 4 },
    { text: 'orange', value: 5 },
    { text: 'orange blink', value: 6 }
  ]

  mounted () {
    EventBus.$on('openConfig', (data:any) => {
      this.item = data
    })
  }
}

</script>
