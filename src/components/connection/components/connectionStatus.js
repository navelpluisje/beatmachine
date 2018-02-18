// @flow

import React from 'react';
import { connect } from 'react-redux';
import Status, { Title as StatusTitle } from './status.styled';
import Led from '../../../elements/led';
import { isConnected, isSending, isReceiving } from '../../../store/selectors/ddp';
import type { GlobalState } from '../../../store/types';

type StateProps = {
  connected: boolean,
  sending: boolean,
  receiving: boolean,
}

type Props = StateProps;

const Connection = ({
  connected,
  sending,
  receiving,
}: Props) => (
  <Status>
    <StatusTitle>Status</StatusTitle>
    <Led
      label="Connected"
      active={connected}
      color="green"
    />
    <Led
      label="Send"
      color="blue"
      active={sending}
    />
    <Led
      label="Receive"
      color="red"
      active={receiving}
    />
  </Status>
);

const mapStateToProps = (state: GlobalState): StateProps => ({
  connected: isConnected(state),
  sending: isSending(state),
  receiving: isReceiving(state),
});

export default connect(mapStateToProps)(Connection);
