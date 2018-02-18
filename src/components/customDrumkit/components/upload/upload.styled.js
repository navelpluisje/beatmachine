// @flow

import styled from 'styled-components';
import Button from '../../../../elements/button/button.styled';
import TextInput from '../../../../elements/textInput';

export const FileInput = styled.input`
  clip: rect(0, 0, 0, 0);
  position: absolute;
`;

export const UploadLabel = styled.span`
  background-color: white;
  color: #33333a;
  font-size: .75rem;
  left: 0;
  padding: .25rem .5rem;
  position: absolute;
  text-transform: uppercase;
  top: -1px;
  width: 2.5rem;

  &::after {
    border-color: white transparent transparent white;
    border-width: .625rem;
    border-style: solid;
    content: '';
    display: block;
    left: 100%;
    position: absolute;
    top: 0;
  }
`;

export const FileInputButton = Button.withComponent('label');

export const UploadWrapper = styled.div`
  border-top: 1px solid white;
  display: flex;
  padding: .25rem .25rem 0 6rem;
  position: relative;

  &:first-of-type {
    margin-top: .5rem;
  }

  ${FileInputButton},
  ${Button} {
    box-sizing: border-box;
    display: inline-block;
    font-size: 1rem;
    height: 2rem;
    line-height: 1.4rem;
  }

  ${FileInputButton} {
    border-radius: 4px 0 0 4px;
    margin-right: 0;
  }

  ${Button} {
    border-radius: 0 4px 4px 0;
    margin: 0;
  }

  ${TextInput} {
    margin-bottom: .25rem;
  }
`;

export default null;
