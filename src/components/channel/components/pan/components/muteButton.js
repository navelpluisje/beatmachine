// @flow

import React from 'react';
import { connect } from 'react-redux';
import StatusLed from '../../../../../elements/statusLed';
import { getMute } from '../../../../../store/sounds/selectors';
import { toggleSoundMute } from '../../../../../store/sounds/actions';
import type { GlobalState } from '../../../../../store/types';

type DispatchProps = {
  setMute: Function,
};

type StateProps = {
  mute: boolean,
};

type Props = StateProps & DispatchProps;

const MuteButton = ({
  setMute,
  mute,
}: Props) => (
  <StatusLed
    label="Mute"
    active={mute}
    color="red"
    onClick={setMute}
  />
);

const mapStateToProps = (state: GlobalState, ownProps): StateProps => ({
  mute: getMute(state, ownProps.sound),
});

const mapDispatchToProps = (dispatch: Dispatch<*>, ownProps): DispatchProps => ({
  setMute: () => dispatch(toggleSoundMute(ownProps.sound)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MuteButton);
