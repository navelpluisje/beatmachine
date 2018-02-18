// @flow

import React, { Fragment } from 'react';
import ButtonWrapper from '../buttonWrapper.styled';
import ButtonEncoderWrapper from '../buttonEncoderWrapper.styled';
import {
  FilterButton,
  FilterFreqEncoder,
  FilterQEncoder,
} from './components';

type Props = {
  sound: string,
}

export default ({ sound }: Props) => (
  <Fragment>
    <ButtonEncoderWrapper>
      <ButtonWrapper>
        <FilterButton sound={sound} />
      </ButtonWrapper>
      <FilterQEncoder sound={sound} />
    </ButtonEncoderWrapper>
    <FilterFreqEncoder sound={sound} />
  </Fragment>
);
