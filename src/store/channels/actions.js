// @flow

import {
  CHANNELS_SET_STEP,
  CHANNELS_SET_ACTIVE_CHANNEL,
} from './constants';
import type {
  ChannelsSetStep,
  ChannelsSetActiveChannel,
} from './types';
import { getActiveChannel } from './selectors';
import { isConnected } from '../ddp/selectors';

export const setChannelStep = (
  channel: string,
  step: number,
  value?: ?boolean = null,
  connected?: ?boolean = null,
): ChannelsSetStep => ({
  type: CHANNELS_SET_STEP,
  meta: {
    channel,
    step,
    value,
    connected,
  },
});

export const setChannelActive = (channel: string): ChannelsSetActiveChannel => ({
  type: CHANNELS_SET_ACTIVE_CHANNEL,
  channel,
});

export const setStep = (step: number, activeChannel?: string, value?: boolean) =>
  (dispatch: Function, getState: Function) => {
    const state = getState();
    const channel = activeChannel || getActiveChannel(state);
    const connected = isConnected(state);

    dispatch(setChannelStep(channel, step, value, connected));
  };

export default null;
