// @flow

import {
  SEQUENCER_SET_SPEED,
  SEQUENCER_SET_RUNNING,
  SEQUENCER_SET_STOPPED,
  SEQUENCER_SET_STEP_COUNT,
  SEQUENCER_SET_CURRENT_STEP,
  SEQUENCER_SET_EDIT_GROUP,
  SEQUENCER_SET_LOOP,
  SEQUENCER_TOGGLE_GRID,
} from '../constants';
import type {
  SequencerSpeed,
  SequencerRunning,
} from '../types';
import type {
  SequencerSetSpeed,
  SequencerSetRunning,
  SequencerSetStopped,
  SequencerSetEditGroup,
  SequencerToggleGrid,
} from './types';
import {
  getNextStepCount,
  getPreviousStepCount,
  getCurrentStep,
  getStepCount,
  getLoop,
  isRunning,
} from '../selectors/sequencer';
import { getActiveSounds } from '../selectors/channels';
import { getSoundSettings } from '../selectors/sounds';
import { getMaster } from '../selectors/master';

export const setSpeed = (speed: SequencerSpeed): SequencerSetSpeed => ({
  type: SEQUENCER_SET_SPEED,
  speed,
});

export const setSequencerRunning = (running: SequencerRunning): SequencerSetRunning => ({
  type: SEQUENCER_SET_RUNNING,
  running,
});

export const setSequencerStopped = (): SequencerSetStopped => ({
  type: SEQUENCER_SET_STOPPED,
});

export const setSequencerEditGroup = (group: number): SequencerSetEditGroup => ({
  type: SEQUENCER_SET_EDIT_GROUP,
  meta: {
    group,
  },
});

export const toggleSequencerGrid = (): SequencerToggleGrid => ({
  type: SEQUENCER_TOGGLE_GRID,
});

export const setNextStep = () =>
  (dispatch: Dispatch<*>, getState: Function) => {
    const state = getState();
    if (!isRunning(state)) { return false; }

    let step = getCurrentStep(state) + 1;
    const max = getStepCount(state);
    const master = getMaster(state);
    const loop = getLoop(state);

    if (loop === -1 && (step === max || (max < step && step % 16 === 0))) {
      step = 0;
    }

    if (loop > -1 && (Math.floor(step / 16) === loop + 1 && step % 16 === 0)) {
      step = loop * 16;
    }

    const sounds = getActiveSounds(state, step).reduce((accumulator, sound) => {
      const result = [...accumulator];
      result.push({
        sound,
        settings: getSoundSettings(state, sound),
      });
      return result;
    }, []);


    dispatch({
      type: SEQUENCER_SET_CURRENT_STEP,
      meta: {
        step,
        sounds,
        master,
      },
    });
  };

export const setNextStepCount = () =>
  (dispatch: Dispatch<*>, getState: Function) => {
    dispatch({
      type: SEQUENCER_SET_STEP_COUNT,
      steps: getNextStepCount(getState()),
    });
  };

export const setPreviousStepCount = () =>
  (dispatch: Dispatch<*>, getState: Function) => {
    dispatch({
      type: SEQUENCER_SET_STEP_COUNT,
      steps: getPreviousStepCount(getState()),
    });
  };

export const toggleLoop = () =>
  (dispatch: Dispatch<*>, getState: Function) => {
    const state = getState();
    let loop = getLoop(state);
    if (loop === -1) {
      loop = Math.floor(getCurrentStep(state) / 16);
    } else {
      loop = -1;
    }

    dispatch({
      type: SEQUENCER_SET_LOOP,
      loop,
    });
  };

export default null;
