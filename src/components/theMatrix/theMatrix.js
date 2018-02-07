// @flow

import React, { Fragment } from 'react';
import { SOUNDS } from '../../constants';
import { MatrixRow } from './atoms';

export default () => (
  <Fragment>
    {SOUNDS.map(sound => (
      <MatrixRow key={sound} channel={sound} />
    ))}
  </Fragment>
);
