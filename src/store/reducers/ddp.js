// @flow

import {
  DDP_TOGGLE_CONNECTED,
  DDP_RECONNECT,
  DDP_TOGGLE_SETTINGS,
  DDP_SET_URL,
} from '../constants';
import type { DdpActions } from '../actions/types';
import type { DdpState } from '../types';

const defaultSettings: DdpState = {
  connected: false,
  url: localStorage.getItem('ddp-url') || '127.0.0.1:3000',
  showSettings: false,
};

export default (state: DdpState = defaultSettings, action: DdpActions): DdpState => {
  switch (action.type) {
  case DDP_TOGGLE_CONNECTED:
    return {
      ...state,
      connected: action.connected,
    };

  case DDP_RECONNECT:
    return {
      ...state,
      connected: action.connected,
    };

  case DDP_TOGGLE_SETTINGS:
    return {
      ...state,
      showSettings: !state.showSettings,
    };

  case DDP_SET_URL:
    localStorage.setItem('ddp-url', action.url);
    return {
      ...state,
      url: action.url,
    };

  default:
    return state;
  }
};
