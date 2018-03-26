// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Channels from '../channels';
import TheMatrix from '../theMatrix';
import ConnectionSettings from '../connectionSettings';
import MidiSettings from '../midiSettings';
import CustomDrumkit from '../customDrumkit';
import { showGrid } from '../../store/sequencer/selectors';
import { showSettings } from '../../store/ddp/selectors';
import { showDrumkitSettings } from '../../store/drumkit/selectors';
import { showMidi } from '../../store/midi/selectors';

type StateProps = {
  grid: boolean,
  connection: boolean,
  customDrumkit: boolean,
  midi: boolean,
};

type Props = StateProps;

class BottomBar extends Component<Props, *> {
  getComponent() {
    const {
      grid,
      connection,
      customDrumkit,
      midi,
    } = this.props;
    if (customDrumkit) {
      return (<CustomDrumkit />);
    }
    if (connection) {
      return (<ConnectionSettings />);
    }
    if (midi) {
      return (<MidiSettings />);
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
  midi: showMidi(state),
  customDrumkit: showDrumkitSettings(state),
});

export default connect(mapStateToProps)(BottomBar);
