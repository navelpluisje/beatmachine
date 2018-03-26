// @flow

import {
  MIDI_SET_AVAILABLE,
  MIDI_SET_INPUTS,
  MIDI_SET_DEVICE,
  MIDI_TOGGLE_SETTINGS,
  MIDI_SET_PORT,
} from './constants';

export type MIDIInput = {
  id: string,
  name: string,
};

export type SetMidiAvailable = {
  type: typeof MIDI_SET_AVAILABLE,
  meta: {
    hasMidi: boolean,
  },
};

export type SetInputs = {
  type: typeof MIDI_SET_INPUTS,
  meta: {
    inputs: Array<MIDIInput>,
  },
};

export type SetActiveDevice = {
  type: typeof MIDI_SET_DEVICE,
  meta: {
    deviceId: string,
  },
};

export type ToggleMidiSettings = {
  type: typeof MIDI_TOGGLE_SETTINGS,
};

export type SetPort = {
  type: typeof MIDI_SET_PORT,
  meta: {
    port: number,
  },
};

export type MidiActions =
  SetActiveDevice |
  SetMidiAvailable |
  SetInputs |
  ToggleMidiSettings |
  SetPort;

export type MidiState = {
  inputs: Array<MIDIInput>,
  hasMidi: boolean,
  showSettings: boolean,
  activeDevice: string,
  port: number,
}
