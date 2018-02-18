// @flow

import styled from 'styled-components';

export default styled.div`
  background-color: #33333a;
  flex: 3;
  height: 1rem;
  margin-top: -.5rem;
  padding: .25rem 0 .25rem .75rem;
  position: relative;

  &::after {
    border-color: transparent #353f4c #353f4c transparent;
    border-style: solid;
    border-width: .75rem;
    content: '';
    display: block;
    height: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 0;
  }
`;

