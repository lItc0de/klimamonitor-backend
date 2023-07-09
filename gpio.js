// const Gpio = require('onoff').Gpio; // Gpio class
// const led = new Gpio(17, 'out'); // Export GPIO17 as an output

// // Toggle the state of the LED connected to GPIO17 every 200ms
// const iv = setInterval((_) => led.writeSync(led.readSync() ^ 1), 200);

// // Stop blinking the LED after 5 seconds
// setTimeout((_) => {
//   clearInterval(iv); // Stop blinking
//   led.unexport(); // Unexport GPIO and free resources
// }, 30000);

const Gpio = require('onoff').Gpio;

const trigger = new Gpio(17, 'out');
const echo = new Gpio(24, 'in', 'rising');

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
  let startTime;
  let duration;

  trigger.writeSync(0);

  console.log('Waiting for sensor to settle');

  await sleep(2000);

  console.log('Calculating distance');

  trigger.writeSync(1);
  await sleep(0.01);
  trigger.writeSync(0);

  echo.watch((err, value) => {
    console.log('Change', value);
  });

  while (echo.readSync() === 0) {
    startTime = process.hrtime();
  }

  console.log('In between');
  duration = process.hrtime(startTime);

  while (echo.readSync() === 1) {
    duration = process.hrtime(startTime);
  }


  console.log('Duration:', duration);



  const distance = Math.round(duration[0] * 34300 + (duration[1] * 34300) * 10^-9) / 2;
  console.log('Distance:', distance, 'cm');

  echo.unwatchAll();
}

test();

process.on('SIGINT', (_) => {
  trigger.unexport();
  echo.unexport();
  // clearInterval(interval);
});
