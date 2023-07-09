const Gpio = require('onoff').Gpio;

const trigger = new Gpio(4, 'out');
const echo = new Gpio(17, 'in', 'both');

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

// console.log('echoooooo', echo.readSync());

// const interval = setInterval(getDistance, 2000);


const test = async () => {
  console.log('echoooooo1', echo.readSync());

  trigger.writeSync(1);
  await sleep(0.01);

  console.log('echoooooo2', echo.readSync());

  await sleep(1);

  console.log('echoooooo3', echo.readSync());

  await sleep(10);

  console.log('echoooooo4', echo.readSync());

  await sleep(100);

  console.log('echoooooo5', echo.readSync());

  await sleep(1000);

  console.log('echoooooo6', echo.readSync());

  await sleep(1000);

  console.log('echoooooo7', echo.readSync());

  await sleep(1000);

  console.log('echoooooo8', echo.readSync());

  await sleep(1000);

  console.log('echoooooo9', echo.readSync());

  trigger.writeSync(0);

  await sleep(1000);

  console.log('echoooooo10', echo.readSync());
}



test();

process.on('SIGINT', (_) => {
  trigger.unexport();
  echo.unexport();
  clearInterval(interval);
});
