// @flow

import {
  DRUMKIT_SET_ACTIVE,
  DRUMKIT_LOAD_CUSTOM,
  DRUMKIT_ADD_CUSTOM,
  DRUMKIT_SET_CUSTOM_VALUE,
  DRUMKIT_TOGGLE_SETTINGS,
  DRUMKIT_DATABASE_CONNECTED,
} from './constants';

export type Drumkit = 'TR808' | 'TR909' | 'HR16' | 'LINNDRUM' | 'Custom';
export type CustomDrumkit = {
  [sound: string]: {
    sound: string,
    name: string,
    drumkit: string,
    blob: ?ArrayBuffer,
  }
}

export type DrumkitSetActive = {
  type: typeof DRUMKIT_SET_ACTIVE,
  meta: {
    index: number,
    drumkit: string,
  },
}

export type DrumkitSetCustomValue = {
  type: typeof DRUMKIT_SET_CUSTOM_VALUE,
  meta: {
    sound: string,
    field: string,
    value: string | number | ArrayBuffer | null,
  },
}

export type DrumkitLoadCustom = {
  type: typeof DRUMKIT_LOAD_CUSTOM,
  meta: {
    customDrumkit: CustomDrumkit,
  },
}

export type DrumkitAddCustom = {
  type: typeof DRUMKIT_ADD_CUSTOM,
  meta: {
    sound: string,
    drumkit: $Values<CustomDrumkit>,
  },
}

export type DrumkitToggleSettings = {
  type: typeof DRUMKIT_TOGGLE_SETTINGS,
}

export type DrumkitDatabaseConnected = {
  type: typeof DRUMKIT_DATABASE_CONNECTED,
  value: boolean,
}

export type DrumkitActions =
  DrumkitLoadCustom |
  DrumkitAddCustom |
  DrumkitSetCustomValue |
  DrumkitSetActive;

export type DrumkitState = {
  drumkits: Array<Drumkit>,
  active: number,
  customDrumkit: CustomDrumkit,
  showSettings: boolean,
  databaseConnected: boolean,
};
