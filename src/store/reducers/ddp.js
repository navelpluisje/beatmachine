// @flow

import {
  DDP_TOGGLE_CONNECTED,
} from '../constants';
import type { DdpActions } from '../actions/types';
import type { DdpState } from '../types';

const defaultSettings: DdpState = {
  connected: false,
};

export default (state: DdpState = defaultSettings, action: DdpActions): DdpState => {
  switch (action.type) {
  case DDP_TOGGLE_CONNECTED:
    return {
      ...state,
      connected: action.connected,
    };

  default:
    return state;
  }
};
