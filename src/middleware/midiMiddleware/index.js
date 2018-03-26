// @flow

import { MIDI_SET_DEVICE, MIDI_SET_PORT } from '../../store/midi/constants';
import { setMidiAvailable } from '../../store/midi/actions';
import { MidiException } from '../helpers';
import MidiHandler from './midiHandler';
import type { AllActions } from '../../store/types';

const midiMiddleware = () => {
  let init = true;
  let hasMidi = false;
  let midiHandler = null;

  if (navigator.requestMIDIAccess) {
    hasMidi = true;
  } else {
    throw new MidiException('Web workers are not supported in ypur browser, but needed for tis application');
  }

  return (store: *) => (next: Function) => (action: AllActions) => { // eslint-disable-line
    // Ignore actions that haven't specified a sound.
    if (init && hasMidi) {
      init = false;
      const { dispatch } = store;
      midiHandler = new MidiHandler(dispatch);
      dispatch(setMidiAvailable(hasMidi));
    }

    switch (action.type) {
    case MIDI_SET_DEVICE:
      if (midiHandler !== null) {
        midiHandler.setMidiDevice(action.meta.deviceId);
      }
      break;

    case MIDI_SET_PORT:
      if (midiHandler !== null) {
        midiHandler.setMidiPort(action.meta.port);
      }
      break;

    default:
    }

    return next(action);
  };
};

export default midiMiddleware;
