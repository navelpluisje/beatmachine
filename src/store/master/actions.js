// @flow

import {
  MASTER_SET_VOLUME,
  MASTER_SET_DISTORTION,
  MASTER_TOGGLE_DISTORTION,
} from './constants';

export const setVolume = (volume: number) => ({
  type: MASTER_SET_VOLUME,
  meta: {
    volume,
  },
});

export const setDistortion = (distortion: number) => ({
  type: MASTER_SET_DISTORTION,
  meta: {
    distortion,
  },
});

export const toggleDistortion = () => ({
  type: MASTER_TOGGLE_DISTORTION,
});

export default null;
