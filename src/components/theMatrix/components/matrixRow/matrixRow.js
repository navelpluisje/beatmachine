// @flow

import React from 'react';
import { connect } from 'react-redux';
import StyledMatrixRow from './matrixRow.styled';
import { getCurrentStep, getEditGroup } from '../../../../store/sequencer/selectors';
import { setStep } from '../../../../store/channels/actions';
import { isSelectedStep } from '../../../../store/channels/selectors';
import MatrixButton from '../matrixButton';
import MatrixLabel from '../matrixLabel';

type DispatchProps = {
  step: Function,
}

type StateProps = {
  current: number,
  selected: Function,
  editGroup: number,
}

type OwnProps = {
  channel: string,
};
type Props = OwnProps & StateProps & DispatchProps;

const getIndex = (index: number, group: number) => {
  const base = group === -1 ? 0 : group;

  return (base * 16) + index;
};

const MatrixRow = ({
  channel,
  current,
  editGroup,
  step,
  selected,
}: Props) => (
  <StyledMatrixRow>
    <MatrixLabel>{channel}</MatrixLabel>
    {Array.from(Array(16)).map((x, index) => (
      <MatrixButton
        key={index} // eslint-disable-line
        color={current % 16 === index ? 'green' : 'yellow'}
        active={
          current % 16 === index ||
          (editGroup !== -1 && selected(getIndex(index, editGroup)))}
        onClick={() => step(getIndex(index, editGroup), !selected(getIndex(index, editGroup)))}
      >
        {index + 1}
      </MatrixButton>
    ))}
  </StyledMatrixRow>
);

const mapStateToProps = (state: *, props: OwnProps): StateProps => ({
  current: getCurrentStep(state),
  selected: (step: number) => isSelectedStep(state, step, props.channel),
  editGroup: getEditGroup(state),
});

const mapDispatchToProps = (dispatch: Dispatch<*>, props: OwnProps): DispatchProps => ({
  step: (step: number, value: boolean) => dispatch(setStep(step, props.channel, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MatrixRow);
