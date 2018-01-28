// @flow

import {
  CHANNELS_SET_STEP,
  CHANNELS_SET_ACTIVE_CHANNEL,
} from '../constants';
import { SOUNDS } from '../../constants';
import type { ChannelsActions } from '../actions/types';
import type { ChannelsState } from '../types';

const initialChannels: ChannelsState = {
  activeChannel: '',
  editGroup: 0,
  channels: SOUNDS.reduce((accumulator, sound) => ({
    ...accumulator,
    [sound]: Array.from(Array(64), () => false),
  }), {}),
};

export default (state: ChannelsState = initialChannels, action: ChannelsActions): ChannelsState => {
  switch (action.type) {
  case CHANNELS_SET_STEP: {
    const { channel, step } = action.meta;
    const newState = { ...state };
    newState.channels[channel][step] = !state.channels[channel][step];

    return newState;
  }

  case CHANNELS_SET_ACTIVE_CHANNEL:
    return {
      ...state,
      activeChannel: action.channel,
    };

  default:
    return state;
  }
};
