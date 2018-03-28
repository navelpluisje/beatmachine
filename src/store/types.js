// @flow

import type { ChannelsState, ChannelsActions } from './channels';
import type { DdpState, DdpActions } from './ddp';
import type { DrumkitState, DrumkitActions } from './drumkit';
import type { MasterState, MasterActions } from './master';
import type { MidiState, MidiActions } from './midi';
import type { SequencerState, SequencerActions } from './sequencer';
import type { SoundsState, SoundsActions } from './sounds';

export type GlobalState = {
  channels: ChannelsState,
  ddp: DdpState,
  drumkit: DrumkitState,
  master: MasterState,
  midi: MidiState,
  sequencer: SequencerState,
  sounds: SoundsState,
}

export type AllActions =
  ChannelsActions |
  DdpActions |
  DrumkitActions |
  MasterActions |
  MidiActions |
  SequencerActions |
  SoundsActions |
  Function;
