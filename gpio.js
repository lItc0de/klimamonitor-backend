const Gpio = require('onoff').Gpio;

const trigger = new Gpio(18, 'out');
const echo = new Gpio(24, 'in');

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// const getDistance = async () => {
//   const startTime = Date.now();
//   console.log('startTime:', startTime);
//   trigger.writeSync(1);

//   const watch = () => new Promise((resolve, reject) => {
//     echo.watch((err, value) => {
//       if (err) {
//         reject(err);
//       }

//       console.log('value:', value);

//       if (value === 1) {
//         echo.unwatchAll();
//         resolve();
//       }
//     });
//   });

//   console.log('read:', echo.readSync());

//   await watch();
//   const stopTime = Date.now();
//   console.log('stopTime:', startTime);

//   trigger.writeSync(0);

//   const timeElapsed = stopTime - startTime;
//   const distance = (timeElapsed * 34300) / 2;

//   console.log('time elapsed:', timeElapsed);
//   console.log('distance:', distance);

//   return distance;
// };

// const interval = setInterval(getDistance, 1000);


const getDistance = async () => {
  trigger.writeSync(1);
  await sleep(0.01);
  trigger.writeSync(0);

  let startTime = Date.now();
  let stopTime = Date.now();

  while (echo.readSync() === 0) {
    startTime = Date.now();
  }

  while (echo.readSync() === 1) {
    stopTime = Date.now();
  }

  const timeElapsed = stopTime - startTime;
  const distance = (timeElapsed * 34300) / 2;

  console.log('time elapsed:', timeElapsed);
  console.log('distance:', distance);

  return distance;
}

const interval = setInterval(getDistance, 2000);

process.on('SIGINT', (_) => {
  trigger.unexport();
  echo.unexport();
  clearInterval(interval);
});
