// @flow

import React, { Component } from 'react';
import NpKnob from '@navelpluisje/np-knob';
import cuid from 'cuid';
import StyledRotary from './encoder.styled';
import type { EncoderEvent } from './types';

type Props = {
  size?: string,
  min: number,
  max: number,
  step: number,
  value: number,
  onChange: Function,
  label?: string,
  backgroundColor: string,
  color?: string,
};

class Encoder extends Component<Props, *> {
  static defaultProps = {
    size: '60px',
    label: '',
    color: 'dark',
  }

  componentWillMount() {
    this.id = cuid();
  }

  componentDidMount() {
    const {
      min,
      max,
      step,
      value,
      onChange,
    } = this.props;

    this.knob = new NpKnob(this.id, {
      min,
      max,
      step,
      value,
    });

    this.knob.knob.addEventListener('knob-rotate', (evt: EncoderEvent) => onChange(evt.detail.value));
  }

  componentWillUnmount() {
    const { onChange } = this.props;
    this.knob.knob.removeEventListener('knob-rotate', (evt: EncoderEvent) => onChange(evt.detail.value));
  }

  id: string;
  knob: NpKnob;

  render() {
    const {
      size,
      backgroundColor,
      label,
      color,
    } = this.props;
    return (
      <StyledRotary
        id={this.id}
        size={size}
        backgroundColor={backgroundColor}
        label={label}
        color={color}
      />
    );
  }
}

export default Encoder;
