
import DdpHandler from './ddpHandler';
import {
  DDP_TOGGLE_CONNECTED,
  DDP_RECONNECT,
  CHANNELS_SET_STEP,
  CHANNELS_SET_STEP_DDP,
} from '../../store/constants';
import { setSending, setReceiving } from '../../store/actions/ddp';
import { DDPException } from '../helpers/exceptions';
import type { AllActions } from '../../store/actions/types'; // eslint-disable-line flowtype/no-types-missing-file-annotation

const ddpChanged = dispatch => (id, oldFields, clearedFields, newFields) => {
  console.log(id, clearedFields, newFields); // eslint-disable-line

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
  console.log(newFields); // eslint-disable-line
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
  console.log(url); // eslint-disable-line
  return (store: *) => (next: Function) => (action: AllActions) => { // eslint-disable-line
    // Check if we are connected an connect if we did not
    switch (action.type) {
    case DDP_TOGGLE_CONNECTED: {
      const ddpAction = { ...action };
      try {
        const { dispatch } = store;
        if (!ddpHandler.connected) {
          ddpHandler.connect(
            ddpAdded(dispatch),
            ddpChanged(dispatch),
          );
          ddpAction.connected = true; //
        } else {
          ddpAction.connected = false; //
          ddpHandler.close();
        }
      } catch (e) {
        throw new DDPException(`Error while connecting: ${e}`);
      }
      return next(ddpAction);
    }

    case DDP_RECONNECT: {
      const ddpAction = { ...action };
      ddpAction.connected = false;
      ddpHandler.setUrl(action.url);

      try {
        const { dispatch } = store;
        ddpHandler.reConnect(
          ddpAdded(dispatch),
          ddpChanged(dispatch),
        );
        ddpAction.connected = true;
      } catch (e) {
        ddpAction.connected = false; //
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
