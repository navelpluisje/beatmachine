// @flow

import React from 'react';
import { connect } from 'react-redux';
import Encoder from '../../../elements/encoder';
import { getGain } from '../../../store/sounds/selectors';
import { setSoundGain } from '../../../store/sounds/actions';
import type { GlobalState } from '../../../store/types';

type DispatchProps = {
  setGain: Function,
};

type StateProps = {
  gain: number,
};

type Props = StateProps & DispatchProps;

const GainEncoder = ({
  setGain,
  gain,
}: Props) => (
  <Encoder
    min={0}
    max={1}
    step={2}
    value={gain}
    onChange={(value) => { setGain(value); }}
    label="Gain"
    backgroundColor="#353f4c"
  />
);

const mapStateToProps = (state: GlobalState, ownProps): StateProps => ({
  gain: getGain(state, ownProps.sound),
});

const mapDispatchToProps = (dispatch: Dispatch<*>, ownProps): DispatchProps => ({
  setGain: (value: number) => dispatch(setSoundGain(ownProps.sound, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GainEncoder);
