// @flow

export type SequencerSpeed = number;
export type SequencerRunning = boolean;
export type SequencerStopped = boolean;
export type SequencerStepCount = 16 | 32 | 48 | 64;

export type SequencerState = {
  speed: SequencerSpeed,
  isRunning: SequencerRunning,
  isStopped: SequencerStopped,
  stepCount: SequencerStepCount,
  editGroup: number,
  currentStep: number,
  activeChannel: string,
  loop: number,
  showGrid: boolean,
};

export type Drumkit = 'TR808' | 'TR909' | 'HR16' | 'LINNDRUM';

export type DrumkitState = {
  drumkits: Array<Drumkit>,
  active: number,
};

export type Sound = {
  mute: boolean,
  solo: boolean,
  soloMute: boolean,
  gain: number,
  pan: number,
  filter: boolean,
  filterQ: number,
  filterFreq: number,
}

export type SoundsState = {
  [key: string]: Sound,
}

export type ChannelsState = {
  activeChannel: string,
  editGroup: number,
  channels: {
    [sound: string]: Array<boolean>,
  },
};

export type MasterState = {
  volume: number,
  distortion: number,
  hasDistortion: boolean,
};

export type DdpState = {
  connected: boolean,
  url: string,
  showSettings: boolean,
  sending: boolean,
  receiving: boolean,
};

export type GlobalState = {
  sequencer: SequencerState,
  drumkit: DrumkitState,
  sounds: SoundsState,
  channels: ChannelsState,
  master: MasterState,
  ddp: DdpState,
}
