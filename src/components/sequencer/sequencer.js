// @flow

import React from 'react';
import { connect } from 'react-redux';
import Button from '../../elements/button';
import { Container } from './atoms';
import { getCurrentStep, getEditGroup } from '../../store/selectors/sequencer';
import { setStep } from '../../store/actions/channels';
import { isSelectedStep } from '../../store/selectors/channels';

type DispatchProps = {
  step: Function,
}

type StateProps = {
  current: number,
  selected: Function,
  editGroup: number,
}

type Props = StateProps & DispatchProps;

const getIndex = (index: number, group: number) => {
  const base = group === -1 ? 0 : group;

  return (base * 16) + index;
};

const Sequencer = ({
  current,
  step,
  selected,
  editGroup,
}: Props) => (
  <Container>
    {Array.from(Array(16)).map((x, index) => (
      <Button
        key={index} // eslint-disable-line
        color={current % 16 === index ? 'green' : 'yellow'}
        active={
          current % 16 === index ||
          (editGroup !== -1 && selected(getIndex(index, editGroup)))}
        onClick={() => step(getIndex(index, editGroup))}
      >
        {index + 1}
      </Button>
    ))}
  </Container>
);

const mapStateToProps = (state: *): StateProps => ({
  current: getCurrentStep(state),
  selected: (step: number) => isSelectedStep(state, step),
  editGroup: getEditGroup(state),
});

const mapDispatchToProps = (dispatch: Dispatch<*>): DispatchProps => ({
  step: (step: number) => dispatch(setStep(step)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sequencer);
