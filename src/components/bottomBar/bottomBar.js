// @flow

import React from 'react';
import { connect } from 'react-redux';
import Channels from '../channels';
import TheMatrix from '../theMatrix';
import { showGrid } from '../../store/selectors/sequencer';

type StateProps = {
  grid: boolean,
};

type Props = StateProps;

const BottomBar = ({ grid }: Props) => (
  <div>
    {!grid && <Channels />}
    {grid && <TheMatrix />}
  </div>
);

const mapStateToProps = (state: *): StateProps => ({
  grid: showGrid(state),
});

export default connect(mapStateToProps)(BottomBar);
