// @flow

import type { GlobalState } from '../types';
import type { ChannelsState } from './types';
import { getEntries } from '../../helpers';

const getState = (state: GlobalState): ChannelsState => state.channels;

export const getActiveChannel = (state: GlobalState): string => getState(state).activeChannel;

export const getChannels = (state: GlobalState): * => getState(state).channels;

export const getActiveSounds = (state: GlobalState, step: number): Array<string> => (
  getEntries(getChannels(state))
    .filter(([sound: string, steps: Array<boolean>]) => steps[step]) // eslint-disable-line
    .map(item => item[0])
);

export const isSelectedStep =
  (state: GlobalState, step: number, channel: ?string = null): boolean => {
    const channels = getChannels(state);
    const activeChannel = getActiveChannel(state);
    if (channel && channels[channel]) {
      return channels[channel][step];
    }

    if (activeChannel !== '') {
      return channels[activeChannel][step];
    }

    return false;
  };

export default null;
