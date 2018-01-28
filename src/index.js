// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

const dom = document.getElementById('beat-machine');

if (dom) {
  ReactDOM.render(
    <App />,
    dom,
  );
}
