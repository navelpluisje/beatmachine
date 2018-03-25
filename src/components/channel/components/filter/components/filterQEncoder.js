// @flow

import React from 'react';
import { connect } from 'react-redux';
import Encoder from '../../../../../elements/encoder';
import { getFilterQ } from '../../../../../store/sounds/selectors';
import { setSoundFilterQ } from '../../../../../store/sounds/actions';
import type { GlobalState } from '../../../../../store/types';

type DispatchProps = {
  setFilterQ: Function,
};

type StateProps = {
  filterQ: number,
};

type Props = StateProps & DispatchProps;

const FilterQEncoder = ({
  setFilterQ,
  filterQ,
}: Props) => (
  <Encoder
    min={0}
    max={35}
    step={1}
    value={filterQ}
    onChange={(value) => { setFilterQ(value); }}
    label="Filter Q"
    backgroundColor="#353f4c"
  />
);

const mapStateToProps = (state: GlobalState, ownProps): StateProps => ({
  filterQ: getFilterQ(state, ownProps.sound),
});

const mapDispatchToProps = (dispatch: Dispatch<*>, ownProps): DispatchProps => ({
  setFilterQ: (value: number) => dispatch(setSoundFilterQ(ownProps.sound, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterQEncoder);
