// @flow

import React, { Component } from 'react';
import StyledStatusLed, { Label, Led } from './statusLed.styled';
import type { ButtonColor } from '../button/types';


type Props = {
  label?: string,
  color?: ButtonColor,
  active: boolean,
  onClick?: ?Function,
}

class StatusLed extends Component<Props, *> {
  static defaultProps = {
    color: 'white',
    onClick: null,
    label: '',
  };

  shouldComponentUpdate(nextProps: Props) {
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

export default StatusLed;
