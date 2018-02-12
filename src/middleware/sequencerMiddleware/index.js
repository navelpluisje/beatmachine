// @flow

import {
  SEQUENCER_SET_RUNNING,
  SEQUENCER_SET_STOPPED,
  SEQUENCER_SET_SPEED,
} from '../../store/constants';
import { setNextStep } from '../../store/actions/sequencer';
import { WorkerException } from '../helpers';
import type { AllActions } from '../../store/actions/types';

const sequencerMiddleware = () => {
  if (!window.Worker) {
    throw new WorkerException('Web workers are not supported in ypur browser, but needed for tis application');
  }

  const worker = new Worker('js/worker.js');

  // eslint-disable-next-line no-unused-vars
  const next = (dispatch: Dispatch<*>) => {
    dispatch(setNextStep());
  };

  return (store: *) => (next: Function) => (action: AllActions & *) => { // eslint-disable-line
    // Ignore actions that haven't specified a sound.
    if (worker.onmessage === null) {
      const { dispatch } = store;
      worker.onmessage = (evt) => {
        if (evt.data === 'nextStep') {
          next(dispatch);
        }
      };
    }

    switch (action.type) {
    case SEQUENCER_SET_RUNNING:
      worker.postMessage(['runSequencer', action.running]);
      break;

    case SEQUENCER_SET_STOPPED:
      worker.postMessage(['runSequencer', false]);
      break;

    case SEQUENCER_SET_SPEED:
      worker.postMessage(['setSequencerSpeed', action.speed]);
      break;

    default:
    }

    return next(action);
  };
};

export default sequencerMiddleware;
