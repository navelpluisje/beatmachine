// @flow

import {
  MIDI_SET_INPUTS,
  MIDI_SET_OUTPUTS,
  MIDI_SET_INPUT,
  MIDI_SET_AVAILABLE,
} from './constants';
import { MASTER_TOGGLE_DISTORTION } from '../master/constants';
import type {
  SetActiveInput,
  SetMidiAvailable,
  SetInputs,
  SetOutputs,
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

export const setOutputs = (outputs: Array<Object>): SetOutputs => ({
  type: MIDI_SET_OUTPUTS,
  meta: {
    outputs,
  },
});

export const setActiveInput = (id: string): SetActiveInput => ({
  type: MIDI_SET_INPUT,
  meta: {
    id,
  },
});

export const toggleDistortion = () => ({
  type: MASTER_TOGGLE_DISTORTION,
});

export default null;
