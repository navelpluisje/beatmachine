// @flow

import React, { Fragment } from 'react';
import { SOUNDS } from '../../../../constants';
import Upload from '../upload';

export default () => (
  <Fragment>
    {SOUNDS && SOUNDS.map((sound, index) => (
      <Upload
        key={sound}
        id={index + 1}
        sound={sound}
      />
    ))}
  </Fragment>
);
