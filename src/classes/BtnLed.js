import CustEvent from './CustEvent'

export default class BtnLed {
  constructor (mapping, config, osc, midiIn, midiOut) {
    this.mapping = mapping
    this.config = config
    this.osc = osc
    this.midiOut = midiOut
    this.value = false
    // console.log('init')
    let vm = this
    this.sendMidi(mapping.ledOff)
    osc.on('message', (val) => {
      // console.log(`${val.address} === ${mapping.osc}`)
      if (val.address === mapping.osc) {
        if (val.args[0].value === 1) {
          vm.sendMidi(mapping.ledOn)
          this.value = true
        } else {
          vm.sendMidi(mapping.ledOff)
          this.value = false
        }
      }
    })
    midiIn.on('noteon', (val) => {
      // console.log(val)
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
          // console.log(`pressed button ${this.mapping.name} sending to: ${this.mapping.osc} value: ${send}`)
          CustEvent.emit('sendOsc', {name: this.mapping.name, osc: this.mapping.osc, value: send})
          this.sendOsc(send)
          this.sendMidi(this.mapping.ledOn)
        } else {
          send = 0
          // console.log(`pressed button ${this.mapping.name} sending to: ${this.mapping.osc} value: ${send}`)
          CustEvent.emit('sendOsc', {name: this.mapping.name, osc: this.mapping.osc, value: send})
          this.sendOsc(send)
          this.sendMidi(this.mapping.ledOff)

        }
      }
    } else {
      send = val
      // console.log(`pressed button ${this.mapping.name} sending to: ${this.mapping.osc} value: ${send}`)
      CustEvent.emit('sendOsc', {name: this.mapping.name, osc: this.mapping.osc, value: send})
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
    }, this.config.oscIpIp, this.config.oscOutPort)
    setTimeout(() => {
      this.osc.send({address: '/feedback/pb+exec'}, this.config.oscIpIp, this.config.oscOutPort)
    }, 100)
  }

  sendMidi(value) {
    CustEvent.emit('sendMidi', {channel: this.mapping.channel, noteCC: this.mapping.note, value: value})
    this.midiOut.send('noteon', {
      channel: this.mapping.channel,
      note: this.mapping.note,
      velocity: value
    })
  }
}