// @flow

import React from 'react';
import TopBar, {
  SequencerPart,
  ConnectionPart,
  OutputPart,
} from './topBar.styled';
import SequencerControl from '../sequencerControl';
import Connection from '../connection';
import Master from '../master';

export default () => (
  <TopBar>
    <SequencerPart>
      <SequencerControl />
    </SequencerPart>
    <ConnectionPart>
      <Connection />
    </ConnectionPart>
    <OutputPart>
      <Master />
    </OutputPart>
  </TopBar>
);
