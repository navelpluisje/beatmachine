// @flow

import React from 'react';
import StyledDisplay, { DisplayText, DisplayBack } from './display.styled';

type Props = {
  small?: boolean,
  content: string,
  length: number,
}

const fillContent = (content: string, length: number): string => {
  if (content.length === length) { return content; }
  const fill: number = length - content.length;
  const fillStart: number = Math.floor(fill / 2);
  const fillEnd: number = fill - fillStart;

  return Array.from(Array((fillStart < fillEnd) ? fillEnd : fillStart), () => '!')
    .concat(Array.from(content))
    .concat(Array.from(Array((fillStart > fillEnd) ? fillEnd : fillStart), () => '!'))
    .join('');
};

const Display = ({ small, content, length }: Props) => (
  <StyledDisplay small={small}>
    <DisplayBack>
      {Array.from(Array(length), () => '~').join('')}
    </DisplayBack>
    <DisplayText>
      {fillContent(content, length)}
    </DisplayText>
  </StyledDisplay>
);

Display.defaultProps = {
  small: false,
};

export default Display;
