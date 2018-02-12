// @flow

import {
  DDP_TOGGLE_CONNECTED,
  DDP_TOGGLE_SETTINGS,
  DDP_SET_URL,
  DDP_RECONNECT,
} from '../constants';
import { getUrl } from '../selectors/ddp';
import type { DdpToggleConnection, DdpSetUrl } from './types';

export const toggleDdpConnection = (): DdpToggleConnection => ({
  type: DDP_TOGGLE_CONNECTED,
  connected: false,
});

export const toggleDdpSettings = (): DdpToggleSettings => ({
  type: DDP_TOGGLE_SETTINGS,
  settings: false,
});

export const setDDPUrl = (url: string): DdpSetUrl => ({
  type: DDP_SET_URL,
  url,
});

export const reConnect = (): DdpSetUrl =>
  (dispatch: Dispatch<*>, getState: Function) => {
    const url = getUrl(getState());
    dispatch({
      type: DDP_RECONNECT,
      url,
    });
  };

export default null;
