// @flow

import {
  SOUND_PLAY_ONE,
  SOUND_SET_SETTING,
  SOUND_TOGGLE_SETTING,
  SOUND_TOGGLE_SOLO,
} from './constants';
import { getSoundSettings } from './selectors';
import { getMaster } from '../master/selectors';

const playSound = (sound, settings, master) => ({
  type: SOUND_PLAY_ONE,
  meta: {
    sound,
    settings,
    master,
  },
});

export const setSetting = (sound: string, setting: string, value: string | number) => ({
  type: SOUND_SET_SETTING,
  meta: {
    sound,
    setting,
    value,
  },
});

export const toggleSetting = (sound: string, setting: string) => ({
  type: SOUND_TOGGLE_SETTING,
  meta: {
    sound,
    setting,
  },
});

export const toggleSoundSolo = (sound: string) => ({
  type: SOUND_TOGGLE_SOLO,
  meta: {
    sound,
  },
});

export const playSingleSound = (sound: string) => (dispatch: Dispatch<*>, getState: Function) => {
  const state = getState();
  const settings = getSoundSettings(state, sound);
  const master = getMaster(state);
  dispatch(playSound(sound, settings, master));
};

export const setSoundGain = (sound: string, gain: number) => (dispatch: Dispatch<*>) => {
  dispatch(setSetting(sound, 'gain', gain));
};

export const toggleSoundFilter = (sound: string) => (dispatch: Dispatch<*>) => {
  dispatch(toggleSetting(sound, 'filter'));
};

export const setSoundFilterQ = (sound: string, filterQ: number) => (dispatch: Dispatch<*>) => {
  dispatch(setSetting(sound, 'filterQ', filterQ));
};

export const setSoundFilterFreq = (sound: string, frequency: number) => (dispatch: Dispatch<*>) => {
  dispatch(setSetting(sound, 'filterFreq', frequency));
};

export const setSoundPan = (sound: string, pan: number) => (dispatch: Dispatch<*>) => {
  dispatch(setSetting(sound, 'pan', pan));
};

export const toggleSoundMute = (sound: string) => (dispatch: Dispatch<*>) => {
  dispatch(toggleSetting(sound, 'mute'));
};

export default null;
