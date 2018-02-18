// @flow

import React from 'react';
import ButtonWrapper from '../buttonWrapper.styled';
import ButtonEncoderWrapper from '../buttonEncoderWrapper.styled';
import {
  MuteButton,
  SoloButton,
  PanEncoder,
} from './components';

type Props = {
  sound: string,
}

export default ({ sound }: Props) => (
  <ButtonEncoderWrapper>
    <ButtonWrapper>
      <SoloButton sound={sound} />
      <MuteButton sound={sound} />
    </ButtonWrapper>
    <PanEncoder sound={sound} />
  </ButtonEncoderWrapper>
);
