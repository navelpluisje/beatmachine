// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../elements/button';
import {
  showDrumkitSettings,
  hasDatabaseConnection,
  hasCustomDrumkit,
} from '../../../store/drumkit/selectors';
import {
  loadCustomDrumkit,
  toggleDrumkitSettings,
  setDatabaseConnection,
} from '../../../store/drumkit/actions';
import Icon from '../../icons';
import type { GlobalState } from '../../../store/types';


type StateProps = {
  connected: boolean,
  drumkit: boolean,
  hasDrumkit: boolean,
}

type DispatchProps = {
  fetchDrumkit: Function,
  setConnection: Function,
  toggleCustomDrumkit: Function,
}

type Props = StateProps & DispatchProps;

class CustomDrumkit extends Component<Props, *> {
  componentWillMount() {
    this.props.setConnection();
  }

  componentWillReceiveProps(nextProps: Props) {
    const { connected } = this.props;
    if (connected !== nextProps.connected && nextProps.connected === true) {
      this.props.fetchDrumkit();
    }
  }

  getButtonColor() {
    const { hasDrumkit, connected } = this.props;
    if (!connected) {
      return 'red';
    }
    return hasDrumkit ? 'green' : 'yellow';
  }

  getButtonActive() {
    const { drumkit, hasDrumkit, connected } = this.props;
    return drumkit || hasDrumkit || !connected;
  }

  render() {
    const {
      toggleCustomDrumkit,
    } = this.props;
    return (
      <Button
        active={this.getButtonActive()}
        color={this.getButtonColor()}
        onClick={toggleCustomDrumkit}
      >
        <Icon icon="drumkit" />
      </Button>
    );
  }
}

const mapStateToProps = (state: GlobalState): StateProps => ({
  connected: hasDatabaseConnection(state),
  drumkit: showDrumkitSettings(state),
  hasDrumkit: hasCustomDrumkit(state),
});

const mapDispatchToProps = (dispatch: Dispatch<*>): DispatchProps => ({
  toggleCustomDrumkit: () => dispatch(toggleDrumkitSettings()),
  fetchDrumkit: () => dispatch(loadCustomDrumkit()),
  setConnection: () => dispatch(setDatabaseConnection()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrumkit);
