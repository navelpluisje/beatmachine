let running = false;
let speed = 125;

const run = () => {
  postMessage('nextStep');
  if (running) {
    setTimeout(run, speed);
  }
};

onmessage = (evt) => {
  switch (evt.data[0]) {
  case 'runSequencer':
    if (!running && evt.data[1]) {
      running = evt.data[1]; // eslint-disable-line
      run();
    } else {
      running = evt.data[1]; // eslint-disable-line
    }
    break;

  case 'setSequencerSpeed':
    speed = 15000 / evt.data[1];
    break;
  default:
  }
};
