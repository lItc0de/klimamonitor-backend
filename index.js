const express = require('express');
const https = require('https');
const fs = require('fs');

const { Server } = require('socket.io');

const key = fs.readFileSync('ca.key', 'utf-8');
const cert = fs.readFileSync('ca.crt', 'utf-8');

const app = express();

server = https.createServer({ key, cert }, app);

const io = new Server(server, {
  cors: {
    origin: 'https://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

app.get('/', (req, res) => {
  res.send('hello');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  // socket.emit('distance', 2000);
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

let distance = 3;

const updateDistance = () => {
  io.emit('distance', distance);
  distance += 50;

  if (distance >= 3000) clearInterval(interval);
}

const interval = setInterval(updateDistance, 500);
