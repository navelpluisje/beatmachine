// @flow

import {
  SOUND_SET_SETTING,
  SOUND_TOGGLE_SETTING,
  SOUND_TOGGLE_SOLO,
} from '../constants';
import { SOUNDS } from '../../constants';
import type { SoundsActions } from '../actions/types';
import type { SoundsState } from '../types';

const defaultSound = {
  gain: 0.7,
  filter: false,
  filterQ: 1,
  filterFreq: 8000,
  pan: 0,
  mute: false,
  soloMute: false,
  solo: false,
};

const initialSounds = SOUNDS.reduce((accumulate, sound) => ({
  ...accumulate,
  [sound]: defaultSound,
}), {});


export default (state: SoundsState = initialSounds, action: SoundsActions): SoundsState => {
  switch (action.type) {
  case SOUND_SET_SETTING:
    return {
      ...state,
      [action.meta.sound]: {
        ...state[action.meta.sound],
        [action.meta.setting]: action.meta.value,
      },
    };

  case SOUND_TOGGLE_SETTING:
    return {
      ...state,
      [action.meta.sound]: {
        ...state[action.meta.sound],
        [action.meta.setting]: !state[action.meta.sound][action.meta.setting],
      },
    };

  case SOUND_TOGGLE_SOLO:
    return {
      ...state,
      ...(SOUNDS.reduce((accu, sound) => ({
        ...accu,
        [sound]: {
          ...state[sound],
          solo: false,
          soloMute: !state[action.meta.sound].solo,
        },
      }), {})),
      [action.meta.sound]: {
        ...state[action.meta.sound],
        solo: !state[action.meta.sound].solo,
        soloMute: false,
      },
    };

  default:
    return state;
  }
};
