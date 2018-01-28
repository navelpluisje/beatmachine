// @flow

import {
  DRUMKIT_SET_ACTIVE,
} from '../constants';
import {
  getDrumkit,
  getNextDrumkitIndex,
  getPreviousDrumkitIndex,
} from '../selectors/drumkit';

const setActiveDrumkit = (index, drumkit) => ({
  type: DRUMKIT_SET_ACTIVE,
  meta: {
    index,
    drumkit,
  },
});

export const setNextDrumkit = () => (dispatch: Function, getState: Function) => {
  const state = getState();
  const id = getNextDrumkitIndex(state);
  const drumkit = getDrumkit(state, id);
  dispatch(setActiveDrumkit(id, drumkit));
};

export const setPreviousDrumkit = () => (dispatch: Function, getState: Function) => {
  const state = getState();
  const id = getPreviousDrumkitIndex(state);
  const drumkit = getDrumkit(state, id);
  dispatch(setActiveDrumkit(id, drumkit));
};

export default null;
