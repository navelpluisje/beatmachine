// @flow

import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import globalStyle from './style';
import beatStore from './store/store';
import TopBar from './components/topBar';
import Sequencer from './components/sequencer';
import Channels from './components/channels';

const store = beatStore();

export default () => {
  globalStyle();
  return (
    <ReduxProvider store={store}>
      <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
        <TopBar />
        <Sequencer />
        <Channels />
      </div>
    </ReduxProvider>
  );
};
