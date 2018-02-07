// @flow

import {
  DDP_TOGGLE_CONNECTED,
} from '../constants';

export const toggleDdpConnection = () => ({
  type: DDP_TOGGLE_CONNECTED,
  connected: false,
});

export default null;
