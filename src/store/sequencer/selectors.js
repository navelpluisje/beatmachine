// @flow

import type { GlobalState } from '../types';
import type {
  SequencerState,
  SequencerSpeed,
  SequencerRunning,
  SequencerStopped,
  SequencerStepCount,
} from './types';

const getState = (state: GlobalState): SequencerState => state.sequencer;

export const getSpeed = (state: GlobalState): SequencerSpeed =>
  getState(state).speed;

export const isRunning = (state: GlobalState): SequencerRunning =>
  getState(state).isRunning;

export const isStopped = (state: GlobalState): SequencerStopped =>
  getState(state).isStopped;

export const getCurrentStep = (state: GlobalState): number =>
  getState(state).currentStep;

export const getStepCount = (state: GlobalState): SequencerStepCount =>
  getState(state).stepCount;

export const getEditGroup = (state: GlobalState): number =>
  getState(state).editGroup;

export const getLoop = (state: GlobalState): number =>
  getState(state).loop;

export const hasLoop = (state: GlobalState): boolean =>
  getState(state).loop !== -1;

export const showGrid = (state: GlobalState): boolean =>
  getState(state).showGrid;

export const getNextStepCount = (state: GlobalState): number => {
  const sequencer = getState(state);

  if (sequencer.stepCount === 64) {
    return sequencer.stepCount;
  }
  return sequencer.stepCount + 16;
};

export const getPreviousStepCount = (state: GlobalState): number => {
  const sequencer = getState(state);

  if (sequencer.stepCount === 16) {
    return sequencer.stepCount;
  }
  return sequencer.stepCount - 16;
};

export default null;
