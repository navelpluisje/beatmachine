// @flow

import {
  DRUMKIT_SET_ACTIVE,
  DRUMKIT_ADD_CUSTOM,
  DRUMKIT_SET_CUSTOM_VALUE,
  DRUMKIT_TOGGLE_SETTINGS,
  DRUMKIT_DATABASE_CONNECTED,
} from '../constants';
import {
  getDrumkit,
  getNextDrumkitIndex,
  getPreviousDrumkitIndex,
} from '../selectors/drumkit';
import { SOUNDS } from '../../constants';
import { initializeDatabase, getSound, addSound } from '../../helpers/database';
import type {
  DrumkitSetCustomValue,
  DrumkitToggleSettings,
  DrumkitDatabaseConnected,
} from './types';

const setActiveDrumkit = (index, drumkit) => ({
  type: DRUMKIT_SET_ACTIVE,
  meta: {
    index,
    drumkit,
  },
});

export const setCustomDrumkitValue = (
  field: string,
  value: string | number | ArrayBuffer | null,
  sound: string,
): DrumkitSetCustomValue => ({
  type: DRUMKIT_SET_CUSTOM_VALUE,
  meta: {
    field,
    value,
    sound,
  },
});

export const toggleDrumkitSettings = (): DrumkitToggleSettings => ({
  type: DRUMKIT_TOGGLE_SETTINGS,
});

export const setDrumkitDatabaseConnected = (): DrumkitDatabaseConnected => ({
  type: DRUMKIT_DATABASE_CONNECTED,
  value: true,
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


export const loadCustomDrumkit = () => (dispatch: Function) => {
  const addCustomDrumkit = (event: Event, sound: string) => {
    let drumkit = {
      sound,
      nmae: '',
      drumkit: 'customDrumkit',
      blob: null,
    };
    if (event.target.result !== undefined) {
      drumkit = event.target.result;
    }

    dispatch({
      type: DRUMKIT_ADD_CUSTOM,
      meta: {
        sound,
        drumkit,
      },
    });
  };

  SOUNDS.forEach((sound) => {
    getSound(sound, 'customDrumkit', event => addCustomDrumkit(event, sound));
  });
};

export const saveCustomDrumkit =
  (sound: string, name: string, blob: ArrayBuffer) => async (dispatch: Dispatch<*>) => {
    const drumkit = {
      sound,
      name,
      drumkit: 'customDrumkit',
      blob,
    };

    let newSound: Event;
    try {
      newSound = await addSound(drumkit);
    } catch (e) {
      console.error(e);
      return null;
    }

    // const addCustomDrumkit = (event: Event, kit: Object) => {
    const { type, returnValue } = newSound;
    if (type === 'success' && returnValue) {
      dispatch({
        type: DRUMKIT_ADD_CUSTOM,
        meta: {
          sound,
          drumkit,
        },
      });
    // }
    }
  };

export const setDatabaseConnection = () => async (dispatch: Dispatch<*>) => {
  let connected;
  try {
    connected = await initializeDatabase();
  } catch (e) {
    console.error(e);
  }

  if (connected) {
    dispatch(setDrumkitDatabaseConnected());
  }
};

export default null;
