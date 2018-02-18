// @flow

import styled from 'styled-components';
import Button from '../../../../elements/button';

export default styled(Button)`
  flex: 1;
  margin: 0 .25rem;
  padding: .25rem;
  z-index: 1;

  &:last-of-type {
    margin-right: 0;
  }
`;

