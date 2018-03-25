// @flow

import type { GlobalState } from '../types';
import type {
  DrumkitState,
  Drumkit,
  CustomDrumkit,
} from './types';
import { getValues } from '../../helpers';

const getState = (state: GlobalState): DrumkitState => state.drumkit;

export const hasCustomDrumkit = (state: GlobalState): boolean => {
  const drumkit = getState(state);
  return getValues(drumkit.customDrumkit)
    .filter((sound: Object) => sound.blob !== null)
    .length === 8;
};

export const getDrumkits = (state: GlobalState): Array<Drumkit> => {
  const drumkit = getState(state);
  const drumkits = [...drumkit.drumkits];

  if (hasCustomDrumkit(state)) {
    drumkits.push('Custom');
    return drumkits;
  }

  return drumkits;
};

export const getDrumkit = (state: GlobalState, id?: number): Drumkit => {
  const drumkit = getState(state);
  const drumkits = getDrumkits(state);

  if (typeof id !== 'number') {
    return drumkits[drumkit.active];
  }
  return drumkits[id];
};

export const getCustomDrumkit = (state: GlobalState): CustomDrumkit => {
  const drumkit = getState(state);
  return drumkit.customDrumkit;
};

export const getCustomDrumkitSound = (state: GlobalState, sound: string): Object => {
  const drumkit = getState(state);
  return drumkit.customDrumkit[sound];
};

export const showDrumkitSettings = (state: GlobalState): boolean => {
  const drumkit = getState(state);
  return drumkit.showSettings;
};

export const hasDatabaseConnection = (state: GlobalState): boolean => {
  const drumkit = getState(state);
  return drumkit.databaseConnected;
};

export const getNextDrumkitIndex = (state: GlobalState): number => {
  const drumkit = getState(state);
  const drumkits = getDrumkits(state);

  if (drumkit.active === (drumkits.length - 1)) {
    return 0;
  }
  return drumkit.active + 1;
};

export const getPreviousDrumkitIndex = (state: GlobalState): number => {
  const drumkit = getState(state);
  const drumkits = getDrumkits(state);

  if (drumkit.active === 0) {
    return drumkits.length - 1;
  }
  return drumkit.active - 1;
};

export default null;
