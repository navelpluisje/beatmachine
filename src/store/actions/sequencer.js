// @flow

import {
  SEQUENCER_SET_SPEED,
  SEQUENCER_SET_RUNNING,
  SEQUENCER_SET_STOPPED,
  SEQUENCER_SET_STEP_COUNT,
  SEQUENCER_SET_CURRENT_STEP,
  SEQUENCER_SET_EDIT_GROUP,
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
} from './types';
import {
  getNextStepCount,
  getPreviousStepCount,
  getCurrentStep,
  getStepCount,
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

export const setNextStep = () =>
  (dispatch: Function, getState: Function) => {
    const state = getState();
    if (!isRunning(state)) { return false; }

    const step = getCurrentStep(state);
    const max = getStepCount(state);
    const next = step === max - 1 ? 0 : step + 1;
    const master = getMaster(state);

    const sounds = getActiveSounds(state, next).reduce((accumulator, sound) => {
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
        step: next,
        sounds,
        master,
      },
    });
  };

export const setNextStepCount = () =>
  (dispatch: Function, getState: Function) => {
    dispatch({
      type: SEQUENCER_SET_STEP_COUNT,
      steps: getNextStepCount(getState()),
    });
  };

export const setPreviousStepCount = () =>
  (dispatch: Function, getState: Function) => {
    dispatch({
      type: SEQUENCER_SET_STEP_COUNT,
      steps: getPreviousStepCount(getState()),
    });
  };

export default null;
