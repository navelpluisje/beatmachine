// @flow

import React from 'react';
import { connect } from 'react-redux';
import Encoder from '../../../../../elements/encoder';
import { getFilterFreq } from '../../../../../store/selectors/sounds';
import { setSoundFilterFreq } from '../../../../../store/actions/sounds';
import type { GlobalState } from '../../../../../store/types';

type DispatchProps = {
  setFilterFreq: Function,
};

type StateProps = {
  filterFreq: number,
};

type Props = StateProps & DispatchProps;

const FilterFreqEncoder = ({
  setFilterFreq,
  filterFreq,
}: Props) => (
  <Encoder
    min={50}
    max={8000}
    step={-2}
    value={filterFreq}
    onChange={(value) => { setFilterFreq(value); }}
    label="Freq"
    backgroundColor="#353f4c"
  />
);

const mapStateToProps = (state: GlobalState, ownProps): StateProps => ({
  filterFreq: getFilterFreq(state, ownProps.sound),
});

const mapDispatchToProps = (dispatch: Dispatch<*>, ownProps): DispatchProps => ({
  setFilterFreq: (value: number) => dispatch(setSoundFilterFreq(ownProps.sound, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterFreqEncoder);
