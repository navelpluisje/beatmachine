// @flow

import {
  MIDI_SET_INPUTS,
  MIDI_SET_AVAILABLE,
  MIDI_TOGGLE_SETTINGS,
  MIDI_SET_DEVICE,
  MIDI_SET_PORT,
} from './constants';
import type { MidiState, MidiActions } from './types';

const initialState: MidiState = {
  inputs: [],
  hasMidi: false,
  showSettings: false,
  activeDevice: '',
  port: 0,
};

export default (state: MidiState = initialState, action: MidiActions): MidiState => {
  switch (action.type) {
  case MIDI_SET_INPUTS:
    return {
      ...state,
      inputs: action.meta.inputs,
    };

  case MIDI_SET_AVAILABLE:
    return {
      ...state,
      hasMidi: action.meta.hasMidi,
    };

  case MIDI_TOGGLE_SETTINGS:
    return {
      ...state,
      showSettings: !state.showSettings,
    };

  case MIDI_SET_DEVICE:
    return {
      ...state,
      activeDevice: action.meta.deviceId,
    };

  case MIDI_SET_PORT:
    return {
      ...state,
      port: action.meta.port,
    };

  default:
    return state;
  }
};
