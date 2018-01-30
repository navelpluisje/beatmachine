// @flow

import styled from 'styled-components';
import Button from '../../../../elements/button';

export const MatrixLabel = styled.div`
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

export const MatrixButton = styled(Button)`
  flex: 1;
  margin: 0 .25rem;
  padding: .25rem;

  &:last-of-type {
    margin-right: 0;
  }
`;

export default styled.section`
  border-bottom: 1px solid #33333a;
  display: flex;
  padding: .5rem .75rem .5rem 0;
`;
