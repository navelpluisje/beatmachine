// @flow

import {
  MIDI_SET_INPUTS,
  MIDI_SET_OUTPUTS,
  MIDI_SET_AVAILABLE,
} from './constants';
import type { MidiState, MidiActions } from './types';

const initialState = {
  inputs: [],
  outputs: [],
  hasMidi: false,
};

export default (state: MidiState = initialState, action: MidiActions): MidiState => {
  switch (action.type) {
  case MIDI_SET_INPUTS:
    return {
      ...state,
      inputs: action.meta.inputs,
    };

  case MIDI_SET_OUTPUTS:
    return {
      ...state,
      outputs: action.meta.outputs,
    };

  case MIDI_SET_AVAILABLE:
    return {
      ...state,
      hasMidi: action.meta.hasMidi,
    };

  default:
    return state;
  }
};
