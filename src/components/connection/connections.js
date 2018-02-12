// @flow

import React from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Title,
  Content,
  Status,
  StatusTitle,
  Switch,
  GridSettings,
} from './atoms';
import Led from '../../elements/led';
import Button from '../../elements/button';
import { toggleSequencerGrid } from '../../store/actions/sequencer';
import { showGrid } from '../../store/selectors/sequencer';
import { toggleDdpConnection, toggleDdpSettings } from '../../store/actions/ddp';
import { isConnected, showSettings, isSending, isReceiving } from '../../store/selectors/ddp';
import Icon from '../icons';

type StateProps = {
  grid: boolean,
  connected: boolean,
  sending: boolean,
  receiving: boolean,
  settings: boolean,
}

type DispatchProps = {
  toggleGrid: Function,
  toggleConnection: Function,
  toggleSettings: Function,
}

type Props = StateProps & DispatchProps;

const Connection = ({
  grid,
  toggleGrid,
  connected,
  sending,
  receiving,
  settings,
  toggleConnection,
  toggleSettings,
}: Props) => (
  <Container>
    <Title>Connection</Title>
    <Content>
      <Switch>
        <Button
          color="green"
          active={connected}
          onClick={toggleConnection}
        >
          <Icon icon="connect" />
        </Button>
        <Button
          active={settings}
          color="yellow"
          onClick={toggleSettings}
        >
          <Icon icon="edit" />
        </Button>
      </Switch>
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
    </Content>
    <GridSettings>
      <Button
        active={grid}
        color="yellow"
        onClick={toggleGrid}
      >
        <Icon icon="grid" />
      </Button>
    </GridSettings>
  </Container>
);

const mapStateToProps = (state: *): StateProps => ({
  grid: showGrid(state),
  connected: isConnected(state),
  sending: isSending(state),
  receiving: isReceiving(state),
  settings: showSettings(state),
});

const mapDispatchToProps = (dispatch: Dispatch<*>): DispatchProps => ({
  toggleGrid: () => dispatch(toggleSequencerGrid()),
  toggleConnection: () => dispatch(toggleDdpConnection()),
  toggleSettings: () => dispatch(toggleDdpSettings()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Connection);
