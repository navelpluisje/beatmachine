// @flow

import React from 'react';
import StyledChanels from './channels.styled';
import Channel from '../channel';
import { SOUNDS } from '../../constants';

export default () => (
  <StyledChanels>
    {SOUNDS.map((sound, index) => (
      <Channel
        key={index} // eslint-disable-line
        sound={sound}
      />
    ))}
  </StyledChanels>
);
