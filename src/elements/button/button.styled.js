// @flow

import styled, { css } from 'styled-components';
import { buttonColors } from './button.settings';

type Props = {
  active: boolean,
  color: string,
  size?: string,
};

export const buttonActiveState = (props: Props) => (css`
  background-image: radial-gradient(
    ${buttonColors[props.color].inner} 20%,
    ${buttonColors[props.color].outer} 80%
  );
  border-color: ${buttonColors[props.color].outer};
  box-shadow: 0 0 15px 0 ${buttonColors[props.color].inner};
  color: ${buttonColors[props.color].color};
`);

export const light = css`
  background-color: #c1d6de;
  border-color: #b1c4cc #b1c4cc #c1d6de #c1d6de;
  border-style: solid;
  border-width: 2px;
  font-size: 1rem;
  margin: 0 .5rem;
  padding: .5rem 1rem;
  text-align: center;
  transition: background-image .1s ease;
`;

export default styled.button`
  ${light}
  border-width: 2px;
  border-radius: .25rem;
  color: rgba(0, 0, 0, .7);
  font-size: 1rem;
  line-height: 1;
  margin: 0 .5rem;
  padding: .5rem 1rem;
  text-align: center;
  text-shadow: 1px 1px 0 rgba(255, 255, 255, .5);

  ${(props: Props) => props.size === 'small' && css`
    font-size: .75rem;
    font-weight: 800;
    padding: .2rem .5rem .1rem;
  `};

  ${(props: Props) => props.active && props.color && buttonActiveState(props)};

  &:focus {
    outline: none;
  }

  &:active {
    outline: none;
    ${(props: Props) => buttonActiveState(props)};
  }
`;
