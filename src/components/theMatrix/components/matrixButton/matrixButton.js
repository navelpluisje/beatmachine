// @flow

import React, { Component } from 'react';
import type { Node } from 'react';
import MatrixButton from './matrixButton.styled';
import type { ButtonColor } from '../../../../elements/button/types';


type Props = {
  active?: boolean,
  color?: ButtonColor,
  children: Node,
  onClick?: ?Function,
};

class Button extends Component<Props, *> {
  shouldComponentUpdate(nextProps: Props) {
    return nextProps.active !== this.props.active ||
      nextProps.color !== this.props.color;
  }

  render() {
    const {
      color,
      active,
      onClick,
      children,
    } = this.props;

    return (
      <MatrixButton
        color={color}
        active={active}
        onClick={onClick}
      >
        {children}
      </MatrixButton>
    );
  }
}

export default Button;
