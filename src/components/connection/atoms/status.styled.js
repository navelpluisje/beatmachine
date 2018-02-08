// @flow

import styled from 'styled-components';
import LedWrapper from '../../../elements/led/led.styled';
import Button from '../../../elements/button/button.styled';

export default styled.div`
  border-color: white;
  border-style: solid;
  border-width: 0 1px 1px;
  flex: 3;

  ${LedWrapper}:first-of-type {
    margin-top: .5rem;
  }
`;

export const Title = styled.div`
  background-color: white;
  border-color: #353f4e;
  border-style: solid;
  border-width: 0 2px;
  color: #33333a;
  font-size: .75rem;
  padding: .25rem;
  text-transform: uppercase;
`;

export const Switch = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;

  ${Button} {
    &:first-of-type {
      margin-bottom: .5rem;
    }
  }
`;

