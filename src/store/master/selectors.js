// @flow

import type { GlobalState } from '../types';
import type { MasterState } from './types';

const getState = (state: GlobalState): MasterState => state.master;

export const getVolume = (state: GlobalState): $PropertyType<MasterState, 'volume'> => {
  const master = getState(state);

  return master.volume;
};

export const getDistortion = (state: GlobalState): $PropertyType<MasterState, 'distortion'> => {
  const master = getState(state);

  return master.distortion;
};

export const hasDistortion = (state: GlobalState): $PropertyType<MasterState, 'hasDistortion'> => {
  const master = getState(state);

  return master.hasDistortion;
};

export const getMaster = (state: GlobalState): MasterState => getState(state);

export default null;
