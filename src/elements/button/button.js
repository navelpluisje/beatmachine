// @flow

import React, { Component } from 'react';
import type { Node } from 'react';
import StyledButton from './button.styled';
import type {
  ButtonColor,
  ButtonSize,
  ButtonTextPosition,
} from './types';

type Props = {
  active?: boolean,
  color?: ButtonColor,
  size?: ButtonSize,
  textPosition?: ButtonTextPosition,
  children: Node,
  onClick?: ?Function,
};

class Button extends Component<Props, *> {
  static defaultProps = {
    active: false,
    color: 'white',
    size: 'regular',
    textPosition: 'middle',
    onClick: null,
  };

  shouldComponentUpdate(nextProps: Props) {
    return nextProps.active !== this.props.active ||
      nextProps.color !== this.props.color;
  }

  render() {
    const { children, ...props } = this.props;
    return (
      <StyledButton {...props}>
        {children}
      </StyledButton>
    );
  }
}

export default Button;
