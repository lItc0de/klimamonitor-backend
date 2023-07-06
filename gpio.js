const Gpio = require('onoff').Gpio;

const trigger = new Gpio(18, 'out');
const echo = new Gpio(24, 'in');

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const getDistance = async () => {
  trigger.writeSync(1);
  await sleep(0.01);
  trigger.writeSync(0);

  let startTime;
  let stopTime;

  while (echo.readSync === 0) {
    startTime = Date.now();
  }

  while (echo.readSync === 1) {
    stopTime = Date.now();
  }

  const timeElapsed = stopTime - startTime;
  const distance = (timeElapsed * 34300) / 2;

  return distance;
}

const interval = setInterval(getDistance, 1000);

process.on('SIGINT', (_) => {
  triger.unexport();
  echo.unexport();
  clearInterval(interval);
});
