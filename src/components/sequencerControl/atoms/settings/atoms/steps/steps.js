// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStepCount, getCurrentStep } from '../../../../../../store/selectors/sequencer';
import {
  setNextStepCount,
  setPreviousStepCount,
} from '../../../../../../store/actions/sequencer';
import Button from '../../../../../../elements/button';
import StatusLed from '../../../../../../elements/statusLed';
import { StyledSteps, StepGroup, ButtonBar } from './steps.styled';

type StateProps = {
  step: number,
  current: number,
}

type DispatchProps = {
  next: Function,
  previous: Function,
}

type Props = StateProps & DispatchProps;

const steps = [16, 32, 48, 64];

class Steps extends Component<Props> {
  shouldComponentUpdate(nextProps) {
    const {
      current,
      step,
    } = this.props;
    if (
      Math.trunc(current / 16) === Math.trunc(nextProps.current / 16) &&
      step === nextProps.step
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
      next,
      previous,
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
            &#8678;
          </Button>
          <Button
            size="small"
            onClick={next} // eslint-disable-line
          >
            &#8680;
          </Button>
        </ButtonBar>
      </StyledSteps>
    );
  }
}

const mapStateToProps = (state: *): StateProps => ({
  step: getStepCount(state),
  current: getCurrentStep(state),
});

const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
  next: () => dispatch(setNextStepCount()),
  previous: () => dispatch(setPreviousStepCount()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Steps);
