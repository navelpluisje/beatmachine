// @flow

import React from 'react';
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

const Button = ({ children, ...props }: Props) => (
  <StyledButton {...props}>
    {children}
  </StyledButton>
);

Button.defaultProps = {
  active: false,
  color: 'white',
  size: 'regular',
  textPosition: 'middle',
  onClick: null,
};

export default Button;
