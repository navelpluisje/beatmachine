// @flow

import React from 'react';
import { connect } from 'react-redux';
import Button from '../../../elements/button';
import { toggleDdpSettings } from '../../../store/actions/ddp';
import { showSettings } from '../../../store/selectors/ddp';
import Icon from '../../icons';
import type { GlobalState } from '../../../store/types';

type StateProps = {
  settings: boolean,
}

type DispatchProps = {
  toggleSettings: Function,
}

type Props = StateProps & DispatchProps;

const Connection = ({
  settings,
  toggleSettings,
}: Props) => (
  <Button
    active={settings}
    color="yellow"
    onClick={toggleSettings}
  >
    <Icon icon="edit" />
  </Button>
);

const mapStateToProps = (state: GlobalState): StateProps => ({
  settings: showSettings(state),
});

const mapDispatchToProps = (dispatch: Dispatch<*>): DispatchProps => ({
  toggleSettings: () => dispatch(toggleDdpSettings()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Connection);
