// @flow

import {
  DRUMKIT_SET_ACTIVE,
  DRUMKIT_ADD_CUSTOM,
  DRUMKIT_LOAD_CUSTOM,
  DRUMKIT_SET_CUSTOM_VALUE,
  DRUMKIT_TOGGLE_SETTINGS,
  DRUMKIT_DATABASE_CONNECTED,
} from './constants';
import type { DrumkitActions, DrumkitState } from './types';

const defaultDrumkit: DrumkitState = {
  drumkits: [
    'TR808',
    'TR909',
    'HR16',
    'LINNDRUM',
  ],
  active: parseInt(localStorage.getItem('drumkit'), 10) || 0,
  customDrumkit: {},
  showSettings: false,
  databaseConnected: false,
};

export default (state: DrumkitState = defaultDrumkit, action: DrumkitActions): DrumkitState => {
  switch (action.type) {
  case DRUMKIT_SET_ACTIVE:
    localStorage.setItem('drumkit', action.meta.index.toString());
    return {
      ...state,
      active: action.meta.index,
    };

  case DRUMKIT_LOAD_CUSTOM:
    return {
      ...state,
      customDrumkit: action.meta.customDrumkit,
    };

  case DRUMKIT_SET_CUSTOM_VALUE:
    return {
      ...state,
      customDrumkit: {
        ...state.customDrumkit,
        [action.meta.sound]: {
          ...state.customDrumkit[action.meta.sound],
          [action.meta.field]: action.meta.value,
        },
      },
    };

  case DRUMKIT_ADD_CUSTOM:
    return {
      ...state,
      customDrumkit: {
        ...state.customDrumkit,
        [action.meta.sound]: {
          ...action.meta.drumkit,
        },
      },
    };

  case DRUMKIT_TOGGLE_SETTINGS:
    return {
      ...state,
      showSettings: !state.showSettings,
    };

  case DRUMKIT_DATABASE_CONNECTED:
    return {
      ...state,
      databaseConnected: action.value,
    };

  default:
    return state;
  }
};
