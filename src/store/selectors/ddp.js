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

export default null;
