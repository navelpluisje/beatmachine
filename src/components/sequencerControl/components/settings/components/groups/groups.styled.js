// @flow

import styled from 'styled-components';
import Button from '../../../../../../elements/button';

export const GroupButton = styled(Button)`
  font-size: .5rem;
  flex: 1;
  height: 3.125rem;
`;

export const StyledGroup = styled.div`
  align-self: flex-start;
  border-bottom: 1px solid white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 1rem;
  padding-bottom: .5rem;
  position: relative;

  &::after {
    content: 'Edit';
    display: block;
    font-size: .5rem;
    font-weight: 300;
    padding-top: .25rem;
    position: absolute;
    text-align: center;
    text-shadow: 0 0 1px black;
    text-transform: uppercase;
    top: 100%;
    width: 100%;
    z-index: 1;
  }
`;

export default null;
