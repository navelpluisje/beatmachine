// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../elements/button';
import { showDrumkitSettings, hasDatabaseConnection } from '../../../store/selectors/drumkit';
import {
  loadCustomDrumkit,
  toggleDrumkitSettings,
  setDatabaseConnection,
} from '../../../store/actions/drumkit';
import Icon from '../../icons';
import type { GlobalState } from '../../../store/types';


type StateProps = {
  drumkit: boolean,
  connected: boolean,
}

type DispatchProps = {
  toggleCustomDrumkit: Function,
  fetchDrumkit: Function,
  setConnection: Function,
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

  render() {
    const {
      drumkit,
      toggleCustomDrumkit,
    } = this.props;
    return (
      <Button
        active={drumkit}
        color="yellow"
        onClick={toggleCustomDrumkit}
      >
        <Icon icon="drumkit" />
      </Button>
    );
  }
}

const mapStateToProps = (state: GlobalState): StateProps => ({
  drumkit: showDrumkitSettings(state),
  connected: hasDatabaseConnection(state),
});

const mapDispatchToProps = (dispatch: Dispatch<*>): DispatchProps => ({
  toggleCustomDrumkit: () => dispatch(toggleDrumkitSettings()),
  fetchDrumkit: () => dispatch(loadCustomDrumkit()),
  setConnection: () => dispatch(setDatabaseConnection()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrumkit);
