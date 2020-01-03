import { toFloat } from '../mapValues.js'
import CustEvent from './CustEvent'

export default class Fader {
  constructor (mapping, config, osc, midiIn, midiOut) {
    this.mapping = mapping
    this.mapping.value = 0
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
    CustEvent.emit('sendOsc', {name: this.mapping.name, osc: this.mapping.osc, value: value})
    this.sendOsc(value)
  }

  sendOsc (value) {
    this.mapping.value = value
    this.osc.send({
      address: this.mapping.osc,
      args: [
        {
          type: 'f',
          value: value
        }
      ]
    }, this.config.oscIpIp, this.config.oscOutPort)
  }
}