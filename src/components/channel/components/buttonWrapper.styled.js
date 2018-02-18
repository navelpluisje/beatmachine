// @flow

import styled from 'styled-components';
import { Led } from '../../../elements/statusLed/statusLed.styled';

export default styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${Led} {
    margin: .25rem 0;

    > section {
      margin: 0;
    }
  }
`;
