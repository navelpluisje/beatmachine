// @flow

import styled from 'styled-components';

export default styled.section`
  border-color: white;
  border-style: solid;
  border-width: 0 1px;
  flex: 1;
`;

export const Title = styled.div`
  background-color: white;
  border-color: #353f4c;
  border-style: solid;
  border-width: 0 2px;
  color: #353f4c;
  font-size: .875rem;
  padding: .25rem;
  text-align: center;
  text-transform: uppercase;
`;

export const Explanation = styled.section`
font-weight: 300;
  padding: .75rem;

  p {
    margin-bottom: .5rem;
  }

  a,
  a:visited {
    color: white;
    text-decoration: underline;
  }
`;
