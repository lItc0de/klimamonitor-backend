const { spawn } = require('child_process');
const path = require('path');

const measureDistance = (emitCallback) => {
  const promise = new Promise((resolve, reject) => {
    const python = spawn('python', [path.resolve('python/gpio.py')]);

    python.stdout.on('data', function (data) {
      const distance = data.toString();
      emitCallback(distance);
    });

    python.on('close', (code) => {
      resolve();
    });
  });

  return promise;
};

module.exports = { measureDistance };
