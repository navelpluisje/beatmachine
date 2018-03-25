// @flow

import {
  SEQUENCER_SET_SPEED,
  SEQUENCER_SET_RUNNING,
  SEQUENCER_SET_STOPPED,
  SEQUENCER_SET_STEP_COUNT,
  SEQUENCER_SET_CURRENT_STEP,
  SEQUENCER_SET_EDIT_GROUP,
  SEQUENCER_TOGGLE_GRID,
} from './constants';
import type { MasterState } from '../master/types';

export type SequencerSpeed = number;
export type SequencerRunning = boolean;
export type SequencerStopped = boolean;
export type SequencerStepCount = 16 | 32 | 48 | 64;

export type SequencerSetSpeed = {
  type: typeof SEQUENCER_SET_SPEED,
  speed: SequencerSpeed,
}

export type SequencerSetRunning = {
  type: typeof SEQUENCER_SET_RUNNING,
  running: SequencerRunning,
}

export type SequencerSetStopped = {
  type: typeof SEQUENCER_SET_STOPPED,
}

export type SequencerSetStepCount = {
  type: typeof SEQUENCER_SET_STEP_COUNT,
  steps: SequencerStepCount,
}

export type SequencerSetCurrentStep = {
  type: typeof SEQUENCER_SET_CURRENT_STEP,
  meta: {
    step: number,
    sounds: Array<Object>,
    master: MasterState,
  },
};

export type SequencerSetEditGroup = {
  type: typeof SEQUENCER_SET_EDIT_GROUP,
  meta: {
    group: number,
  },
};

export type SequencerToggleGrid = {
  type: typeof SEQUENCER_TOGGLE_GRID,
};

export type SequencerActions =
  SequencerSetSpeed |
  SequencerSetRunning |
  SequencerSetStopped |
  SequencerSetStepCount |
  SequencerSetCurrentStep;

export type SequencerState = {
  speed: SequencerSpeed,
  isRunning: SequencerRunning,
  isStopped: SequencerStopped,
  stepCount: SequencerStepCount,
  editGroup: number,
  currentStep: number,
  activeChannel: string,
  loop: number,
  showGrid: boolean,
};
