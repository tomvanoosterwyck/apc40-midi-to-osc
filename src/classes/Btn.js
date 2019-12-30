import { toFloat } from '../mapValues.js'

export default class Btn {
  constructor (mapping, config, osc, midiIn, midiOut) {
    this.mapping = mapping
    this.config = config
    this.osc = osc
    this.midiOut = midiOut
    this.value = false
    // console.log('init')
    let vm = this
    osc.on('message', (val) => {
      // console.log(`${val.address} === ${mapping.osc}`)
      if (val.address === mapping.osc) {
        if (val.args[0].value === 1) {
          this.value = true
        } else {
          this.value = false
        }
      }
    })
    midiIn.on('noteon', (val) => {
      if (val.channel === vm.mapping.channel && val.note === vm.mapping.note) {
        vm.handleMidiIn(1)
      }
    })
    midiIn.on('noteoff', (val) => {
      if (val.channel === vm.mapping.channel && val.note === vm.mapping.note) {
        vm.handleMidiIn(0)
      }
    })
  }

  handleMidiIn (val) {
    let send = 0
    // console.log(this.mapping)
    if (this.mapping.btnMode === 'toggle') {
      if (val === 1) {
        // console.log(val)
        this.value = !this.value
        if (this.value) {
          send = 1
          console.log(`pressed button ${this.mapping.name} sending to: ${this.mapping.osc} value: ${send}`)
          this.sendOsc(send)
        } else {
          send = 0
          console.log(`pressed button ${this.mapping.name} sending to: ${this.mapping.osc} value: ${send}`)
          this.sendOsc(send)
        }
      }
    } else {
      send = val
      console.log(`pressed button ${this.mapping.name} sending to: ${this.mapping.osc} value: ${send}`)
      this.sendOsc(send)
    }
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