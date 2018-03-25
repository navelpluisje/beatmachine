// @flow

import React from 'react';
import { connect } from 'react-redux';
import StatusLed from '../../../../../elements/statusLed';
import { getSolo } from '../../../../../store/sounds/selectors';
import { toggleSoundSolo } from '../../../../../store/sounds/actions';
import type { GlobalState } from '../../../../../store/types';

type DispatchProps = {
  setSolo: Function,
};

type StateProps = {
  solo: boolean,
};

type Props = StateProps & DispatchProps;

const SoloButton = ({
  setSolo,
  solo,
}: Props) => (
  <StatusLed
    label="Solo"
    active={solo}
    color="green"
    onClick={setSolo}
  />
);

const mapStateToProps = (state: GlobalState, ownProps): StateProps => ({
  solo: getSolo(state, ownProps.sound),
});

const mapDispatchToProps = (dispatch: Dispatch<*>, ownProps): DispatchProps => ({
  setSolo: () => dispatch(toggleSoundSolo(ownProps.sound)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SoloButton);
