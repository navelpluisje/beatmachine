// @flow

import type {
  GlobalState,
  ChannelsState,
} from '../types';
import { getEntries } from '../../helpers';

const getState = (state: GlobalState): ChannelsState => state.channels;

export const getActiveChannel = (state: GlobalState): string => (
  getState(state).activeChannel
);

export const isActiveChannel = (state: GlobalState, sound: string): boolean => (
  getState(state).activeChannel === sound
);

export const getActiveSounds = (state: GlobalState, step: number): Array<string> => (
  getEntries(getState(state).channels)
    .filter(([sound: string, steps: Array<boolean>]) => steps[step]) // eslint-disable-line
    .map(item => item[0])
);

export const isSelectedStep = (state: GlobalState, step: number): boolean => {
  const channels = getState(state);

  if (channels.activeChannel === '') {
    return false;
  }

  return channels.channels[channels.activeChannel][step];
};

export default null;
