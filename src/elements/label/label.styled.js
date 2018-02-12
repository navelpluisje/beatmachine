// @flow

import styled from 'styled-components';

export default styled.label`
  border-bottom: 1px solid white;
  display: block;
  margin-bottom: .5rem;

  > span {
    background-color: white;
    color: #33333a;
    display: inline-block;
    font-size: .75rem;
    line-height: 1.5;
    padding: 0  .75rem;
    position: relative;
    text-transform: uppercase;

    &:after {
      border-color: transparent transparent white white;
      border-style: solid;
      border-width: .75em;
      content: '';
      display: block;
      left: 100%;
      position: absolute;
      top: 0;
    }
  }
`;
