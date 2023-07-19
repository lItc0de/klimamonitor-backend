const express = require('express');
const https = require('https');
const fs = require('fs');

require('dotenv').config()

const { Server } = require('socket.io');
const { measureDistance } = require('./distanceMeasurement');

const key = fs.readFileSync('cert.key', 'utf-8');
const cert = fs.readFileSync('cert.crt', 'utf-8');

const app = express();

server = https.createServer({ key, cert }, app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST'],
  },
});

const emitDistance = (distance) => {
  io.emit('distance', distance);
}

measureDistance(emitDistance).then(() => {
  console.log('Measurement stopped');
});

app.get('/', (req, res) => {
  res.send('hello');
});

app.all(('*'), (req, res) => {
  console.log('incoming', req.hostname);
})

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

process.on('SIGINT', (_) => {
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
  server.close();
  process.exit(0);
});

