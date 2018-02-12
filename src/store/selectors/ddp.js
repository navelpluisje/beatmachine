// @flow

import type {
  GlobalState,
  DdpState,
} from '../types';

const getState = (state: GlobalState): DdpState => state.ddp;

export const isConnected = (state: GlobalState): boolean => {
  const ddp = getState(state);

  return ddp.connected;
};

export const showSettings = (state: GlobalState): boolean => {
  const ddp = getState(state);

  return ddp.showSettings;
};

export const getUrl = (state: GlobalState): string => {
  const ddp = getState(state);

  return ddp.url;
};

export default null;
