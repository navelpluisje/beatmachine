// @flow

import { css } from 'styled-components';

const url = 'https://fonts.gstatic.com/s/robotocondensed/v16/b9QBgL0iMZfDSpmcXcE8nFVSrcc0PghHf9qMZsyNJkz2Ot9t5h1GRSTIE78Whtoh.woff2';

export default css`
  @font-face {
    font-family: 'Roboto Condensed';
    font-style: normal;
    font-weight: 300;
    src: local('Roboto Condensed Light'), local('RobotoCondensed-Light'), url(${url}) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
  }

  @font-face {
    font-family: 'Roboto Condensed';
    font-style: normal;
    font-weight: 400;
    src: local('Roboto Condensed Regular'), local('RobotoCondensed-Regular'), url(${url}) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
  }
}
`;
