// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Channels from '../channels';
import TheMatrix from '../theMatrix';
import ConnectionSettings from '../connectionSettings';
import CustomDrumkit from '../customDrumkit';
import { showGrid } from '../../store/sequencer/selectors';
import { showSettings } from '../../store/ddp/selectors';
import { showDrumkitSettings } from '../../store/drumkit/selectors';

type StateProps = {
  grid: boolean,
  connection: boolean,
  customDrumkit: boolean,
};

type Props = StateProps;

class BottomBar extends Component<Props, *> {
  getComponent() {
    const { grid, connection, customDrumkit } = this.props;
    if (customDrumkit) {
      return (<CustomDrumkit />);
    }
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
  customDrumkit: showDrumkitSettings(state),
});

export default connect(mapStateToProps)(BottomBar);
