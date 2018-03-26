// @flow

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Label from '../../../../elements/label';
import TextInput from '../../../../elements/textInput';
import Select from '../../../../elements/select';
import { setActiveDevice, setPort as setActivePort } from '../../../../store/midi/actions';
import { getActiveDevice, getMidiInputs, getActivePort } from '../../../../store/midi/selectors';

type MIDIInput = {
  id: string,
  name: string,
};

type StateProps = {
  active: ?string,
  devices: Array<MIDIInput>,
  port: number,
};

type DispatchProps = {
  setActive: Function,
  setPort: Function
};

type Props = StateProps & DispatchProps;

const Form = ({
  active, devices, setActive, port, setPort,
}: Props) => (
  <Fragment>
    <Label>Device</Label>
    <Select
      value={active}
      onChange={setActive}
      size="4"
    >
      <option value="">Select your device</option>
      {devices && devices.map(device => (
        <option value={device.id} key={device.id}>{device.name}</option>
      ))}
    </Select>
    <Label>Port</Label>
    <TextInput
      type="number"
      min="0"
      max="16"
      value={port}
      onChange={setPort}
    />
  </Fragment>
);

const mapStateToProps = (state: *): StateProps => ({
  active: getActiveDevice(state),
  devices: getMidiInputs(state),
  port: getActivePort(state),
});

const mapDispatchProps = (dispatch: Dispatch<*>): DispatchProps => ({
  setActive: (evt: Event) => {
    const { target } = evt;
    if (target instanceof HTMLSelectElement) {
      dispatch(setActiveDevice(target.value));
    }
  },
  setPort: (evt: Event) => {
    const { target } = evt;
    if (target instanceof HTMLInputElement) {
      dispatch(setActivePort(parseInt(target.value, 10)));
    }
  },
});

export default connect(mapStateToProps, mapDispatchProps)(Form);
