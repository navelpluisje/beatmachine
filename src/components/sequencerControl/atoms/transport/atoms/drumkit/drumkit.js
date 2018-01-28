// @flow

import React from 'react';
import { connect } from 'react-redux';
import Display from '../../../../../../elements/display';
import Button from '../../../../../../elements/button';
import Container, { ButtonBar } from './drumkit.styled';
import {
  setNextDrumkit,
  setPreviousDrumkit,
} from '../../../../../../store/actions/drumkit';
import { getDrumkit } from '../../../../../../store/selectors/drumkit';

type StateProps = {
  drumkit: string,
};

type DispatchProps = {
  next: Function,
  previous: Function,
};

type Props = StateProps & DispatchProps;

const Drumkit = ({
  next,
  previous,
  drumkit,
}: Props) => (
  <Container>
    <Display
      small
      content={drumkit}
      length={9}
    />
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
  </Container>
);

const mapStateToProps = (state: *): StateProps => ({
  drumkit: getDrumkit(state),
});

const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
  next: () => dispatch(setNextDrumkit()),
  previous: () => dispatch(setPreviousDrumkit()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Drumkit);
