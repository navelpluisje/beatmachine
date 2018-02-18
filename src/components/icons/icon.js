// @flow

import styled from 'styled-components';

type Props = {
  icon: string,
}

const icons = {
  edit: '\\e993',
  grid: '\\e9bb',
  connect: '\\e9cb',
  play: '\\ea1c',
  pause: '\\ea1d',
  stop: '\\ea1e',
  loop: '\\ea2d',
  arrowLeft: '\\e900',
  arrowRight: '\\e901',
  drumkit: '\\e928',
};

export default styled.i`
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'beatmachine' !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  &::before {
    content: "${(props: Props) => icons[props.icon]}";
  }
`;
