// @flow

import {
  CHANNELS_SET_STEP,
  CHANNELS_SET_STEP_DDP,
  CHANNELS_SET_ACTIVE_CHANNEL,
} from './constants';

export type ChannelsSetStep = {
  type: typeof CHANNELS_SET_STEP,
  meta: {
    channel: string,
    step: number,
    value: ?boolean,
    connected: ?boolean,
  }
}

export type ChannelsSetStepDdp = {
  type: typeof CHANNELS_SET_STEP_DDP,
  meta: {
    channel: string,
    step: number,
    value: boolean | null,
  }
}

export type ChannelsSetActiveChannel = {
  type: typeof CHANNELS_SET_ACTIVE_CHANNEL,
  channel: string,
}

export type ChannelsActions =
  ChannelsSetStep |
  ChannelsSetActiveChannel |
  ChannelsSetStepDdp;

export type ChannelsState = {
  activeChannel: string,
  editGroup: number,
  channels: {
    [sound: string]: Array<boolean>,
  },
};
