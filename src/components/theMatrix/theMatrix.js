// @flow

import React from 'react';
import { SOUNDS } from '../../constants';
import { MatrixRow } from './atoms';

export default () => (
  <div>
    {SOUNDS.map(sound => (
      <MatrixRow key={sound} channel={sound} />
    ))}
  </div>
);
