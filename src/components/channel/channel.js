// @flow

import React from 'react';
import { connect } from 'react-redux';
import Encoder from '../../elements/encoder';
import Button from '../../elements/button';
import StatusLed from '../../elements/statusLed';
import StyledChannel, { Title } from './channel.styled';
import { Sound, Buttons } from './atoms';
import {
  getGain,
  getMute,
  getFilter,
  getFilterQ,
  getFilterFreq,
  getPan,
  getSolo,
} from '../../store/selectors/sounds';
import {
  isActiveChannel,
} from '../../store/selectors/channels';
import {
  playSingleSound,
  setSoundGain,
  toggleSoundMute,
  toggleSoundSolo,
  toggleSoundFilter,
  setSoundFilterQ,
  setSoundFilterFreq,
  setSoundPan,
} from '../../store/actions/sounds';
import {
  setChannelActive,
} from '../../store/actions/channels';
import type { GlobalState } from '../../store/types';

type DispatchProps = {
  playSound: Function,
  setActive: Function,
  setGain: Function,
  setFilter: Function,
  setFilterQ: Function,
  setFilterFreq: Function,
  setMute: Function,
  setSolo: Function,
  setPan: Function,
};

type StateProps = {
  gain: number,
  filter: boolean,
  filterQ: number,
  filterFreq: number,
  pan: number,
  mute: boolean,
  solo: boolean,
  active: boolean,
};

type OwnProps = {
  sound: string,
}

type Props = StateProps & DispatchProps & OwnProps;

const Channel = ({
  sound, playSound, setGain, setFilterQ, setFilterFreq, setPan, setFilter, setMute,
  gain, filter, filterQ, filterFreq, pan, mute, setActive, active, setSolo, solo,
}: Props) => (
  <StyledChannel
    onTouch={setActive}
    onMouseDown={setActive}
  >
    <Title>{sound}</Title>
    <Encoder
      min={0}
      max={1}
      step={2}
      value={gain}
      onChange={(value) => { setGain(value); }}
      label="Gain"
      backgroundColor="#353f4c"
    />
    <Sound>
      <Buttons>
        <StatusLed
          label="Filter"
          active={filter}
          color="white"
          onClick={setFilter}
        />
      </Buttons>
      <Encoder
        min={0}
        max={35}
        step={1}
        value={filterQ}
        onChange={(value) => { setFilterQ(value); }}
        label="Filter Q"
        backgroundColor="#353f4c"
      />
    </Sound>
    <Encoder
      min={50}
      max={8000}
      step={-2}
      value={filterFreq}
      onChange={(value) => { setFilterFreq(value); }}
      label="Freq"
      backgroundColor="#353f4c"
    />
    <Sound>
      <Buttons>
        <StatusLed
          label="Solo"
          active={solo}
          color="green"
          onClick={setSolo}
        />
        <StatusLed
          label="Mute"
          active={mute}
          color="red"
          onClick={setMute}
        />
      </Buttons>
      <Encoder
        min={-1}
        max={1}
        step={2}
        value={pan}
        onChange={(value) => { setPan(value); }}
        label="Pan"
        backgroundColor="#353f4c"
      />
    </Sound>
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
  gain: getGain(state, ownProps.sound),
  filter: getFilter(state, ownProps.sound),
  filterQ: getFilterQ(state, ownProps.sound),
  filterFreq: getFilterFreq(state, ownProps.sound),
  pan: getPan(state, ownProps.sound),
  mute: getMute(state, ownProps.sound),
  solo: getSolo(state, ownProps.sound),
  active: isActiveChannel(state, ownProps.sound),
});

const mapDispatchToProps = (dispatch: Dispatch<*>, ownProps: OwnProps): DispatchProps => ({
  playSound: () => dispatch(playSingleSound(ownProps.sound)),
  setActive: () => dispatch(setChannelActive(ownProps.sound)),
  setGain: (value: number) => dispatch(setSoundGain(ownProps.sound, value)),
  setFilter: () => dispatch(toggleSoundFilter(ownProps.sound)),
  setFilterQ: (value: number) => dispatch(setSoundFilterQ(ownProps.sound, value)),
  setFilterFreq: (value: number) => dispatch(setSoundFilterFreq(ownProps.sound, value)),
  setMute: () => dispatch(toggleSoundMute(ownProps.sound)),
  setSolo: () => dispatch(toggleSoundSolo(ownProps.sound)),
  setPan: (value: number) => dispatch(setSoundPan(ownProps.sound, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
