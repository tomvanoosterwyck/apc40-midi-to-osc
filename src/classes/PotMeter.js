import { toFloat, toNumber } from '../mapValues.js'

export default class PotMeter {
  constructor (mapping, config, osc, midiIn, midiOut) {
    this.mapping = mapping
    this.config = config
    this.osc = osc
    this.midiOut = midiOut

    this.setMode()
    // console.log('init')
    let vm = this
    osc.on('message', (val) => {
      if (val.address === mapping.osc) {
        if (val.args[0].value) {
          let v = toNumber(val.args[0].value)
          this.sendMidi(v)
        }
      }
    })
    midiIn.on('cc', (val) => {
      if (val.channel === vm.mapping.channel && val.controller === vm.mapping.controller) {
        vm.handleMidiIn(val.value)
      }
    })
  }

  handleMidiIn (val) {
    this.sendMidi(val)
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
  sendMidi(value) {
    this.midiOut.send('cc', {
      channel: this.mapping.channel,
      controller: this.mapping.controller,
      value: value
    })
  }

  setMode() {
    let mode = this.mapping.btnMode
    let v = 0
    if (mode === 'single') {
      v = 1
    } else if (mode === 'volume') {
      v = 2
    } else if (mode === 'pan') {
      v = 3
    } else {
      v = 0
    }
    this.midiOut.send('cc', {
      channel: this.mapping.channel,
      controller: this.mapping.modeChannel,
      value: v
    })
  }
}