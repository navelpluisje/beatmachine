// @flow

import React, { Fragment } from 'react';
import { SOUNDS } from '../../../../constants';
import Upload from '../upload';

export default () => (
  <Fragment>
    {SOUNDS && SOUNDS.map(sound => (
      <Upload
        key={sound}
        sound={sound}
      />
    ))}
  </Fragment>
);
