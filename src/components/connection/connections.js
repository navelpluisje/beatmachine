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

type StateProps = {
  grid: boolean,
}

type DispatchProps = {
  toggleGrid: Function,
}

type Props = StateProps & DispatchProps;

const Connection = ({ grid, toggleGrid }: Props) => (
  <Container>
    <Title>Connection</Title>
    <Content>
      <Switch>
        <Button
          color="green"
          active={false}
        >
          &#9901;
        </Button>
        <Button
          active={false}
          color="white"
        >
          &#9999;
        </Button>
      </Switch>
      <Status>
        <StatusTitle>Status</StatusTitle>
        <Led
          label="Connected"
          active={false}
          color="green"
        />
        <Led
          label="Send"
          color="blue"
          active={false}
        />
        <Led
          label="Receive"
          color="red"
          active={false}
        />
      </Status>
    </Content>
    <GridSettings>
      <Button
        active={grid}
        color="yellow"
        onClick={toggleGrid}
      >
       &#9776;
      </Button>
    </GridSettings>
  </Container>
);

const mapStateToProps = (state: *): StateProps => ({
  grid: showGrid(state),
});

const mapDispatchToProps = (dispatch: Dispatch<*>): DispatchProps => ({
  toggleGrid: () => dispatch(toggleSequencerGrid()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Connection);
