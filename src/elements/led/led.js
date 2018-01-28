// @flow

import React from 'react';
import StyledStatusLed, { Label, Led } from './led.styled';
import type {
  ButtonColor,
} from '../button/types';


type Props = {
  label: string,
  color?: ButtonColor,
  active: boolean,
}

const StatusLed = ({ active, label, color }: Props) => (
  <StyledStatusLed>
    <Led
      color={color}
      active={active}
    />
    <Label>{label}</Label>
  </StyledStatusLed>
);

StatusLed.defaultProps = {
  color: 'white',
};

export default StatusLed;
