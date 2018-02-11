// @flow

import styled from 'styled-components';

export default styled.section`
  background-color: #181818;
  border-color: #181818 #34343584 #34343584 #181818;
  border-style: solid;
  border-width: 1px;
  flex-grow: 2;
  flex-shrink: 0;
  font-family: DSEG;
  font-size: ${props => (props.small ? '1rem' : '2rem')};
  height: ${props => (props.small ? '1rem' : '2.6rem')};
  line-height: 1.3;
  padding: .5rem 0;
  position: relative;
`;

const DisplayContent = styled.span`
  display: inline-block;
  position: absolute;
  text-align: center;
  width: 100%;
`;

export const DisplayBack = styled(DisplayContent)`
  color: #34343584;
`;

export const DisplayText = styled(DisplayContent)`
  color: #b1afb5;
  text-shadow: 0 0 6px #b1afb5;
`;
