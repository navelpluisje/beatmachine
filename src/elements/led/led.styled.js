// @flow

import styled from 'styled-components';
import { light, buttonActiveState } from '../button';

export default styled.section`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-bottom: .5rem;
`;

export const Label = styled.div`
  color: #ffffff;
  font-size: .75rem;
  font-weight: 300;
  text-shadow: 0 0 1px black;
`;

export const Led = styled.section`
  ${light};
  border-radius: 50%;
  margin-right: .25rem;
  padding: .25rem;

  ${props => props.active && props.color && buttonActiveState(props)};
`;
