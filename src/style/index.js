// @flow

import { injectGlobal } from 'styled-components';
import reset from 'styled-reset';
import {
  DSEG,
  RobotoCondensed,
  RacingSansOne,
} from './fonts';

export default () => injectGlobal`
  ${DSEG}
  ${RobotoCondensed}
  ${RacingSansOne}
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
