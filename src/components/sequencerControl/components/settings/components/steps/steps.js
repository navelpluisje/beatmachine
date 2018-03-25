// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getStepCount,
  getCurrentStep,
  getLoop,
} from '../../../../../../store/sequencer/selectors';
import {
  setNextStepCount,
  setPreviousStepCount,
  toggleLoop as toggleSequenceLoop,
} from '../../../../../../store/sequencer/actions';
import Button from '../../../../../../elements/button';
import StatusLed from '../../../../../../elements/statusLed';
import { StyledSteps, StepGroup, ButtonBar } from './steps.styled';
import Icon from '../../../../../icons';

type StateProps = {
  step: number,
  current: number,
  loop: boolean,
}

type DispatchProps = {
  next: Function,
  previous: Function,
  toggleLoop: Function,
}

type Props = StateProps & DispatchProps;

const steps = [16, 32, 48, 64];

class Steps extends Component<Props> {
  shouldComponentUpdate(nextProps) {
    const {
      current,
      step,
      loop,
    } = this.props;
    if (
      Math.trunc(current / 16) === Math.trunc(nextProps.current / 16) &&
      step === nextProps.step &&
      loop === nextProps.loop
    ) {
      return false;
    }
    return true;
  }

  getLedColor(count: number, index: number) {
    const {
      current,
      step,
    } = this.props;

    const currentStep = Math.trunc(current / 16) === index;

    if (step === count && currentStep) {
      return 'blue';
    }
    if (step === count) {
      return 'green';
    }
    return 'white';
  }

  render() {
    const {
      current,
      step,
      loop,
      next,
      previous,
      toggleLoop,
    } = this.props;
    return (
      <StyledSteps>
        <StepGroup>
          {steps && steps.map((count, index) => (
            <StatusLed
              key={index} // eslint-disable-line
              active={step === count || Math.trunc(current / 16) === index}
              color={this.getLedColor(count, index)}
              label={count.toString()}
            />
          ))}
        </StepGroup>
        <ButtonBar>
          <Button
            size="small"
            onClick={previous}
          >
            <Icon icon="arrowLeft" />
          </Button>
          <Button
            size="small"
            color="green"
            active={loop}
            onClick={toggleLoop} // eslint-disable-line
          >
            <Icon icon="loop" />
          </Button>
          <Button
            size="small"
            onClick={next} // eslint-disable-line
          >
            <Icon icon="arrowRight" />
          </Button>
        </ButtonBar>
      </StyledSteps>
    );
  }
}

const mapStateToProps = (state: *): StateProps => ({
  step: getStepCount(state),
  current: getCurrentStep(state),
  loop: getLoop(state) !== -1,
});

const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
  next: () => dispatch(setNextStepCount()),
  previous: () => dispatch(setPreviousStepCount()),
  toggleLoop: () => dispatch(toggleSequenceLoop()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Steps);
