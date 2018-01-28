// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import StyledControls from './controls.styled';
import Button from '../../../../../../elements/button';
import { Container } from './atoms';
import {
  setSequencerRunning,
  setSequencerStopped,
} from '../../../../../../store/actions/sequencer';
import {
  isRunning,
  isStopped,
} from '../../../../../../store/selectors/sequencer';

type StateProps = {
  running: boolean,
  stopped: boolean,
};

type DispatchProps = {
  toggleRunning: Function,
  stopSequence: Function,
};

type Props = StateProps & DispatchProps & {
  className?: string,
};

class Controls extends Component<Props, *> {
  static defaultProps = {
    className: '',
  };

  handlePlayButonClick = () => {
    const { toggleRunning, running } = this.props;
    toggleRunning(!running);
  };

  handleStopButonClick = () => {
    const { stopSequence, stopped } = this.props;
    if (!stopped) {
      stopSequence();
    }
  };

  render() {
    const { className, running, stopped } = this.props;
    return (
      <Container>
        <StyledControls className={className} >
          <Button
            active={stopped}
            color="red"
            onClick={this.handleStopButonClick}
          >
            &#9632;
          </Button>
          <Button
            active={running}
            color="green"
            onClick={this.handlePlayButonClick}
          >
            &#9658;
          </Button>
        </StyledControls>
      </Container>
    );
  }
}

const mapStateToProps = (state: *): StateProps => ({
  running: isRunning(state),
  stopped: isStopped(state),
});

const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
  toggleRunning: (running: boolean) => dispatch(setSequencerRunning(running)),
  stopSequence: () => dispatch(setSequencerStopped()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
