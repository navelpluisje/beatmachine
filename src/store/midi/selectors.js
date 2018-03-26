// @flow

import type { GlobalState } from '../types';
import type { MidiState } from './types';

const getState = (state: GlobalState): MidiState => state.midi;

export const hasMidi = (state: GlobalState): $PropertyType<MidiState, 'hasMidi'> => {
  const midi = getState(state);

  return midi.hasMidi;
};

export const showMidi = (state: GlobalState): $PropertyType<MidiState, 'showSettings'> => {
  const midi = getState(state);

  return midi.showSettings;
};

export const getMidiInputs = (state: GlobalState): $PropertyType<MidiState, 'inputs'> => {
  const midi = getState(state);

  return midi.inputs;
};

export const getActiveDevice = (state: GlobalState): $PropertyType<MidiState, 'activeDevice'> => {
  const midi = getState(state);

  return midi.activeDevice;
};

export const getActivePort = (state: GlobalState): $PropertyType<MidiState, 'port'> => {
  const midi = getState(state);

  return midi.port;
};

export default null;
