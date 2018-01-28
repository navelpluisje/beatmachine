// @flow

import styled, { css } from 'styled-components';

export default styled.div`
  background-image:
    radial-gradient(transparent 70.7%, ${props => props.backgroundColor} 70.7%),
    linear-gradient(0deg, transparent 48.5%, white 48.5%, white 51.5%, transparent 51.5%),
    linear-gradient(15deg, transparent 49.5%, white 49.5%, white 50.5%, transparent 50.5%),
    linear-gradient(30deg, transparent 49.5%, white 49.5%, white 50.5%, transparent 50.5%),
    linear-gradient(45deg, transparent 48.5%, white 48.5%, white 51.5%, transparent 51.5%),
    linear-gradient(60deg, transparent 49.5%, white 49.5%, white 50.5%, transparent 50.5%),
    linear-gradient(75deg, transparent 49.5%, white 49.5%, white 50.5%, transparent 50.5%),
    linear-gradient(90deg, transparent 48.5%, white 48.5%, white 51.5%, transparent 51.5%),
    linear-gradient(105deg, transparent 49.5%, white 49.5%, white 50.5%, transparent 50.5%),
    linear-gradient(120deg, transparent 49.5%, white 49.5%, white 50.5%, transparent 50.5%),
    linear-gradient(135deg, transparent 48.5%, white 48.5%, white 51.5%, transparent 51.5%),
    linear-gradient(150deg, transparent 49.5%, white 49.5%, white 50.5%, transparent 50.5%),
    linear-gradient(165deg, transparent 49.5%, white 49.5%, white 50.5%, transparent 50.5%);
  background-size: ${props => props.size} ${props => props.size};
  background-repeat: no-repeat;
  background-position: left top;
  height: ${props => props.size};
  margin-bottom: 1rem;
  position: relative;
  width: ${props => props.size};

  &::before {
    border-style: solid;
    border-color: transparent transparent ${props => props.backgroundColor} transparent;
    border-width: 0 calc(${props => props.size} / 2 - 3px) calc(${props => props.size} / 2 - 3px);
    bottom: 0;
    content: '';
    display: block;
    height: 0;
    left: 3px;
    position: absolute;
    width: 0;
    z-index: 0;
  }

  &::after {
    content: '${props => props.label}';
    display: block;
    font-size: .5rem;
    font-weight: 300;
    position: absolute;
    text-align: center;
    text-shadow: 0 0 1px black;
    text-transform: uppercase;
    top: ${props => props.size};
    width: ${props => props.size};
    z-index: 1;
  }


  input {
    display: none;
  }

  .npknob {
    ${props => props.color === 'dark' && css`
      background: black;
      background-image:
        radial-gradient(#333 69%, transparent 71%),
        radial-gradient(#333 69%, transparent 71%),
        radial-gradient(#333 69%, transparent 71%),
        radial-gradient(#333 69%, transparent 71%),
        radial-gradient(#333 69%, transparent 71%),
        radial-gradient(#333 69%, transparent 71%),
        radial-gradient(transparent 57%, #333 58%);
    `}

    ${props => props.color === 'light' && css`
      background: #eee;
      background-image:
        radial-gradient(#ccc 69%, transparent 71%),
        radial-gradient(#ccc 69%, transparent 71%),
        radial-gradient(#ccc 69%, transparent 71%),
        radial-gradient(#ccc 69%, transparent 71%),
        radial-gradient(#ccc 69%, transparent 71%),
        radial-gradient(#ccc 69%, transparent 71%),
        radial-gradient(transparent 57%, #ccc 58%);
    `}
    background-position:
      top -90% left -30%,
      top -90% right -30%,
      center left -110%,
      center right -110%,
      bottom -90% left -30%,
      bottom -90% right -30%,
      center center;
    background-size:
      60% 60%,
      60% 60%,
      60% 60%,
      60% 60%,
      60% 60%,
      60% 60%,
      100% 100%;
    background-repeat: no-repeat;
    background-clip: content-box;
    border-radius: 50%;
    box-sizing: border-box;
    display: block;
    height: ${props => props.size};
    padding: 3px;
    position: relative;
    transition: transform .5s ease;
    width: ${props => props.size};

    &::after {
      content: '';
      display: block;
      height: 30%;
      left: 50%;
      position: absolute;
      top: 5px;
      transform: translateX(-50%);
      width: 3px;

      ${props => props.color === 'light' && css`
        background-color: #222;
      `}

      ${props => props.color === 'dark' && css`
        background-color: white;
      `}
    }
  }
`;
