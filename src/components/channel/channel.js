// @flow

import React from 'react';
import { connect } from 'react-redux';
import Button from '../../elements/button';
import StyledChannel, { Title } from './channel.styled';
import {
  Filter,
  GainEncoder,
  Pan,
} from './components';
import { getActiveChannel } from '../../store/channels/selectors';
import { playSingleSound } from '../../store/sounds/actions';
import { setChannelActive } from '../../store/channels/actions';
import type { GlobalState } from '../../store/types';

type DispatchProps = {
  playSound: Function,
  setActive: Function,
};

type StateProps = {
  active: boolean,
};

type OwnProps = {
  sound: string,
}

type Props = StateProps & DispatchProps & OwnProps;

const Channel = ({
  sound, playSound, setActive, active,
}: Props) => (
  <StyledChannel
    onTouch={setActive}
    onMouseDown={setActive}
  >
    <Title>{sound}</Title>
    <GainEncoder sound={sound} />
    <Filter sound={sound} />
    <Pan sound={sound} />
    <Button
      color="white"
      active={active}
      onClick={playSound}
    >
      {sound}
    </Button>
  </StyledChannel>
);

const mapStateToProps = (state: GlobalState, ownProps: OwnProps): StateProps => ({
  active: getActiveChannel(state) === ownProps.sound,
});

const mapDispatchToProps = (dispatch: Dispatch<*>, ownProps: OwnProps): DispatchProps => ({
  playSound: () => dispatch(playSingleSound(ownProps.sound)),
  setActive: () => dispatch(setChannelActive(ownProps.sound)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
