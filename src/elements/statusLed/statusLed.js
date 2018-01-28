// @flow

import React from 'react';
import StyledStatusLed, { Label, Led } from './statusLed.styled';
import type {
  ButtonColor,
} from '../button/types';


type Props = {
  label?: string,
  color?: ButtonColor,
  active: boolean,
  onClick?: ?Function,
}

const StatusLed = ({
  active, label, color, onClick,
}: Props) => (
  <StyledStatusLed
    onClick={onClick}
  >
    <Led
      color={color}
      active={active}
    />
    <Label>{label}</Label>
  </StyledStatusLed>
);

StatusLed.defaultProps = {
  color: 'white',
  onClick: null,
  label: '',
};

export default StatusLed;
