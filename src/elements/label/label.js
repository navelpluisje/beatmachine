// @flow

import React from 'react';
import type { Node } from 'react';
import Label from './label.styled';

type Props = {
  children: Node,
}

export default ({ children }: Props) => (
  <Label>
    <span>{children}</span>
  </Label>
);
