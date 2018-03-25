// @flow

import React from 'react';
import { connect } from 'react-redux';
import Button from '../../../elements/button';
import { toggleSequencerGrid } from '../../../store/sequencer/actions';
import { showGrid } from '../../../store/sequencer/selectors';
import Icon from '../../icons';
import type { GlobalState } from '../../../store/types';

type StateProps = {
  grid: boolean,
}

type DispatchProps = {
  toggleGrid: Function,
}

type Props = StateProps & DispatchProps;

const Connection = ({
  grid,
  toggleGrid,
}: Props) => (
  <Button
    active={grid}
    color="yellow"
    onClick={toggleGrid}
  >
    <Icon icon="grid" />
  </Button>
);

const mapStateToProps = (state: GlobalState): StateProps => ({
  grid: showGrid(state),
});

const mapDispatchToProps = (dispatch: Dispatch<*>): DispatchProps => ({
  toggleGrid: () => dispatch(toggleSequencerGrid()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Connection);
