const express = require('express');
const https = require('https');
const fs = require('fs');

const { Server } = require('socket.io');
const { measureDistance } = require('./distanceMeasurement');

const key = fs.readFileSync('ca.key', 'utf-8');
const cert = fs.readFileSync('ca.crt', 'utf-8');

const app = express();

server = https.createServer({ key, cert }, app);

const io = new Server(server, {
  cors: {
    // origin: 'https://localhost:5173',
    origin: 'https://192.168.1.208:5173',
    methods: ['GET', 'POST'],
  },
});


const updateDistance = async () => {
  const distance = await measureDistance();

  console.log('distance:', distance);
  io.emit('distance', distance);
};

updateDistance();

const interval = setInterval(updateDistance, 500);

app.get('/', (req, res) => {
  res.send('hello');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

process.on('SIGINT', (_) => {
  clearInterval(interval);
  server.close();
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});