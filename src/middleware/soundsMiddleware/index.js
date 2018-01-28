// @flow

import Sounds from './sounds';
import {
  DRUMKIT_SET_ACTIVE,
  SOUND_PLAY_ONE,
  SEQUENCER_SET_CURRENT_STEP,
} from '../../store/constants';
import { SoundException } from '../helpers';
import type { Sounds as SoundsType } from './types';
import type { AllActions } from '../../store/actions/types';

const soundsMiddleware = (soundsData: SoundsType) => {
  if (!Array.isArray(soundsData)) {
    throw new SoundException('Please provide an object to soundsMiddleware!');
  }

  // Set up our sounds object, and pre-load all audio files.
  // Our sounds object basically just takes the options provided to the
  // middleware, and constructs a new Howl object for each one with them.
  const sounds = new Sounds('TR808', soundsData);

  return (store: *) => (next: Function) => (action: AllActions) => { // eslint-disable-line
    // Ignore actions that haven't specified a sound.
    switch (action.type) {
    case SOUND_PLAY_ONE:
      sounds.play(action.meta, action.meta.master);
      break;

    case DRUMKIT_SET_ACTIVE:
      sounds.setDrumkit(action.meta.drumkit);
      break;

    case SEQUENCER_SET_CURRENT_STEP:
      sounds.playAll(action.meta.sounds, action.meta.master);
      break;

    default:
    }

    return next(action);
  };
};

export default soundsMiddleware;
