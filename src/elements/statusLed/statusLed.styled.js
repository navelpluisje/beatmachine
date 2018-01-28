// @flow

import styled from 'styled-components';
import { light, buttonActiveState } from '../button';

export default styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.div`
  color: #ffffff;
  font-size: .5rem;
  font-weight: 300;
  margin-top: .125rem;
  text-shadow: 0 0 1px black;
  text-transform: uppercase;
`;

export const Led = styled.section`
  ${light};
  border-radius: .125rem;
  padding: .15rem .5rem;

  ${props => props.active && props.color && buttonActiveState(props)};
`;
