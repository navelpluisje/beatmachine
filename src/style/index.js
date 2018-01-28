// @flow

import { injectGlobal } from 'styled-components';
import reset from 'styled-reset';
import {
  DSEG,
  RobotoCondensed,
} from './fonts';

export default () => injectGlobal`
  ${DSEG}
  ${RobotoCondensed}
  ${reset}

  body {
    background: #353f4e;
    color: white;
    font-family: 'Roboto Condensed';
    font-weight: 400;
  }

  * {
    user-select: none;
  }

`;
