import { toFloat } from '../mapValues.js'

export default class Fader {
  constructor (mapping, config, osc, midiIn, midiOut) {
    this.mapping = mapping
    this.config = config
    this.osc = osc
    this.midiOut = midiOut
    // console.log('init')
    let vm = this
    osc.on('message', (val) => {
      if (val.address === config.osc) {
        //TODO handle incomming OSC message
      }
    })
    midiIn.on('cc', (val) => {
      if (val.channel === vm.mapping.channel && val.controller === vm.mapping.controller) {
        vm.handleMidiIn(val.value)
      }
    })
  }

  handleMidiIn (val) {
    let value = toFloat(val)
    // console.log(value)
    console.log(`moved fader ${this.mapping.name} sending to: ${this.mapping.osc} value: ${value}`)
    this.sendOsc(value)
  }

  sendOsc (value) {
    this.osc.send({
      address: this.mapping.osc,
      args: [
        {
          type: 'f',
          value: value
        }
      ]
    }, this.config.magicQIp, this.config.oscOutPort)
  }
}