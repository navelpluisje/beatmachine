// @flow

import { combineReducers } from 'redux';
import sequencer from './sequencer';
import drumkit from './drumkit';
import sounds from './sounds';
import channels from './channels';
import master from './master';
import ddp from './ddp';

export default combineReducers({
  sequencer,
  drumkit,
  sounds,
  channels,
  master,
  ddp,
});
