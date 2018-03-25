
import DdpHandler from './ddpHandler';
import {
  DDP_TOGGLE_CONNECTED,
  DDP_RECONNECT,
  CHANNELS_SET_STEP,
  CHANNELS_SET_STEP_DDP,
} from '../../store/constants';
import { getUrl } from '../../store/ddp/selectors';
import { setSending, setReceiving, setDdpConnection } from '../../store/ddp/actions';
import { DDPException } from '../helpers/exceptions';
import type { AllActions } from '../../store/types'; // eslint-disable-line flowtype/no-types-missing-file-annotation

const ddpChanged = dispatch => (id, oldFields, clearedFields, newFields) => {
  Object.entries(newFields).forEach(([key, value]) => {
    if (key !== '_id') {
      dispatch(setReceiving(true));
      dispatch({
        type: CHANNELS_SET_STEP_DDP,
        meta: {
          ...value,
        },
      });
    }
  });
};

const ddpAdded = dispatch => (id, newFields) => {
  Object.entries(newFields).forEach(([key, value]) => {
    if (key !== '_id') {
      dispatch(setReceiving(true));
      dispatch({
        type: CHANNELS_SET_STEP_DDP,
        meta: {
          ...value,
        },
      });
    }
  });
};


const ddpMiddleware = (url) => {
  const ddpHandler = new DdpHandler(url);

  return (store: *) => (next: Function) => (action: AllActions) => { // eslint-disable-line
    // Check if we are connected an connect if we did not
    switch (action.type) {
    case DDP_TOGGLE_CONNECTED: {
      const ddpAction = { ...action };
      const { dispatch } = store;

      try {
        if (!ddpHandler.connected) {
          ddpHandler.setUrl(getUrl(store.getState()));
          ddpHandler.connect(
            ddpAdded(dispatch),
            ddpChanged(dispatch),
          );
          ddpAction.connected = true; // ddpHandler.connected;
          dispatch(setDdpConnection(ddpAction.connected));
        } else {
          ddpAction.connected = false; //
          ddpHandler.close();
          dispatch(setDdpConnection(false));
        }
      } catch (e) {
        dispatch(setDdpConnection(false));
        throw new DDPException(`Error while connecting: ${e}`);
      }
      return next(ddpAction);
    }

    case DDP_RECONNECT: {
      const ddpAction = { ...action };
      const { dispatch } = store;
      ddpAction.connected = false;
      ddpHandler.setUrl(action.url);

      try {
        ddpHandler.reConnect(
          ddpAdded(dispatch),
          ddpChanged(dispatch),
        );
        ddpAction.connected = true;
        dispatch(setDdpConnection(true));
      } catch (e) {
        ddpAction.connected = false; //
        dispatch(setDdpConnection(false));
        throw new DDPException(`Error while connecting: ${e}`);
      }
      return next(ddpAction);
    }

    case CHANNELS_SET_STEP:
      ddpHandler.call('click', [
        action.meta.channel,
        action.meta.step,
        action.meta.value,
      ]);

      if (action.meta.connected === true) {
        store.dispatch(setSending(true));
      }
      break;

    default:
    }

    return next(action);
  };
};

export default ddpMiddleware;
