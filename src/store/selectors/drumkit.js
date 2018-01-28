// @flow

import type {
  GlobalState,
  DrumkitState,
  Drumkit,
} from '../types';

const getState = (state: GlobalState): DrumkitState => state.drumkit;

export const getDrumkit = (state: GlobalState, id?: number): Drumkit => {
  const drumkit = getState(state);

  return drumkit.drumkits[id || drumkit.active];
};

export const getNextDrumkitIndex = (state: GlobalState): number => {
  const drumkit = getState(state);

  if (drumkit.active === (drumkit.drumkits.length - 1)) {
    return 0;
  }
  return drumkit.active + 1;
};

export const getPreviousDrumkitIndex = (state: GlobalState): number => {
  const drumkit = getState(state);

  if (drumkit.active === 0) {
    return drumkit.drumkits.length - 1;
  }
  return drumkit.active - 1;
};

export default null;
