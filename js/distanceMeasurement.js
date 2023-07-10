const { spawn } = require('child_process');
const path = require('path');

const measureDistance = () => {
  const promise = new Promise((resolve, reject) => {
    let res;

    const python = spawn('python', [path.resolve('python/gpio.py')]);

    python.stdout.on('data', function (data) {
      res = data.toString();
    });

    python.on('close', (code) => {
      resolve(res);
    });
  });

  return promise;
};

module.exports = { measureDistance };
