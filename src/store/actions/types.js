// @flow

import type {
  SequencerSpeed,
  SequencerRunning,
  SequencerStepCount,
  MasterState,
} from '../types';
import {
  INITIAL_SETTINGS,
  SEQUENCER_SET_SPEED,
  SEQUENCER_SET_RUNNING,
  SEQUENCER_SET_STOPPED,
  SEQUENCER_SET_STEP_COUNT,
  SEQUENCER_SET_CURRENT_STEP,
  SEQUENCER_SET_EDIT_GROUP,
  SEQUENCER_TOGGLE_GRID,
  DRUMKIT_SET_ACTIVE,
  CHANNELS_SET_STEP,
  CHANNELS_SET_STEP_DDP,
  CHANNELS_SET_ACTIVE_CHANNEL,
  SOUND_PLAY_ONE,
  SOUND_SET_SETTING,
  SOUND_TOGGLE_SETTING,
  SOUND_TOGGLE_SOLO,
  MASTER_SET_VOLUME,
  DDP_TOGGLE_CONNECTED,
  DDP_RECONNECT,
  DDP_TOGGLE_SETTINGS,
  DDP_SET_URL,
  DDP_SET_SENDING,
  DDP_SET_RECEIVING,
} from '../constants';

export type SequencerSetInitial = {
  type: typeof INITIAL_SETTINGS,
}

export type SequencerSetSpeed = {
  type: typeof SEQUENCER_SET_SPEED,
  speed: SequencerSpeed,
}

export type SequencerSetRunning = {
  type: typeof SEQUENCER_SET_RUNNING,
  running: SequencerRunning,
}

export type SequencerSetStopped = {
  type: typeof SEQUENCER_SET_STOPPED,
}

export type SequencerSetStepCount = {
  type: typeof SEQUENCER_SET_STEP_COUNT,
  steps: SequencerStepCount,
}

export type SequencerSetCurrentStep = {
  type: typeof SEQUENCER_SET_CURRENT_STEP,
  meta: {
    step: number,
    sounds: Array<Object>,
    master: MasterState,
  },
};

export type SequencerSetEditGroup = {
  type: typeof SEQUENCER_SET_EDIT_GROUP,
  meta: {
    group: number,
  },
};

export type SequencerToggleGrid = {
  type: typeof SEQUENCER_TOGGLE_GRID,
};

export type SequencerActions =
  SequencerSetInitial |
  SequencerSetSpeed |
  SequencerSetRunning |
  SequencerSetStopped |
  SequencerSetStepCount |
  SequencerSetCurrentStep;

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

export type DrumkitSetActive= {
  type: typeof DRUMKIT_SET_ACTIVE,
  meta: {
    index: number,
    drumkit: string,
  },
}

export type DrumkitActions =
  SequencerSetInitial |
  DrumkitSetActive;


export type SoundsSetSound = {
  type: typeof SOUND_PLAY_ONE,
  meta: {
    sound: string,
    settings: Object,
    master: MasterState,
  },
}

export type SoundsSetSettings = {
  type: typeof SOUND_SET_SETTING,
  meta: {
    sound: string,
    setting: string,
    value: mixed,
  },
}

export type SoundsToggleSetting = {
  type: typeof SOUND_TOGGLE_SETTING,
  meta: {
    sound: string,
    setting: string,
  },
};

export type SoundsToggleSolo = {
  type: typeof SOUND_TOGGLE_SOLO,
  meta: {
    sound: string,
  },
};

export type SoundsActions =
  SoundsSetSound |
  SoundsSetSettings |
  SoundsToggleSetting |
  SoundsToggleSolo;

export type MasterSetVolume = {
  type: typeof MASTER_SET_VOLUME,
  meta: {
    volume: number,
  },
};

export type MasterActions =
  MasterSetVolume;

export type DdpToggleConnection = {
  type: typeof DDP_TOGGLE_CONNECTED,
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
  DdpToggleConnection |
  DdpToggleSettings |
  DdpReConnect |
  DdpSetUrl |
  DdpSending |
  DdpReceiving;

export type AllActions =
  SoundsActions |
  DrumkitActions |
  SequencerActions |
  ChannelsActions |
  DdpActions;
