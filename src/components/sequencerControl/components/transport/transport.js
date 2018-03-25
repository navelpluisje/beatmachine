// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Container, Controls, Drumkit } from './components';
import Display from '../../../../elements/display';
import { getSpeed } from '../../../../store/sequencer/selectors';

type StateProps = {
  speed: number,
}

type Props = StateProps;

const Transport = ({ speed }: Props) => (
  <Container>
    <Display
      content={speed.toString()}
      length={3}
    />
    <Controls />
    <Drumkit />
  </Container>
);

const mapStateToProps = (state: *): StateProps => ({
  speed: getSpeed(state),
});

export default connect(mapStateToProps, null)(Transport);
