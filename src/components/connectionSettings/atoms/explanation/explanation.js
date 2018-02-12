// @flow

import React from 'react';
import ExplanationContainer, {
  Title,
  Explanation,
} from './explanation.styled';

export default () => (
  <ExplanationContainer>
    <Title>Explanation</Title>
    <Explanation>
      <p>
        Fill in the full url to connect to. This is with protocol and port number included.
        When using Heroku you do not need to add a port.
      </p>
      <p>
        Click the connection button to (re-)connect.
      </p>
      <p>
        The server for use with the BeatMachine can be found <a href="https://bitbucket.org/Navelpluisje/beatserver">here</a>.
      </p>
    </Explanation>
  </ExplanationContainer>
);
