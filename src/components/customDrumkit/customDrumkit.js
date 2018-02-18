// @flow

import React from 'react';
import {
  Form,
} from './components';
import {
  Container,
  BottomForm,
  BottomTitle,
  Explanation,
} from '../bottomBar/components';

const CustomDrumkit = () => (
  <Container>
    <BottomForm>
      <BottomTitle>Custom Drumkit</BottomTitle>
      <Form />
    </BottomForm>
    <Explanation
      title="Explanation"
    >
      <p>
        Here you can create your own custum drumkit.
        Click on the select-button and select a sound file.
        Keep in mind that this is a drum sequencer, so just use short sounds.
      </p>
      <p>
        The sounds will be stored in the database of this browser.
        This way you do not have to create your drumkit after every browser refresh.
      </p>
      <p>
        You can use the play button to check the sound. and shange the name of the file.
        The last one is just cosmetic and will not (yet) be used.
      </p>
      <p>
        When all sounds are set, the drumkit button will turn green
        and you can use your own drumkit.
      </p>
    </Explanation>
  </Container>
);

export default CustomDrumkit;
