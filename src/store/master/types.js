// @flow

import { MASTER_SET_VOLUME } from './constants';

export type MasterSetVolume = {
  type: typeof MASTER_SET_VOLUME,
  meta: {
    volume: number,
  },
};

export type MasterActions =
  MasterSetVolume;

export type MasterState = {
  volume: number,
  distortion: number,
  hasDistortion: boolean,
};
