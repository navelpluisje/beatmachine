// @flow

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Button from '../../../elements/button';
import { hasMidi, showMidi } from '../../../store/midi/selectors';
import { toggleSettings } from '../../../store/midi/actions';
import Icon from '../../icons';
import type { GlobalState } from '../../../store/types';

type StateProps = {
  midi: boolean,
  panel: boolean,
}

type DispatchProps = {
  toggle: Function,
}

type Props = StateProps & DispatchProps;

const Connection = ({
  midi,
  toggle,
  panel,
}: Props) => (
  <Fragment>
    {midi &&
      <Button
        active={panel}
        color="yellow"
        size="narrow"
        onClick={toggle}
      >
        <Icon icon="play" />
      </Button>
    }
  </Fragment>
);

const mapStateToProps = (state: GlobalState): StateProps => ({
  midi: hasMidi(state),
  panel: showMidi(state),
});

const mapDispatchToProps = (dispatch: Dispatch<*>): DispatchProps => ({
  toggle: () => dispatch(toggleSettings()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Connection);
