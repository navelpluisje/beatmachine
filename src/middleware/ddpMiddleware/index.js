
import DdpHandler from './ddpHandler';
import {
  DDP_TOGGLE_CONNECTED,
  CHANNELS_SET_STEP,
  CHANNELS_SET_STEP_DDP,
} from '../../store/constants';
import { DDPException } from '../helpers/exceptions';
import type { AllActions } from '../../store/actions/types'; // eslint-disable-line flowtype/no-types-missing-file-annotation

const ddpChanged = dispatch => (id, oldFields, clearedFields, newFields) => {
  console.log(id, clearedFields, newFields); // eslint-disable-line

  Object.entries(newFields).forEach(([key, value]) => {
    if (key !== '_id') {
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
      dispatch({
        type: CHANNELS_SET_STEP_DDP,
        meta: {
          ...value,
        },
      });
    }
  });
};


const ddpMiddleware = (host, port) => {
  const ddpHandler = new DdpHandler(host, port);

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
          ddpHandler.close();
        }
      } catch (e) {
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
      break;

    default:
    }

    return next(action);
  };
};

export default ddpMiddleware;
