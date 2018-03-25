// @flow

import {
  MIDI_SET_AVAILABLE,
  MIDI_SET_INPUTS,
  MIDI_SET_OUTPUTS,
  MIDI_SET_INPUT,
} from './constants';

export type MIDIInput = Object;
export type MIDIOutput = Object;

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

export type SetOutputs = {
  type: typeof MIDI_SET_OUTPUTS,
  meta: {
    outputs: Array<MIDIOutput>,
  },
};

export type SetActiveInput = {
  type: typeof MIDI_SET_INPUT,
  meta: {
    id: string,
  },
};

export type MidiActions =
  SetActiveInput |
  SetMidiAvailable |
  SetInputs |
  SetOutputs;

export type MidiState = {
  inputs: Array<MIDIInput>,
  outputs: Array<MIDIOutput>,
  hasMidi: boolean,
}
