// @flow

import {
  MASTER_SET_VOLUME,
  MASTER_SET_DISTORTION,
  MASTER_TOGGLE_DISTORTION,
} from '../constants';
import type { MasterActions } from '../actions/types';
import type { MasterState } from '../types';

const defaultmaster: MasterState = {
  volume: 1,
  distortion: 50,
  hasDistortion: false,
};

export default (state: MasterState = defaultmaster, action: MasterActions): MasterState => {
  switch (action.type) {
  case MASTER_SET_VOLUME:
    return {
      ...state,
      volume: action.meta.volume,
    };

  case MASTER_SET_DISTORTION:
    return {
      ...state,
      distortion: action.meta.distortion,
    };

  case MASTER_TOGGLE_DISTORTION:
    return {
      ...state,
      hasDistortion: !state.hasDistortion,
    };

  default:
    return state;
  }
};
