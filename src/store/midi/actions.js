// @flow

import {
  MIDI_SET_INPUTS,
  MIDI_SET_DEVICE,
  MIDI_SET_AVAILABLE,
  MIDI_TOGGLE_SETTINGS,
  MIDI_SET_PORT,
} from './constants';
import type {
  SetActiveDevice,
  SetMidiAvailable,
  SetInputs,
  SetPort,
} from './types';

export const setMidiAvailable = (hasMidi: boolean = false): SetMidiAvailable => ({
  type: MIDI_SET_AVAILABLE,
  meta: {
    hasMidi,
  },
});

export const setInputs = (inputs: Array<Object>): SetInputs => ({
  type: MIDI_SET_INPUTS,
  meta: {
    inputs,
  },
});

export const setActiveDevice = (deviceId: string): SetActiveDevice => ({
  type: MIDI_SET_DEVICE,
  meta: {
    deviceId,
  },
});

export const setPort = (port: number): SetPort => ({
  type: MIDI_SET_PORT,
  meta: {
    port,
  },
});

export const toggleSettings = () => ({
  type: MIDI_TOGGLE_SETTINGS,
});

export default null;
