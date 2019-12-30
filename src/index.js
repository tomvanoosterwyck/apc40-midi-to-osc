var easymidi = require('easymidi');
const osc = require('osc')

var udpPort = new osc.UDPPort({
  localAddress: "0.0.0.0",
  localPort: 9000,
  metadata: true
})
udpPort.open()

let chamsysIP = '10.36.0.5'
let outboundPort = 8000

var inputs = easymidi.getInputs();
var outputs = easymidi.getOutputs();

let inputName = null
let outputName = null

inputs.forEach(e => {
  if (e.match(/APC40/)) {
    inputName = e
  }
})
outputs.forEach(e => {
  if (e.match(/APC40/)) {
    outputName = e
  }
})

let input = new easymidi.Input(inputName)
let output = new easymidi.Output(outputName)
udpPort.on('ready', () => {
  udpPort.on('message', (val) => {
    console.log(val)
  })
  udpPort.send({address: '/feedback/exec'}, chamsysIP, outboundPort)
  console.log('Running')
  input.on('cc', params => {
    console.log(params)
    if (params.controller === 7 | (params.controller === 14 & params.channel === 0)) {
      let outport = 0
      if (params.controller === 14 & params.channel === 0) {
        outport = 9
      } else {
        outport = params.channel + 1
      }
      let v = mapValues(params.value, 0, 127, 0, 1)
      udpPort.send({
        address: `/exec/5/${outport}`,
        args: [
          {
            type: 'f',
            value: v
          }
        ]
      }, chamsysIP, outboundPort)
    }
    if (params.controller >= 16 && params.controller <= 23) {
      let outport = params.controller + 4
      let v = mapValues(params.value, 0, 127, 0, 1)
      udpPort.send({
        address: `/exec/5/${outport}`,
        args: [
          {
            type: 'f',
            value: v
          }
        ]
      }, chamsysIP, outboundPort)
    }
    if (params.controller >= 48 && params.controller <= 55) {
      let outport = params.controller - 37
      let v = mapValues(params.value, 0, 127, 0, 1)
      udpPort.send({
        address: `/exec/5/${outport}`,
        args: [
          {
            type: 'f',
            value: v
          }
        ]
      }, chamsysIP, outboundPort)
    }
    output.send('cc', params)
    output.send('cc', {
      ...params,
      controller: params.controller + 9,
      value: 1
    })
  })
  input.on('noteon', params => {
    console.log(params)
    output.send('noteon', {
      ...params,
      velocity: 2
    })
    if (params.note === 51 && (params.channel >= 0 || params.channel <= 7)) {
      let outport = 41 + params.channel
      udpPort.send({
        address: `/exec/5/${outport}`,
        args: [
          {
            type: 'f',
            value: 127
          }
        ]
      }, chamsysIP, outboundPort)
    }
  })
  input.on('noteoff', params => {
    output.send('noteon', {
      ...params,
      velocity: 1
    })
    if (params.note === 51 && (params.channel >= 0 || params.channel <= 7)) {
      let outport = 41 + params.channel
      console.log(outport)
      udpPort.send({
        address: `/exec/5/${outport}`,
        args: [
          {
            type: 'f',
            value: 0
          }
        ]
      }, chamsysIP, outboundPort)
    }
  })
})


output.send('sysex', [0xf0, 0x47, 0x00, 0x73, 0x60, 0x00, 0x04, 0x42, 0x08, 0x04, 0x01, 0xf7])

function mapValues (num, in_min, in_max, out_min, out_max) {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}