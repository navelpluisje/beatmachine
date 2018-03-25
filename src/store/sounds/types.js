// @flow

import {
  SOUND_PLAY_ONE,
  SOUND_SET_SETTING,
  SOUND_TOGGLE_SETTING,
  SOUND_TOGGLE_SOLO,
} from './constants';
import type { MasterState } from '../master/types';

export type SoundsSetSound = {
  type: typeof SOUND_PLAY_ONE,
  meta: {
    sound: string,
    settings: Object,
    master: MasterState,
  },
}

export type SoundsSetSettings = {
  type: typeof SOUND_SET_SETTING,
  meta: {
    sound: string,
    setting: string,
    value: mixed,
  },
}

export type SoundsToggleSetting = {
  type: typeof SOUND_TOGGLE_SETTING,
  meta: {
    sound: string,
    setting: string,
  },
};

export type SoundsToggleSolo = {
  type: typeof SOUND_TOGGLE_SOLO,
  meta: {
    sound: string,
  },
};

export type SoundsActions =
  SoundsSetSound |
  SoundsSetSettings |
  SoundsToggleSetting |
  SoundsToggleSolo;

export type Sound = {
  mute: boolean,
  solo: boolean,
  soloMute: boolean,
  gain: number,
  pan: number,
  filter: boolean,
  filterQ: number,
  filterFreq: number,
}

export type SoundsState = {
  [key: string]: Sound,
}
