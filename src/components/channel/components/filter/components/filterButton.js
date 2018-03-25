// @flow

import React from 'react';
import { connect } from 'react-redux';
import StatusLed from '../../../../../elements/statusLed';
import { getFilter } from '../../../../../store/sounds/selectors';
import { toggleSoundFilter } from '../../../../../store/sounds/actions';
import type { GlobalState } from '../../../../../store/types';

type DispatchProps = {
  setFilter: Function,
};

type StateProps = {
  filter: boolean,
};

type Props = StateProps & DispatchProps;

const FilterButton = ({
  setFilter,
  filter,
}: Props) => (
  <StatusLed
    label="Filter"
    active={filter}
    color="white"
    onClick={setFilter}
  />
);

const mapStateToProps = (state: GlobalState, ownProps): StateProps => ({
  filter: getFilter(state, ownProps.sound),
});

const mapDispatchToProps = (dispatch: Dispatch<*>, ownProps): DispatchProps => ({
  setFilter: () => dispatch(toggleSoundFilter(ownProps.sound)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterButton);
