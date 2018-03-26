// @flow

import React from 'react';
import { Form } from './components';
import {
  Container,
  BottomForm,
  BottomTitle,
  Explanation,
} from '../bottomBar/components';

export default () => (
  <Container>
    <BottomForm>
      <BottomTitle>Midi Settings</BottomTitle>
      <Form />
    </BottomForm>
    <Explanation
      title="Explanation"
    >
      <p>
        First select the midi-device you want to connect to
      </p>
      <p>
        If you need to you can set th emidi port you want to connect to.
        If empty, it&acute;s listening to all ports.
      </p>
      <p>
        Check Beatmachine midi for more info about settings of your controler.
      </p>
    </Explanation>
  </Container>
);
