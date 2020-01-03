import http from 'http'
import express from 'express'
import * as WebSocket from 'ws'
import CustEvent from './classes/CustEvent'
import cors from 'cors'

const app = express()

const server = http.createServer(app)

const wws = new WebSocket.Server({ server })

wws.on('connection', (ws) => {
  CustEvent.on('sendMidi',(val) => {
    ws.send(JSON.stringify({event: 'sendMidi', data: val}))
  })
  CustEvent.on('sendOsc',(val) => {
    ws.send(JSON.stringify({event: 'sendOsc', data: val}))
  })

  CustEvent.emit('clientConnected')

  CustEvent.on('sendToClient', (val) => {
    console.log('test!')
    console.log(val)
    ws.send(JSON.stringify({event: 'init', data: val}))
  })
})

app.use(cors())

app.get('/init', async (req, res) => {
  CustEvent.once('getInit', (val) => {
    res.send(val)
  })
  CustEvent.emit('clientConnected')
})

server.listen(8001, () => {
  console.log('socket server is running on port 8001')
})