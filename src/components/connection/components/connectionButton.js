// @flow

import React from 'react';
import { connect } from 'react-redux';
import Button from '../../../elements/button';
import { toggleDdpConnection } from '../../../store/ddp/actions';
import { isConnected } from '../../../store/ddp/selectors';
import Icon from '../../icons';
import type { GlobalState } from '../../../store/types';

type StateProps = {
  connected: boolean,
}

type DispatchProps = {
  toggleConnection: Function,
}

type Props = StateProps & DispatchProps;

const Connection = ({
  connected,
  toggleConnection,
}: Props) => (
  <Button
    color="green"
    active={connected}
    onClick={toggleConnection}
  >
    <Icon icon="connect" />
  </Button>
);

const mapStateToProps = (state: GlobalState): StateProps => ({
  connected: isConnected(state),
});

const mapDispatchToProps = (dispatch: Dispatch<*>): DispatchProps => ({
  toggleConnection: () => dispatch(toggleDdpConnection()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Connection);
