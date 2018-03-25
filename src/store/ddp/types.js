// @flow

import {
  DDP_TOGGLE_CONNECTED,
  DDP_SET_CONNECTED,
  DDP_RECONNECT,
  DDP_TOGGLE_SETTINGS,
  DDP_SET_URL,
  DDP_SET_SENDING,
  DDP_SET_RECEIVING,
} from './constants';

export type DdpToggleConnection = {
  type: typeof DDP_TOGGLE_CONNECTED,
};

export type DdpSetConnection = {
  type: typeof DDP_SET_CONNECTED,
  connected: boolean,
};

export type DdpReConnect = {
  type: typeof DDP_RECONNECT,
  connected: boolean,
};

export type DdpToggleSettings = {
  type: typeof DDP_TOGGLE_SETTINGS,
  settings: boolean,
};

export type DdpSetUrl = {
  type: typeof DDP_SET_URL,
  url: string,
};

export type DdpSending = {
  type: typeof DDP_SET_SENDING,
  send: boolean,
};

export type DdpReceiving = {
  type: typeof DDP_SET_RECEIVING,
  receive: boolean,
};

export type DdpActions =
  DdpSetConnection |
  DdpToggleSettings |
  DdpReConnect |
  DdpSetUrl |
  DdpSending |
  DdpReceiving;

export type DdpState = {
  connected: boolean,
  url: string,
  showSettings: boolean,
  sending: boolean,
  receiving: boolean,
};
