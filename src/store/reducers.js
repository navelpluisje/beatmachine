// @flow

import { combineReducers } from 'redux';
import channels from './channels';
import ddp from './ddp';
import drumkit from './drumkit';
import master from './master';
import midi from './midi';
import sequencer from './sequencer';
import sounds from './sounds';

export default combineReducers({
  channels,
  ddp,
  drumkit,
  master,
  midi,
  sequencer,
  sounds,
});
