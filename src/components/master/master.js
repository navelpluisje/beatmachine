// @flow

import React from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Title,
  Content,
  Distortion,
  Logo,
} from './atoms';
import Encoder from '../../elements/encoder';
import { setVolume as setMasterVolume } from '../../store/actions/master';
import { getVolume } from '../../store/selectors/master';
import type { GlobalState } from '../../store/types';

type DispatchProps = {
  setVolume: Function,
};

type StateProps = {
  volume: number,
};

type Props = StateProps & DispatchProps;

const Master = ({ setVolume, volume }: Props) => (
  <div>
    <Container>
      <Title>Master</Title>
      <Content>
        <Distortion />
        <Encoder
          size="75px"
          color="light"
          min={0}
          max={1.5}
          step={2}
          value={volume}
          backgroundColor="#33333a"
          label="Volume"
          onChange={value => setVolume(value)}
        />
      </Content>
    </Container>
    <Logo>BeatMachine</Logo>
  </div>
);

const mapStateToProps = (state: GlobalState) => ({
  volume: getVolume(state),
});

const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  setVolume: (value: number) => dispatch(setMasterVolume(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Master);
