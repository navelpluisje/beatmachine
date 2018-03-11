// @flow

import React from 'react';
import type { Node } from 'react';
import ExplanationContainer, {
  Title,
  Explanation,
} from './explanation.styled';

type Props = {
  title: string,
  children: Node
};

export default ({ title, children }: Props) => (
  <ExplanationContainer>
    <Title>{title}</Title>
    <Explanation>
      {children}
    </Explanation>
  </ExplanationContainer>
);
