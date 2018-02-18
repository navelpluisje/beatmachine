// @flow

import styled from 'styled-components';
import Button from '../../../../../../elements/button/button.styled';

export const StepGroup = styled.section`
  display: flex;
  flex-direction: row;
`;

export const ButtonBar = styled.section`
  padding: .5rem 0 0;
  text-align: center;

  ${Button} {
    &:first-of-type {
      margin-left: 0;
    }
    &:last-of-type {
      margin-right: 0;
    }
  }
`;

export const StyledSteps = styled.div`
  align-self: flex-start;
  border-bottom: 1px solid white;
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  padding-bottom: .5rem;
  position: relative;

  &::after {
    content: 'Length';
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
