// @flow

import {
  INITIAL_SETTINGS,
  DRUMKIT_SET_ACTIVE,
} from '../constants';
import type { DrumkitActions } from '../actions/types';
import type { DrumkitState } from '../types';

const defaultDrumkit: DrumkitState = {
  drumkits: [
    'TR808',
    'TR909',
    'HR16',
    'LINNDRUM',
  ],
  active: parseInt(localStorage.getItem('drumkit'), 10) || 0,
};

export default (state: DrumkitState = defaultDrumkit, action: DrumkitActions): DrumkitState => {
  switch (action.type) {
  case INITIAL_SETTINGS:
    return defaultDrumkit;

  case DRUMKIT_SET_ACTIVE:
    localStorage.setItem('drumkit', action.meta.index.toString());
    return {
      ...state,
      active: action.meta.index,
    };

  default:
    return state;
  }
};
