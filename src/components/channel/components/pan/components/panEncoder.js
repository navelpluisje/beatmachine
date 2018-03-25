// @flow

import React from 'react';
import { connect } from 'react-redux';
import Encoder from '../../../../../elements/encoder';
import { getPan } from '../../../../../store/sounds/selectors';
import { setSoundPan } from '../../../../../store/sounds/actions';
import type { GlobalState } from '../../../../../store/types';

type DispatchProps = {
  setPan: Function,
};

type StateProps = {
  pan: number,
};

type Props = StateProps & DispatchProps;

const PanEncoder = ({
  setPan,
  pan,
}: Props) => (
  <Encoder
    min={-1}
    max={1}
    step={2}
    value={pan}
    onChange={(value) => { setPan(value); }}
    label="Pan"
    backgroundColor="#353f4c"
  />
);

const mapStateToProps = (state: GlobalState, ownProps): StateProps => ({
  pan: getPan(state, ownProps.sound),
});

const mapDispatchToProps = (dispatch: Dispatch<*>, ownProps): DispatchProps => ({
  setPan: (value: number) => dispatch(setSoundPan(ownProps.sound, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PanEncoder);
