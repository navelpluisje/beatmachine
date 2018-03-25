// @flow

import type { GlobalState } from '../types';
import type {
  SoundsState,
  Sound,
} from './types';

const getState = (state: GlobalState): SoundsState => state.sounds;

export const getSoundSettings = (state: GlobalState, sound: string): Sound => {
  const sounds = getState(state);

  return sounds[sound];
};

export const getGain = (state: GlobalState, sound: string): number => {
  const sounds = getState(state);
  return sounds[sound].gain;
};

export const getMute = (state: GlobalState, sound: string): boolean => {
  const sounds = getState(state);
  return sounds[sound].mute;
};

export const getFilter = (state: GlobalState, sound: string): boolean => {
  const sounds = getState(state);
  return sounds[sound].filter;
};

export const getFilterQ = (state: GlobalState, sound: string): number => {
  const sounds = getState(state);
  return sounds[sound].filterQ;
};

export const getFilterFreq = (state: GlobalState, sound: string): number => {
  const sounds = getState(state);
  return sounds[sound].filterFreq;
};

export const getPan = (state: GlobalState, sound: string): number => {
  const sounds = getState(state);
  return sounds[sound].pan;
};

export const getSolo = (state: GlobalState, sound: string): boolean => {
  const sounds = getState(state);
  return sounds[sound].solo;
};

export const getSoloMute = (state: GlobalState, sound: string): boolean => {
  const sounds = getState(state);
  return sounds[sound].soloMute;
};

export default null;
