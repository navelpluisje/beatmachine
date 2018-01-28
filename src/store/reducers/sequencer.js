// @flow

import {
  INITIAL_SETTINGS,
  SEQUENCER_SET_SPEED,
  SEQUENCER_SET_RUNNING,
  SEQUENCER_SET_STOPPED,
  SEQUENCER_SET_STEP_COUNT,
  SEQUENCER_SET_CURRENT_STEP,
  SEQUENCER_SET_ACTIVE_CHANNEL,
  SEQUENCER_SET_EDIT_GROUP,
} from '../constants';
import type { SequencerActions } from '../actions/types';
import type { SequencerState } from '../types';

const defaultSequencer: SequencerState = {
  speed: 120,
  isRunning: false,
  isStopped: false,
  stepCount: 32,
  currentStep: -1,
  editGroup: -1,
  activeChannel: '',
};

export default (
  state: SequencerState = defaultSequencer,
  action: SequencerActions,
): SequencerState => {
  switch (action.type) {
  case INITIAL_SETTINGS:
    return defaultSequencer;

  case SEQUENCER_SET_SPEED:
    return {
      ...state,
      speed: action.speed,
    };

  case SEQUENCER_SET_RUNNING:
    return {
      ...state,
      isRunning: action.running,
      isStopped: false,
    };

  case SEQUENCER_SET_STOPPED:
    return {
      ...state,
      isRunning: false,
      isStopped: true,
      currentStep: -1,
    };

  case SEQUENCER_SET_STEP_COUNT:
    return {
      ...state,
      stepCount: action.steps,
    };

  case SEQUENCER_SET_CURRENT_STEP:
    return {
      ...state,
      currentStep: action.meta.step,
      sounds: action.meta.sounds,
    };

  case SEQUENCER_SET_EDIT_GROUP:
    return {
      ...state,
      editGroup: (action.meta.group === state.editGroup) ? -1 : action.meta.group,
    };

  case SEQUENCER_SET_ACTIVE_CHANNEL:
    return {
      ...state,
      activeChannel: action.channel,
    };

  default:
    return state;
  }
};
