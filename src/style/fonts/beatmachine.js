// @flow

import { css } from 'styled-components';
import BeatMachineFont from './fonts/beatmachine.woff';

export default css`
  @font-face {
    font-family: 'beatmachine';
    font-style: normal;
    font-weight: normal;
    src: url(${BeatMachineFont}) format('woff');
  }
`;
