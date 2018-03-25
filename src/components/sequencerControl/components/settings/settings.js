// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Container, Steps, Groups } from './components';
import Encoder from '../../../../elements/encoder';
import { getSpeed } from '../../../../store/sequencer/selectors';
import { setSpeed } from '../../../../store/sequencer/actions';

type StateProps = {
  speed: number,
}

type DispatchProps = {
  set: Function,
}

type Props = StateProps & DispatchProps;

const Settings = ({ speed, set }: Props) => (
  <Container>
    <Encoder
      min={30}
      max={240}
      step={0}
      value={speed}
      onChange={set}
      label="Tempo"
      backgroundColor="#33333a"
      color="light"
    />
    <Steps />
    <Groups />
  </Container>
);

const mapStateToProps = (state: *): StateProps => ({
  speed: getSpeed(state),
});

const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
  set: (value: number) => dispatch(setSpeed(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
