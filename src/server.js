import easymidi from 'easymidi'
import osc from 'osc'
import mapping from './mapping.json'
import Fader from './classes/Fader.js'
import Btn from './classes/Btn.js'
import BtnLed from './classes/BtnLed.js'
import PotMeter from './classes/PotMeter.js'

let config = {
  oscserverIp: "localhost",
  oscInPort: 9000,
  magicQIp: "localhost",
  oscOutPort: 8000
}

let udpPort = new osc.UDPPort({
  localAddress: config.oscserver,
  localPort: config.oscInPort,
  metadata: true
})
udpPort.open()

const inputs = easymidi.getInputs();
const outputs = easymidi.getOutputs();

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
console.log(input, output)

output.send('sysex', [0xf0, 0x47, 0x00, 0x73, 0x60, 0x00, 0x04, 0x42, 0x08, 0x04, 0x01, 0xf7])


udpPort.on('ready', () => {
  console.log('running')
  setTimeout(() => {
    udpPort.send({address: '/feedback/pb+exec'}, config.magicQIp, config.oscOutPort)
  },100)
  setInterval(() => {
    udpPort.send({address: '/feedback/pb+exec'}, config.magicQIp, config.oscOutPort)
  }, 10000)
  let faders = []
  let btns = []
  let btnLeds = []
  let potMeters = []
  mapping.forEach(e => {
    if (e.type === 'Fader') {
      faders.push(new Fader(e, config, udpPort, input, output))
    } else if (e.type === 'Btn') {
      btns.push(new Btn(e, config, udpPort, input, output))
    } else if (e.type === 'BtnLed' || e.type === 'BtnBlink' || e.type === 'GridBtn') {
      btnLeds.push(new BtnLed(e, config, udpPort, input, output))
    } else if (e.type === 'PotMeter') {
      potMeters.push(new PotMeter(e, config, udpPort, input, output))
    }
  })
  console.log('faders: ', faders.length)
  console.log('btns: ', btns.length)
  console.log('btnLeds: ', btnLeds.length)
  console.log('potMeters: ', potMeters.length)
  // console.log(faders)
})