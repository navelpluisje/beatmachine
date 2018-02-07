// @flow

import React, { Component } from 'react';
import type { Node } from 'react';
import Label from './matrixLabel.styled';

type Props = {
  children: Node,
}

class MatrixLabel extends Component<Props, *> {
  shouldComponentUpdate(nextProps: Props) {
    return this.props.children !== nextProps.children;
  }

  render() {
    const { children } = this.props;

    return (
      <Label>{children}</Label>
    );
  }
}

export default MatrixLabel;
