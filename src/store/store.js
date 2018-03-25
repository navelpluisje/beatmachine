// @flow

import { createStore, applyMiddleware, compose } from 'redux';
import type { Store } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import soundsMiddleware from '../middleware/soundsMiddleware';
import sequencerMiddleware from '../middleware/sequencerMiddleware';
import ddpMiddleware from '../middleware/ddpMiddleware';
import midiMiddleware from '../middleware/midiMiddleware';
import { SOUNDS } from '../constants';
import type { GlobalState, AllActions } from './types';

const makeStore = (initialState: Object = {}): Store<GlobalState, AllActions> => {
  const middleware = [thunk]
    .filter(x => !!x);

  const composers = []
    .concat(window.devToolsExtension && [window.devToolsExtension()])
    .filter(x => !!x);

  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        ...middleware,
        soundsMiddleware(SOUNDS),
        sequencerMiddleware(),
        ddpMiddleware('ws://localhost:3000', 0),
        midiMiddleware(),
      ),
      ...composers,
    ),
  );
};

export default makeStore;
