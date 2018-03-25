// @flow

import { MIDI_SET_INPUT } from '../../store/midi/constants';
import { MASTER_SET_DISTORTION } from '../../store/master/constants';
import { setMidiAvailable, setActiveInput } from '../../store/midi/actions';
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
    case MIDI_SET_INPUT:
      if (midiHandler !== null) {
        midiHandler.setMidiDevice(action.meta.id);
      }
      break;

    case MASTER_SET_DISTORTION:
      store.dispatch(setActiveInput('1227536362'));
      break;

    default:
    }

    return next(action);
  };
};

export default midiMiddleware;
