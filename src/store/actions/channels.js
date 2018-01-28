// @flow

import {
  CHANNELS_SET_STEP,
  CHANNELS_SET_ACTIVE_CHANNEL,
} from '../constants';
import type {
  ChannelsSetStep,
  ChannelsSetActiveChannel,
} from './types';
import { getActiveChannel } from '../selectors/channels';

export const setChannelStep = (channel: string, step: number): ChannelsSetStep => ({
  type: CHANNELS_SET_STEP,
  meta: {
    channel,
    step,
  },
});

export const setChannelActive = (channel: string): ChannelsSetActiveChannel => ({
  type: CHANNELS_SET_ACTIVE_CHANNEL,
  channel,
});

export const setStep = (step: number, activeChannel?: string) =>
  (dispatch: Function, getState: Function) => {
    const channel = activeChannel || getActiveChannel(getState());

    dispatch(setChannelStep(channel, step));
  };

export default null;
