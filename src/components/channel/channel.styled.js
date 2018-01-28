// @flow

import styled from 'styled-components';
import Encoder from '../../elements/encoder/encoder.styled';
import Button from '../../elements/button/button.styled';

export default styled.section`
  border-color: white;
  border-style: solid;
  border-width: 0 0 0 1px;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 .75rem;

  &:last-of-type {
    border-width: 0 1px;
  }

  ${Encoder}:nth-of-type(odd) {
    align-self: flex-end;
  }

  ${Button} {
    margin: 0;
    wicth: 100%;
  }
`;

export const Title = styled.div`
  background: white;
  color: #33333a;
  margin: 0 calc(-.75rem + 2px) 1rem;
  padding: .25rem;
`;
