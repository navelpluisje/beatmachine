// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Channels from '../channels';
import TheMatrix from '../theMatrix';
import ConnectionSettings from '../connectionSettings';
import { showGrid } from '../../store/selectors/sequencer';
import { showSettings } from '../../store/selectors/ddp';

type StateProps = {
  grid: boolean,
  connection: boolean,
};

type Props = StateProps;

class BottomBar extends Component<Props, *> {
  getComponent() {
    const { grid, connection } = this.props;

    if (connection) {
      return (<ConnectionSettings />);
    }
    if (grid) {
      return (<TheMatrix />);
    }

    return (<Channels />);
  }

  render() {
    return this.getComponent();
  }
}

const mapStateToProps = (state: *): StateProps => ({
  grid: showGrid(state),
  connection: showSettings(state),
});

export default connect(mapStateToProps)(BottomBar);
