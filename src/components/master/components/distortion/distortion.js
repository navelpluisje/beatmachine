// @flow

import React from 'react';
import { connect } from 'react-redux';
import Encoder from '../../../../elements/encoder';
import StatusLed from '../../../../elements/statusLed';
import {
  setDistortion as setMasterDistortion,
  toggleDistortion as toggleMasterDistortion,
} from '../../../../store/master/actions';
import {
  getDistortion,
  hasDistortion as hasMasterDistortion,
} from '../../../../store/master/selectors';
import type { GlobalState } from '../../../../store/types';

type DispatchProps = {
  setDistortion: Function,
  toggleDistortion: Function,
};

type StateProps = {
  distortion: number,
  hasDistortion: boolean,
};

type Props = StateProps & DispatchProps;

const Distortion = ({
  distortion,
  setDistortion,
  hasDistortion,
  toggleDistortion,
}: Props) => (
  <div>
    <Encoder
      size="60px"
      color="light"
      min={50}
      max={500}
      step={0}
      value={distortion}
      backgroundColor="#33333a"
      label="Distortion"
      onChange={value => setDistortion(value)}
    />
    <StatusLed
      active={hasDistortion}
      onClick={toggleDistortion}
    />
  </div>
);

const mapStateToProps = (state: GlobalState) => ({
  distortion: getDistortion(state),
  hasDistortion: hasMasterDistortion(state),
});

const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  setDistortion: (value: number) => dispatch(setMasterDistortion(value)),
  toggleDistortion: () => dispatch(toggleMasterDistortion()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Distortion);
