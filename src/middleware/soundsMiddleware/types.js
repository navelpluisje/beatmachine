// @flow

import { SOUNDS } from '../../constants';

export type Sounds = typeof SOUNDS;

export type Sound = {
  sound: string,
  settings: {
    mute: boolean,
    gain: number,
    pan: number,
    filter: boolean,
    filterQ: number,
    filterFreq: number,
  },
};
