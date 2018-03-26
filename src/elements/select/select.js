// @flow

import styled from 'styled-components';

export default styled.select`
  background-color: #181818;
  border-color: #181818 #34343584 #34343584 #181818;
  border-style: solid;
  border-width: 1px;
  box-sizing: border-box;
  border-width: 0;
  color: #b1afb5;
  font-family: DSEG;
  font-size: .75rem;
  height: ${props => props.size * 1.5}rem;
  line-height: 1.3;
  margin-bottom: .75rem;
  padding: .5rem;
  position: relative;
  text-shadow: 0 0 4px #b1afb5;
  top: 0;
  width: 100%;

  &:focus {
    outline: none
  }

  option {
    padding: .25rem;
  }
`;
