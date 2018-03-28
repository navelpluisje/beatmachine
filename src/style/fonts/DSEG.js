// @flow

import { css } from 'styled-components';
import DSEG from './fonts/DSEG14Classic-Italic.woff2';

export default css`
  @font-face {
    font-family: 'DSEG';
    font-style: normal;
    font-weight: 400;
    src: local('DSEG'), url(${DSEG}) format('woff2');
}`;
