// @flow

import styled from 'styled-components';
import Button from '../../../elements/button/button.styled';

export default styled.section`
  align-items: center;
  background-color: #33333b;
  display: flex;
  flex-direction: row;
  padding: .75rem;

  ${Button} {
    flex: 1;
    padding: .5rem;
    width: auto;

    &:first-of-type {
      margin-left: 0;
    }

    &:last-of-type {
      margin-right: 0;
    }
  }
`;
