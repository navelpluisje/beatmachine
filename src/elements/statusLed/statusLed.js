// @flow

import React, { Component } from 'react';
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

class StatusLed extends Component<Props, *> {
  shouldComponentUpdate(nextProps) {
    return nextProps.active !== this.props.active ||
      nextProps.color !== this.props.color;
  }

  render() {
    const {
      active,
      label,
      color,
      onClick,
    } = this.props;
    return (
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
  }
}

StatusLed.defaultProps = {
  color: 'white',
  onClick: null,
  label: '',
};

export default StatusLed;
