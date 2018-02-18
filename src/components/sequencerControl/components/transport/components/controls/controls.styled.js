// @flow

import styled from 'styled-components';
import Button from '../../../../../../elements/button/button.styled';

export default styled.div`
  flex: 3;
  text-align: center;

  ${Button} {
    font-size: 1.5rem;
    margin: 0 .5rem;
    padding: .5rem;
    text-align: center;
    width: 3rem;
  }
`;
