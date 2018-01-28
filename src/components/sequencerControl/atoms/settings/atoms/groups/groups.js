// @flow

import React from 'react';
import { connect } from 'react-redux';
import { StyledGroup, GroupButton } from './groups.styled';
import { setSequencerEditGroup } from '../../../../../../store/actions/sequencer';
import { getEditGroup } from '../../../../../../store/selectors/sequencer';
import type { GlobalState } from '../../../../../../store/types';

type StateProps = {
  editGroup: number,
};

type DispatchProps = {
  setGroup: Function,
};

type Props = DispatchProps & StateProps;

const EditGroup = ({ setGroup, editGroup }: Props) => (
  <StyledGroup>
    {Array.from(Array(4)).map((x, index) => (
      <GroupButton
        key={`groupButton-${index}`} // eslint-disable-line
        color="white"
        active={editGroup === index}
        onClick={() => setGroup(index)}
      >
        {(index * 16) + 1}<hr />{(index + 1) * 16}
      </GroupButton>
    ))}
  </StyledGroup>
);

const mapStateToProps = (state: GlobalState): StateProps => ({
  editGroup: getEditGroup(state),
});

const mapDispatchToProps = (dispatch: Dispatch<*>): DispatchProps => ({
  setGroup: (group: number) => dispatch(setSequencerEditGroup(group)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditGroup);
